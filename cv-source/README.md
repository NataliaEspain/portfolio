# Fuente del CV

El CV que descarga la gente desde el sitio (`public/cv/natalia-espain-cv.pdf`) se genera
desde `cv-en.html`. **Editá el HTML, no el PDF.**

Para regenerar el PDF después de editar:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="C:\Users\Natz\Desktop\portfolio-master\portfolio-master\public\cv\natalia-espain-cv.pdf" \
  "file:///C:/Users/Natz/Desktop/portfolio-master/portfolio-master/cv-source/cv-en.html"
```

Después, comprobá que siga entrando en una carilla y que el ATS lo lea bien:

```bash
cd public/cv
pdftotext natalia-espain-cv.pdf - | tr -cd '\f' | wc -c   # 1 = una sola carilla
pdftotext -enc UTF-8 natalia-espain-cv.pdf -              # lo que ve el parser
```

## Reglas que no hay que romper

El PDF tiene que pasar por un parser de ATS. Eso obliga a:

- **Una sola columna.** Nada de dos columnas, tablas ni cajas de texto: el parser las lee
  en orden equivocado y mezcla la experiencia.
- **Texto real, nunca texto dentro de una imagen.**
- **Sin `letter-spacing` en los títulos.** Con tracking alto, Chrome mete espacios reales
  entre las letras al generar la capa de texto y el ATS lee `E D U C A T I O N`. Ya pasó.
- **Los datos de contacto van en el cuerpo**, no en el header/footer de la página: muchos
  parsers descartan los márgenes.
- **Separadores estándar** (`|`, `—`). Los bullets de fuentes decorativas salen como `?`.
- **Sin iconos** para el mail o el teléfono.

## Y lo más importante

Las certificaciones tienen que ser reales y estar vigentes. **No hay certificación de
Sitecore ni de AEM** — ese trabajo va como experiencia, que es lo que es, y suma igual.
El CV original decía tenerlas; está guardado en `private-assets/cv/` (fuera de `public/`,
no se publica) sólo como referencia.
