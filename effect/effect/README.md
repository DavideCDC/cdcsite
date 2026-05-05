# CDC Effects — Pacchetto vanilla

Effetti animati pronti da droppare in un sito HTML statico.
**Zero dipendenze. No build. No React.** Funziona ovunque.

---

## 1. Cosa contiene

| File | Cosa | Dove va |
|---|---|---|
| `cdc-effects.css` | Tutti gli stili. Tutte le classi prefissate `.cdc-` per non collidere con il tuo CSS. | Linkato in `<head>` |
| `cdc-effects.js`  | Tutto il comportamento. Espone `window.CDC` e auto-inizializza gli elementi marcati `data-cdc="..."`. | Prima di `</body>` con `defer` |
| `demo.html`       | Pagina di esempio che mostra ogni effetto in contesto. | Cancellala dopo aver imparato |

Effetti inclusi: **logo scan-build**, **sfondo griglia blueprint**, **marquee manifesto**, **divider ticker**, **loader iniziale**, **cursore custom**, **transizione slice tipografico tra sezioni**, **reveal on scroll**.

---

## 2. Installazione (3 passi)

### Passo 1 — copia la cartella

Hai già `effect/` nella root del repo. Tienila lì, oppure spostala in `assets/effect/` se preferisci. **Importante:** se la sposti, aggiorna i percorsi nei `<link>` / `<script>`.

### Passo 2 — includi i due file in **ogni pagina HTML**

Dentro `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Archivo+Narrow:wght@400;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/effect/cdc-effects.css">
```

Prima di `</body>`:

```html
<script src="/effect/cdc-effects.js" defer></script>
```

> Se il tuo sito è servito da una sotto-cartella (es. `tuosito.it/anty/`), usa percorsi relativi: `effect/cdc-effects.css` invece di `/effect/...`.

### Passo 3 — usa gli effetti

Tutto si attiva con un attributo `data-cdc="..."`. Nessuna chiamata JS necessaria.

---

## 3. Cheat-sheet — copia/incolla

### Logo animato (loop)
```html
<span data-cdc="logo" data-text="CDCsite" data-loop="true"
      style="font-size:96px"></span>
```
Il logo eredita `font-size`, `color` e `font-family` dal contenitore — usa `font-size` per scalarlo.

### Sfondo griglia blueprint (dentro un contenitore `position:relative`)
```html
<section style="position:relative; min-height:100vh; padding:80px 28px">
  <div data-cdc="bg-grid"></div>
  <div style="position:relative; z-index:2"> ...il tuo contenuto... </div>
</section>
```

### Marquee manifesto
```html
<div data-cdc="marquee"
     style="border-top:1px solid #2a2a2a; border-bottom:1px solid #2a2a2a"></div>
```
Per personalizzare le righe via JS:
```html
<div id="myMarq"></div>
<script>
  CDC.initMarquee(document.getElementById('myMarq'), {
    rows: [
      { text:'TUO TESTO ▪ ', dir:'L', accent:false },
      { text:'ALTRA RIGA — ', dir:'R', accent:true }
    ]
  });
</script>
```

### Divider ticker
```html
<div data-cdc="divider"></div>
```

### Loader iniziale
```html
<div data-cdc="loader" data-duration="2200"></div>
```
Mettilo **come primo elemento del `<body>`**. Si auto-rimuove (fade) a fine animazione.

