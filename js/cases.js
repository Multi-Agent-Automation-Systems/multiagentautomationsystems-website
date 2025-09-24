(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const state = {
    base: null,
    currentDept: null,
    items: [],
    index: 0
  };

  function baseUrl() {
    if (!state.base) state.base = (window.SUPABASE_PUBLIC_BASE || "").replace(/\/+$/,'');
    return state.base;
  }

  function deptIndexUrl(dept) {
    return `${baseUrl()}/${dept}/index.json`;
  }

  function projectManifestUrl(dept, folder) {
    return `${baseUrl()}/${dept}/${folder}/manifest.json`;
  }

  // ---------- Modals ----------
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    trapFocus(modal);
    document.body.classList.add('modal-open');
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
  function trapFocus(modal){
    // Minimal focus trap: focus first focusable
    const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
    if (focusables.length) focusables[0].focus();
    function handler(e){
      if (e.key === 'Escape') closeModal(modal);
      if (e.key !== 'Tab') return;
      const first = focusables[0], last = focusables[focusables.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    modal._trapHandler && modal.removeEventListener('keydown', modal._trapHandler);
    modal._trapHandler = handler;
    modal.addEventListener('keydown', handler);
  }

  // Close on click-away and on close buttons
  document.addEventListener('click', (e)=>{
    const target = e.target;
    const anyModal = target.closest('.modal');
    if (anyModal && target.classList.contains('modal')) closeModal(anyModal);
    if (target.matches('.modal .close')) closeModal(target.closest('.modal'));
  });

  // ---------- Project Picker ----------
  async function openProjectPicker(dept){
    state.currentDept = dept;
    const picker = $('#cases-picker-modal');
    const grid = $('#cases-projects-grid');
    grid.innerHTML = `<div class="cases-loading">Loading projects…</div>`;
    openModal(picker);
    try {
      const res = await fetch(deptIndexUrl(dept), { cache: 'no-store' });
      if (!res.ok) throw new Error('Missing index.json');
      const data = await res.json();
      const projects = (data && data.projects) || [];
      if (!projects.length) {
        grid.innerHTML = `<div class="cases-empty">Projects will appear here soon.</div>`;
        return;
      }
      grid.innerHTML = projects.map(p => renderProjectCard(p)).join('');
      // Bind cards
      $$('.project-card', grid).forEach(card=>{
        card.addEventListener('click', ()=>{
          const folder = card.getAttribute('data-folder');
          openProject(dept, folder);
        });
      });
    } catch (e) {
      grid.innerHTML = `<div class="cases-empty">Projects will appear here soon.</div>`;
    }
  }

  function renderProjectCard(p){
    const thumb = p.thumbnail || '';
    const name = escapeHtml(p.name || 'Project');
    return `
      <div class="project-card" data-folder="${escapeAttr(p.folder)}" tabindex="0" role="button" aria-label="Open ${name}">
        ${thumb ? `<img src="${thumb}" alt="${name} thumbnail">` : `<div class="thumb placeholder"></div>`}
        <div class="name">${name}</div>
      </div>`;
  }

  // ---------- Slideshow ----------
  async function openProject(dept, folder){
    try {
      const res = await fetch(projectManifestUrl(dept, folder), { cache: 'no-store' });
      if (!res.ok) throw new Error('Missing project manifest');
      const data = await res.json();
      state.items = (data && data.items) || [];
      state.index = 0;
      // Close picker, open slideshow
      closeModal($('#cases-picker-modal'));
      if (!state.items.length) return;
      openModal($('#cases-slideshow-modal'));
      renderSlide();
      bindSlideControls();
    } catch (e) {
      // show friendly error in picker
      const grid = $('#cases-projects-grid');
      grid && (grid.innerHTML = `<div class="cases-empty">This project has no items yet.</div>`);
    }
  }

  function bindSlideControls(){
    const modal = $('#cases-slideshow-modal');
    const prevBtn = $('.nav.prev', modal);
    const nextBtn = $('.nav.next', modal);

    prevBtn.onclick = ()=>step(-1);
    nextBtn.onclick = ()=>step(1);

    // Keyboard arrows
    modal._keyHandler && modal.removeEventListener('keydown', modal._keyHandler);
    modal._keyHandler = (e)=>{
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    modal.addEventListener('keydown', modal._keyHandler);
  }

  function step(dir){
    const total = state.items.length;
    state.index = (state.index + dir + total) % total;
    renderSlide();
  }

  function renderSlide(){
    const container = $('#cases-slide-container');
    const titleEl = $('#cases-slide-title');
    const counterEl = $('#cases-slide-counter');
    const it = state.items[state.index];
    if (!it){ container.innerHTML = ''; return; }

    // One item at a time
    if (it.type === 'video') {
      container.innerHTML = `
        <video class="slide-media" src="${it.url}" controls preload="metadata"></video>
      `;
    } else {
      container.innerHTML = `
        <img class="slide-media" src="${it.url}" alt="${escapeAttr(it.title || 'Case media')}">
      `;
    }

    titleEl.textContent = it.title || '';
    counterEl.textContent = `${state.index + 1} / ${state.items.length}`;
  }

  // ---------- Public binding for "Inspect Cases" buttons ----------
  window.bindCasesButtons = function(){
    $$('[data-inspect-cases]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const dept = btn.getAttribute('data-inspect-cases');
        openProjectPicker(dept);
      });
    });
  };

  // ---------- Utils ----------
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m]));}
  function escapeAttr(s){return String(s).replace(/"/g,"&quot;");}
})();