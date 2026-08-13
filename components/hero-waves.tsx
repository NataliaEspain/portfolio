"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/* ============================================================
   Fondo del hero — terreno de partículas estilo synthwave.
   Grilla de puntos en perspectiva que ondula hacia el horizonte
   (violeta cerca → naranja al fondo) y reacciona al mouse con
   una onda. Va detrás del texto, full-width, sin interacción
   directa (pointer-events: none; se escucha el mouse en window).
   Con prefers-reduced-motion las olas siguen derivando, pero a un tercio
   de velocidad: movimiento suave en vez de imagen congelada.
   ============================================================ */

const C_NEAR = new THREE.Color("#8C5CF2")  // violeta (cerca)
const C_MID = new THREE.Color("#C9B3FF")   // lila (medio)
const C_FAR = new THREE.Color("#F28322")   // naranja (horizonte)

export default function HeroWaves() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    // niebla del color del fondo: las partículas se funden en el horizonte
    scene.fog = new THREE.FogExp2(0x050409, 0.052)

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100)
    camera.position.set(0, 2.4, 7.5)
    camera.lookAt(0, 0.2, -4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // --- grilla de partículas ---
    const COLS = 160, ROWS = 80
    const WIDTH = 42, DEPTH = 26
    const count = COLS * ROWS
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const col = new THREE.Color()
    let n = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * WIDTH
        const z = -(r / (ROWS - 1)) * DEPTH + 2
        positions[n * 3] = x
        positions[n * 3 + 1] = 0
        positions[n * 3 + 2] = z
        // degradé por profundidad: violeta → lila → naranja
        const t = r / (ROWS - 1)
        if (t < 0.45) col.copy(C_NEAR).lerp(C_MID, t / 0.45)
        else col.copy(C_MID).lerp(C_FAR, (t - 0.45) / 0.55)
        colors[n * 3] = col.r
        colors[n * 3 + 1] = col.g
        colors[n * 3 + 2] = col.b
        n++
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // --- el mouse genera una onda donde apunta (raycast al plano y=0) ---
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const hit = new THREE.Vector3()
    const ndc = new THREE.Vector2()
    let mx = 0, mz = -30 // arranca fuera de la grilla: sin onda hasta mover el mouse
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) return
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1))
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) {
        mx = hit.x
        mz = hit.z
      }
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const pos = geo.attributes.position as THREE.BufferAttribute
    let t = 0
    let raf = 0
    // Con reduced-motion el oleaje no se congela: sigue derivando, pero a un
    // tercio de velocidad. El movimiento queda suave y sin sobresaltos, que es
    // lo que la preferencia pide — no una imagen quieta.
    const speed = reduce ? 0.0045 : 0.014
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += speed
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i)
        const z = pos.getZ(i)
        // dos senos cruzados = oleaje; + onda radial alrededor del mouse
        let y = 0.32 * Math.sin(x * 0.45 + t * 1.15) + 0.24 * Math.sin(z * 0.7 + t * 0.85)
        const dx = x - mx, dz = z - mz
        const d2 = dx * dx + dz * dz
        if (d2 < 14) y += 0.55 * Math.exp(-d2 / 3.2) * Math.sin(t * 2.6 - Math.sqrt(d2) * 1.6)
        pos.setY(i, y)
      }
      pos.needsUpdate = true
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("pointermove", onPointer)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero-waves" aria-hidden="true" />
}