### Transizione slice tra sezioni
Su qualunque link aggiungi `data-cdc-trans="LABEL"`:
```html
<a href="#servizi" data-cdc-trans="SERVIZI">Servizi</a>
<a href="contatti.html" data-cdc-trans="CONTATTI">Contatti</a>
```
Funziona sia con anchor (#sezione) che con cambio pagina. Per triggerarla via JS:
```js
CDC.runTransition('CIAO', () => location.href = '/altra-pagina.html');
```

### Cursore custom
Aggiungi `data-cdc-cursor` su `<html>` o `<body>`:
```html
<html lang="it" data-cdc-cursor>
```
Per far reagire un elemento all'hover (zoom + outline) aggiungi `data-cdc-hover`:
```html
<div class="card" data-cdc-hover> ... </div>
```
Tutti i `<a>` e `<button>` reagiscono già di default. Su touch device si disattiva da solo.

### Reveal on scroll
Aggiungi la classe `cdc-reveal` a qualunque elemento:
```html
<h2 class="cdc-reveal">Titolo</h2>
<div class="cdc-reveal">Card che appare quando entra in viewport</div>
```

---

## 4. Personalizzare i colori

In cima a `cdc-effects.css` trovi:
```css
:root{
  --cdc-accent:#E5FF00;       /* giallo elettrico */
  --cdc-accent-2:#5AD7FF;     /* ciano */
  --cdc-ink-dark:#0a0a0a;
  --cdc-ink-light:#f4f4ef;
}
```
Puoi anche **sovrascriverli nel tuo CSS principale** (caricato dopo) senza toccare il file:
```css
:root{ --cdc-accent:#FF3B00; }   /* per esempio arancio */
```

---

## 5. Note / accortezze

- **Font:** se non importi Archivo / JetBrains Mono dal Google Fonts, gli stili usano fallback (Helvetica + monospace di sistema). L'import nel passo 2 è consigliato per il look corretto.
- **Z-index:** loader=9100, cursore=9200, transizione=9000. Se hai modali con z-index più alti, alzali sopra 10000.
- **Mobile:** il cursore si disattiva automaticamente su touch. Tutto il resto funziona.
- **Accessibilità:** se l'utente ha "reduce motion" attivo nel sistema, le animazioni vengono disattivate automaticamente.
- **Performance:** tutto CSS-driven; il JS pesa ~5KB non-minificato. Nessun listener pesante.

---

## 6. Istruzioni per Antigravity (push diretto su GitHub)

Apri Antigravity sul repo del sito e dai **esattamente** questo prompt:

> Ho aggiunto la cartella `effect/` (CSS + JS + demo + README) dell'utente CDCsite alla root del repo.
>
> 1. Verifica che `effect/cdc-effects.css`, `effect/cdc-effects.js`, `effect/demo.html`, `effect/README.md` siano presenti e committati.
> 2. Apri ogni pagina HTML del sito (`index.html` e tutte le altre `.html` nelle cartelle del progetto) e:
>    - Nel `<head>`, **subito prima della chiusura `</head>`**, inserisci:
>      ```html
>      <link rel="preconnect" href="https://fonts.googleapis.com">
>      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
>      <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Archivo+Narrow:wght@400;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
>      <link rel="stylesheet" href="effect/cdc-effects.css">
>      ```
>    - **Prima della chiusura `</body>`**, inserisci:
>      ```html
>      <script src="effect/cdc-effects.js" defer></script>
>      ```
>    - Sul tag `<html>` aggiungi l'attributo `data-cdc-cursor` per attivare il cursore custom (es. `<html lang="it" data-cdc-cursor>`).
> 3. Solo nella homepage (`index.html`), come **primo elemento del `<body>`**, aggiungi il loader:
>    ```html
>    <div data-cdc="loader" data-duration="2200"></div>
>    ```
> 4. Nella sezione hero della homepage, dove c'è il logo testuale o il titolo principale, sostituisci/aggiungi:
>    ```html
>    <span data-cdc="logo" data-text="CDCsite" data-loop="true" style="font-size:96px"></span>
>    ```
>    (mantieni i contenuti esistenti, aggiungi solo l'animazione del logo dove ha senso).
> 5. Nei link della navigation (menu) aggiungi l'attributo `data-cdc-trans` con la label della sezione:
>    ```html
>    <a href="#servizi" data-cdc-trans="SERVIZI">Servizi</a>
>    ```
> 6. Identifica nelle pagine i punti naturali per:
>    - sfondo griglia (sezioni hero o feature, dentro un contenitore `position:relative`): `<div data-cdc="bg-grid"></div>` come primo figlio;
>    - marquee tra sezioni: `<div data-cdc="marquee"></div>`;
>    - divider tra sezioni: `<div data-cdc="divider"></div>`;
>    - reveal on scroll: aggiungi la classe `cdc-reveal` a titoli e blocchi che vuoi appaiano allo scroll.
>    Non sostituire contenuti esistenti, **inserisci** gli effetti dove c'è già spazio logico.
> 7. Verifica che i path siano relativi (`effect/...`) e non assoluti (`/effect/...`) se il sito è ospitato in sotto-cartella; coerenti con la struttura attuale.
> 8. Esegui un test locale (apri `index.html` in browser) per controllare che non ci siano errori in console.
> 9. Fai un commit unico con messaggio: `feat(effects): integrazione pacchetto CDC effects su tutte le pagine` e push diretto.
>
> **CRITICO:**
> - NON modificare logica, contenuti testuali o struttura semantica delle pagine. Aggiungi solo i tag/attributi degli effetti.
> - NON installare dipendenze (no npm, no build): è tutto vanilla.
> - Se trovi conflitti di nomi di classe (es. una mia classe esistente chiamata `.cdc-*`), segnalali invece di sovrascrivere.
> - Se una pagina ha già un suo loader/cursore, NON aggiungere il mio: tienine uno solo.
> - Verifica che gli z-index del mio CSS (9000–9200) non siano sotto qualche modale tuo: se sì, alza i tuoi sopra 10000.

---

## 7. Disinstallare

Rimuovi:
1. la cartella `effect/`,
2. i due tag (`<link>` e `<script>`) da ogni pagina,
3. l'attributo `data-cdc-cursor` da `<html>`,
4. tutti gli attributi `data-cdc*` e le classi `cdc-reveal` / `cdc-hover` che hai aggiunto.

Niente lasciato in giro.
