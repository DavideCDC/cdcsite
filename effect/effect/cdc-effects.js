/* ============================================================
   CDC EFFECTS — JS vanilla (zero dipendenze)
   Espone window.CDC con metodi init* per ogni effetto.
   Auto-init: gli elementi con [data-cdc] sono inizializzati
   automaticamente al DOMContentLoaded. Esempi:
     <div data-cdc="bg-grid"></div>
     <div data-cdc="marquee"></div>
     <div data-cdc="divider"></div>
     <div data-cdc="loader" data-duration="2200"></div>
     <a data-cdc-trans="SERVIZI" href="#servizi">Servizi</a>
   E (una volta sola, in qualsiasi pagina):
     CDC.initCursor();
     CDC.initReveal();
   ============================================================ */
(function(){
  const CDC = {};

  /* ---------- BG GRID ---------- */
  CDC.initBgGrid = function(el){
    el.classList.add('cdc-bg-grid');
    el.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cdc-g-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 0 20" fill="none" stroke="currentColor" stroke-opacity="0.07" stroke-width="1"/>
          </pattern>
          <pattern id="cdc-g-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M100 0 L0 0 0 100" fill="none" stroke="currentColor" stroke-opacity="0.18" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cdc-g-fine)"/>
        <rect width="100%" height="100%" fill="url(#cdc-g-bold)"/>
      </svg>
      <div class="cdc-bg-grid__slide-x"></div>
      <div class="cdc-bg-grid__slide-y"></div>
      <div class="cdc-bg-grid__lbl cdc-bg-grid__lbl--bl">X+0.000  Y+0.000  /  GRID 20.0</div>
      <div class="cdc-bg-grid__lbl cdc-bg-grid__lbl--tr">REV.04 / CDC</div>`;
  };

  /* ---------- MARQUEE ---------- */
  CDC.initMarquee = function(el, opts){
    el.classList.add('cdc-marquee');
    const rows = (opts && opts.rows) || [
      { text:'CDC ▪ WEB ▪ DEV ▪ DESIGN ▪ ', dir:'L', accent:false },
      { text:'BUILT FOR BUSINESS — SITES THAT WORK — ', dir:'R', accent:true },
      { text:'CDC ▪ WEB ▪ DEV ▪ DESIGN ▪ ', dir:'L', accent:false },
      { text:'INDUSTRIAL — DIGITAL — ', dir:'R', accent:false },
      { text:'CDC ▪ WEB ▪ DEV ▪ DESIGN ▪ ', dir:'L', accent:true },
    ];
    el.innerHTML = rows.map((r,i)=>`
      <div class="cdc-marquee__row ${r.accent?'cdc-marquee__row--accent':''} ${r.dir==='R'?'cdc-marquee__row--rev':''}">
        <div class="cdc-marquee__inner" style="animation-duration:${22+i*2}s">
          ${(r.text.repeat(8))}
        </div>
      </div>`).join('');
  };

  /* ---------- DIVIDER ---------- */
  CDC.initDivider = function(el, opts){
    el.classList.add('cdc-divider');
    const top = (opts && opts.top) || '— END /SERVIZI';
    const bot = (opts && opts.bot) || 'BEGIN /LAVORI';
    const chunk = `
      <span class="cdc-divider__chunk">SCROLL <span class="cdc-dot cdc-dot--y"></span> CDC <span class="cdc-dot cdc-dot--ink"></span> SITES THAT WORK <span class="cdc-dot cdc-dot--out"></span></span>`;
    el.innerHTML = `
      <div class="cdc-divider__lbl"><span>${top}</span></div>
      <div class="cdc-divider__bar"><div class="cdc-divider__inner">${chunk.repeat(8)}</div></div>
      <div class="cdc-divider__lbl"><span>${bot}</span><span class="cdc-blink">▼</span></div>`;
  };

  /* ---------- LOGO ---------- */
  CDC.initLogo = function(el, opts){
    const text = (opts && opts.text) || el.dataset.text || el.textContent.trim() || 'CDCsite';
    const loop = (opts && opts.loop) || el.dataset.loop === 'true';
    el.textContent = '';
    el.classList.add('cdc-logo');
    if (loop) el.setAttribute('data-loop','true');
    el.innerHTML = `
      <span class="cdc-logo__text">
        <span class="cdc-logo__text-inner">${text}</span>
        <span class="cdc-logo__scan"></span>
      </span>
      <span class="cdc-logo__block"></span>`;
  };

  /* ---------- LOADER ---------- */
  CDC.initLoader = function(el, opts){
    const duration = (opts && opts.duration) || parseInt(el.dataset.duration || '2200', 10);
    el.classList.add('cdc-loader');
    el.innerHTML = `
      <div class="cdc-loader__meta"><span>LOADING <span class="cdc-blink">_</span></span><span class="cdc-loader__pct">000%</span></div>
      <div class="cdc-loader__bar"><div class="cdc-loader__fill"></div></div>
      <div class="cdc-loader__sub">BUILDING ASSETS / OPTIMIZING / PUBLISHING</div>`;
    const fill = el.querySelector('.cdc-loader__fill');
    const pct  = el.querySelector('.cdc-loader__pct');
    const start = performance.now();
    function tick(now){
      const t = Math.min(1, (now-start)/duration);
      const v = Math.floor(t*100);
      fill.style.width = v+'%';
      pct.textContent = String(v).padStart(3,'0')+'%';
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(()=>el.classList.add('cdc-loader--gone'), 240);
    }
    requestAnimationFrame(tick);
  };

  /* ---------- CURSORE ---------- */
  CDC.initCursor = function(){
    if (matchMedia('(hover:none)').matches) return;          // no su touch
    if (document.querySelector('.cdc-cursor')) return;       // già montato
    document.documentElement.classList.add('cdc-cursor-on');
    const cur = document.createElement('div');
    cur.className = 'cdc-cursor';
    document.body.appendChild(cur);
    let tx=innerWidth/2, ty=innerHeight/2, x=tx, y=ty;
    addEventListener('mousemove', e => { tx=e.clientX; ty=e.clientY; });
    (function loop(){
      x += (tx-x)*0.25; y += (ty-y)*0.25;
      cur.style.left = x+'px'; cur.style.top = y+'px';
      requestAnimationFrame(loop);
    })();
    const sel = 'a, button, [data-cdc-hover], .cdc-hover';
    document.addEventListener('mouseover', e => { if(e.target.closest(sel)) cur.classList.add('cdc-cursor--over'); });
    document.addEventListener('mouseout',  e => { if(e.target.closest(sel)) cur.classList.remove('cdc-cursor--over'); });
  };

  /* ---------- TRANSIZIONE SLICE ---------- */
  CDC.initTransitions = function(){
    if (document.querySelector('.cdc-trans')) return;
    const overlay = document.createElement('div');
    overlay.className = 'cdc-trans';
    overlay.innerHTML = `
      <div class="cdc-trans__top"><div class="cdc-trans__ttl"></div></div>
      <div class="cdc-trans__bot"><div class="cdc-trans__ttl"></div></div>
      <div class="cdc-trans__line"></div>`;
    document.body.appendChild(overlay);
    const ttls = overlay.querySelectorAll('.cdc-trans__ttl');

    CDC.runTransition = function(label, onMid){
      ttls.forEach(t => t.textContent = label || '');
      overlay.classList.remove('cdc-trans--run');
      void overlay.offsetWidth;                             // restart anim
      overlay.classList.add('cdc-trans--run');
      if (onMid) setTimeout(onMid, 600);
      setTimeout(()=>overlay.classList.remove('cdc-trans--run'), 1400);
    };

    document.addEventListener('click', e => {
      const a = e.target.closest('[data-cdc-trans]');
      if (!a) return;
      const label = a.getAttribute('data-cdc-trans') || a.textContent.trim().toUpperCase();
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')){
        const tgt = document.querySelector(href);
        if (tgt){ e.preventDefault(); CDC.runTransition(label, () => tgt.scrollIntoView()); }
      } else if (href){
        e.preventDefault();
        CDC.runTransition(label, () => location.href = href);
      } else {
        CDC.runTransition(label);
      }
    });
  };

  /* ---------- REVEAL ---------- */
  CDC.initReveal = function(){
    const els = document.querySelectorAll('.cdc-reveal');
    if (!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('cdc-in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('cdc-in'); io.unobserve(en.target); } });
    }, { threshold:0.18 });
    els.forEach(el => io.observe(el));
  };

  /* ---------- AUTO-INIT ---------- */
  function autoInit(){
    document.querySelectorAll('[data-cdc="bg-grid"]').forEach(CDC.initBgGrid);
    document.querySelectorAll('[data-cdc="marquee"]').forEach(el => CDC.initMarquee(el));
    document.querySelectorAll('[data-cdc="divider"]').forEach(el => CDC.initDivider(el));
    document.querySelectorAll('[data-cdc="logo"]').forEach(el => CDC.initLogo(el));
    document.querySelectorAll('[data-cdc="loader"]').forEach(el => CDC.initLoader(el));
    CDC.initTransitions();
    CDC.initReveal();
    // Cursore: opt-in (aggiungi data-cdc-cursor al <html> o <body>)
    if (document.documentElement.hasAttribute('data-cdc-cursor') ||
        document.body.hasAttribute('data-cdc-cursor')) CDC.initCursor();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();

  window.CDC = CDC;
})();
