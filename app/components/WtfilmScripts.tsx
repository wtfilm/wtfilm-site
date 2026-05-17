'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function WtfilmScripts() {
  const pathname = usePathname()

  useEffect(() => {
    const ac = new AbortController()
    const sig = ac.signal

    const categoryToneMap: Record<string, string> = {
      campanhas: 'oklch(61% 0.25 18 / .28)',
      ia: 'oklch(61% 0.25 18 / .26)',
      conteudo: 'oklch(56% 0.25 264 / .24)',
      videoclipes: 'oklch(56% 0.25 264 / .25)',
      cinema: 'oklch(68% 0.20 50 / .24)',
      animacao: 'oklch(68% 0.20 50 / .25)',
    }

    function applyRouteTone(category: string, persistent = false) {
      const tone = categoryToneMap[category]
      if (!tone) return
      document.body.style.setProperty('--route-tone', tone)
      document.body.style.setProperty('--route-tone-opacity', '.42')
      if (persistent) {
        try { sessionStorage.setItem('wtfilm-route-tone', category) } catch {}
      }
    }

    function initRouteTone() {
      const requested = new URLSearchParams(window.location.search).get('f')
      let stored: string | null = null
      try { stored = sessionStorage.getItem('wtfilm-route-tone'); sessionStorage.removeItem('wtfilm-route-tone') } catch {}
      applyRouteTone(requested || stored || '')
      document.querySelectorAll<HTMLElement>('a[href*="?f="], [data-filter]').forEach((item) => {
        item.addEventListener('click', () => {
          let category = (item as HTMLElement).dataset.filter
          if (!category || category === 'todos') {
            const href = item.getAttribute('href')
            if (href) category = new URL(href, window.location.href).searchParams.get('f') ?? undefined
          }
          if (category && category !== 'todos') applyRouteTone(category, item.tagName === 'A')
        }, { signal: sig })
      })
    }

    function initLoader() {
      if (document.querySelector('.site-loader')) return
      const loader = document.createElement('div')
      loader.className = 'site-loader'
      loader.setAttribute('aria-hidden', 'true')
      loader.innerHTML = `<div class="loader-core"><img class="loader-logo" src="/logo.png" alt=""><div class="loader-track"></div></div>`
      document.body.prepend(loader)
      const finish = () => { loader.classList.add('is-done'); window.setTimeout(() => loader.remove(), 620) }
      window.setTimeout(finish, 620)
    }

    function initMobileMenu() {
      const toggle = document.querySelector('[data-menu-toggle]')
      const menu = document.querySelector('[data-mobile-menu]')
      if (!toggle || !menu) return
      toggle.setAttribute('aria-expanded', 'false')
      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open')
        toggle.classList.toggle('is-open', isOpen)
        toggle.setAttribute('aria-expanded', String(isOpen))
      }, { signal: sig })
      menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          menu.classList.remove('open')
          toggle.classList.remove('is-open')
          toggle.setAttribute('aria-expanded', 'false')
        }, { signal: sig })
      })
    }

    function initFilters() {
      document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
        const buttons = group.querySelectorAll<HTMLElement>('[data-filter]')
        const grid = group.closest('.works-page')?.querySelector<HTMLElement>('.grid')
        const cards: HTMLElement[] = grid
          ? [...grid.querySelectorAll<HTMLElement>('[data-category]')]
          : [...document.querySelectorAll<HTMLElement>('[data-category]')]

        const requested = new URLSearchParams(window.location.search).get('f')

        const applyFilter = (filter: string) => {
          if (grid) grid.classList.toggle('is-filtered', filter !== 'todos')
          buttons.forEach((b) => b.classList.toggle('active', b.dataset.filter === filter))
          cards.forEach((c) => {
            const show = filter === 'todos' || c.dataset.category === filter
            c.style.display = show ? '' : 'none'
            if (show) c.animate(
              [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
              { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' }
            )
          })
          // Scroll rail de volta ao início ao trocar filtro
          if (grid) grid.scrollTo({ left: 0, behavior: 'smooth' })
        }

        buttons.forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter!), { signal: sig }))
        if (requested && [...buttons].some((b) => b.dataset.filter === requested)) applyFilter(requested)
      })
    }

    // ── Dados dos moodboards ─────────────────────────────────────────────────
    // Para adicionar imagens reais: substitua os src="" por URLs ou caminhos locais.
    // Cada entrada é identificada pelo title do card (data-work-player-title).
    const moodboardData: Record<string, {
      description: string
      note: string
      specs: { cliente: string; formato: string; ano: string; direção: string }
      crew: { cargo: string; nome: string }[]
      hero: string        // URL da imagem hero
      strip: [string, string]           // 2 imagens da faixa horizontal
      grid: [string, string, string, string]  // 4 imagens da grade
    }> = {
      'Conexões que viram histórias': {
        description: 'Uma série documental sobre pessoas e lugares que carregam memória. Cada episódio é uma janela para um mundo que existe antes da câmera chegar — onde o cotidiano revela o extraordinário.',
        note: 'O documental não é apenas um formato — é uma postura. A câmera que observa antes de comentar.',
        specs: { cliente: 'wtfilm', formato: 'série documental', ano: '2024', direção: 'wtfilm' },
        crew: [
          { cargo: 'direção', nome: 'wtfilm' },
          { cargo: 'dir. de fotografia', nome: 'Ana Lima' },
          { cargo: 'produção executiva', nome: 'Marcos Teixeira' },
          { cargo: 'edição', nome: 'Carolina Mendes' },
          { cargo: 'colorização', nome: 'Pedro Alves' },
          { cargo: 'som e trilha', nome: 'Studio Vox' },
        ],
        // ↓ Substitua pelos caminhos reais das imagens do projeto
        hero:  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=85&auto=format&fit=crop',
        strip: [
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=85&auto=format&fit=crop',
        ],
        grid: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&q=85&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=800&q=85&auto=format&fit=crop',
        ],
      },
    }

    function buildMoodboardHTML(title: string, category: string, meta: string, accent: string): string {
      const d = moodboardData[title]
      if (!d) return `<div class="behance-case"><p style="color:var(--muted);padding:40px">Conteúdo do moodboard em breve.</p></div>`
      const img = (src: string, alt = '') =>
        src ? `<img src="${src}" alt="${alt}" loading="lazy" />` : ''
      return `
        <div class="behance-case" style="--player-accent:${accent}">
          <figure class="behance-hero-frame-a">
            ${img(d.hero, title)}
            <div class="behance-hero-a-overlay">
              <div class="behance-hero-pill">
                <span style="color:${accent}">${category}</span>
                <span class="behance-hero-pill-sep">·</span>
                <span>${meta}</span>
              </div>
              <h2>${title}</h2>
            </div>
          </figure>
          <div class="behance-hero-a-body">
            <p class="behance-hero-a-desc">${d.description}</p>
            <div class="behance-hero-a-specs">
              <dl>
                <div><dt>cliente</dt><dd>${d.specs.cliente}</dd></div>
                <div><dt>formato</dt><dd>${d.specs.formato}</dd></div>
                <div><dt>ano</dt><dd>${d.specs.ano}</dd></div>
                <div><dt>direção</dt><dd>${d.specs.direção}</dd></div>
              </dl>
            </div>
          </div>

          <div class="behance-case-strip">
            <figure>${img(d.strip[0], 'cena 01')}<figcaption>cena 01</figcaption></figure>
            <figure>${img(d.strip[1], 'making of')}<figcaption>making of</figcaption></figure>
          </div>

          <div class="behance-case-note">
            <span>direção</span>
            <p>"${d.note}"</p>
          </div>

          <div class="behance-case-grid">
            <figure>${img(d.grid[0])}</figure>
            <figure>${img(d.grid[1])}</figure>
            <figure>${img(d.grid[2])}</figure>
            <figure>${img(d.grid[3])}</figure>
          </div>

          <div class="behance-case-spec">
            <span>equipe</span>
            <div class="behance-crew">
              ${d.crew.map(c => `
                <div class="behance-crew-row">
                  <dt>${c.cargo}</dt>
                  <dd>${c.nome}</dd>
                </div>`).join('')}
            </div>
          </div>
        </div>`
    }

    function initWorkCardPlayers() {
      const cards = document.querySelectorAll<HTMLElement>('.works-page .card[data-category]')
      const reelButtons = document.querySelectorAll<HTMLElement>('[data-reel-player]')
      if (!cards.length && !reelButtons.length) return
      const descriptions: Record<string, string> = {
        campanhas: 'Imagem de marca com desejo, presença e precisão.',
        ia: 'Experimento audiovisual onde inteligência artificial entra como extensão de direção.',
        conteudo: 'Conteúdo filmado com olhar documental, ritmo contemporâneo e foco em presença humana.',
        videoclipes: 'Performance, cor e montagem para transformar música em atmosfera visual.',
        cinema: 'Narrativa visual com silêncio, paisagem e construção de personagem.',
        animacao: 'Mundos e personagens imaginados com textura cinematográfica e direção de arte.',
      }
      const labels: Record<string, string> = {
        campanhas: 'Campanha', ia: 'IA / Experimentos', conteudo: 'Conteúdo',
        videoclipes: 'Videoclipe', cinema: 'Cinema', animacao: 'Animação',
      }
      let overlay = document.querySelector<HTMLElement>('[data-work-player-overlay]')
      if (!overlay) {
        overlay = document.createElement('section')
        overlay.className = 'work-player-overlay'
        overlay.setAttribute('data-work-player-overlay', '')
        overlay.setAttribute('aria-hidden', 'true')
        overlay.innerHTML = `
          <div class="work-player-shell" role="dialog" aria-modal="true">
            <button class="work-player-back" type="button" data-work-player-close aria-label="Voltar">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12l7 7"></path></svg>
            </button>
            <div class="work-player-video" data-work-player-video></div>
            <button class="work-player-more" type="button" data-work-player-more>
              <span>informações do projeto</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
            </button>
            <div class="work-player-info">
              <button class="work-player-info-close" type="button" data-work-player-info-close aria-label="Minimizar">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"></path></svg>
              </button>
              <div><span class="kicker" data-work-player-category></span><h2 data-work-player-title></h2></div>
              <div class="work-player-info-body" data-work-player-description></div>
            </div>
          </div>`
        document.body.appendChild(overlay)
      }
      const video = overlay.querySelector<HTMLElement>('[data-work-player-video]')
      const close = overlay.querySelector<HTMLElement>('[data-work-player-close]')
      const more = overlay.querySelector<HTMLElement>('[data-work-player-more]')
      const infoClose = overlay.querySelector<HTMLElement>('[data-work-player-info-close]')
      const titleNode = overlay.querySelector<HTMLElement>('[data-work-player-title]')
      const categoryNode = overlay.querySelector<HTMLElement>('[data-work-player-category]')
      const descriptionNode = overlay.querySelector<HTMLElement>('[data-work-player-description]')
      const closeOverlay = () => {
        overlay!.classList.remove('open', 'info-open', 'mode-moodboard')
        overlay!.setAttribute('aria-hidden', 'true')
        document.body.classList.remove('work-player-open')
        if (more) { more.setAttribute('aria-expanded', 'false'); more.hidden = false }
        if (video) video.innerHTML = ''
        // Garante reset do scroll interno do overlay
        overlay!.scrollTo({ top: 0, behavior: 'auto' })
      }
      const openOverlay = (card: HTMLElement, index: number) => {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Projeto wtfilm'
        const meta = card.querySelector('.card-meta')?.textContent?.trim() || 'filme'
        const category = card.dataset.category || ''
        const workType = card.dataset.workType || 'video'
        const accent = getComputedStyle(card).getPropertyValue('--card-accent').trim() || 'var(--accent)'
        overlay!.style.setProperty('--player-accent', accent || 'var(--accent)')

        if (workType === 'moodboard') {
          // ── Modo moodboard (Behance) ─────────────────────────────────────
          overlay!.classList.add('open', 'mode-moodboard')
          overlay!.classList.remove('info-open')
          overlay!.setAttribute('aria-hidden', 'false')
          document.body.classList.add('work-player-open')
          if (video) video.innerHTML = buildMoodboardHTML(title, labels[category] || category, meta, accent)
          if (more) more.hidden = true
          overlay!.scrollTo({ top: 0, behavior: 'auto' })
        } else {
          // ── Modo vídeo (player padrão) ───────────────────────────────────
          const vimeoId = card.dataset.vimeoId || '699221144'
          const vimeoHash = card.dataset.vimeoHash || '41566b7914'
          if (titleNode) titleNode.textContent = title
          if (categoryNode) categoryNode.textContent = `${labels[category] || 'Projeto'} · ${meta}`
          if (descriptionNode) descriptionNode.innerHTML = `<p>${descriptions[category] || 'Projeto audiovisual wtfilm.'}</p>`
          if (video) video.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&badge=0&autopause=0&app_id=58479&autoplay=1&player_id=work-${index}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="${title}"></iframe>`
          document.body.classList.add('work-player-open')
          overlay!.classList.add('open')
          overlay!.classList.remove('mode-moodboard', 'info-open')
          overlay!.setAttribute('aria-hidden', 'false')
          if (more) { more.setAttribute('aria-expanded', 'false'); more.hidden = false }
          overlay!.scrollTo({ top: 0, behavior: 'auto' })
        }
      }
      cards.forEach((card, i) => {
        card.addEventListener('click', (e) => { e.preventDefault(); openOverlay(card, i) }, { signal: sig })
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openOverlay(card, i) } }, { signal: sig })
      })
      reelButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault()
          if (titleNode) titleNode.textContent = 'Demo reel'
          if (categoryNode) categoryNode.textContent = 'wtfilm · seleção de filmes'
          if (descriptionNode) descriptionNode.innerHTML = '<p>Uma síntese visual do olhar da wtfilm.</p>'
          if (video) video.innerHTML = `<iframe src="https://player.vimeo.com/video/699221144?h=41566b7914&badge=0&autopause=0&app_id=58479&autoplay=1&player_id=home-reel" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="Demo reel wtfilm"></iframe>`
          document.body.classList.add('work-player-open')
          overlay!.classList.add('open')
          overlay!.classList.remove('info-open', 'mode-moodboard')
          overlay!.setAttribute('aria-hidden', 'false')
          if (more) { more.setAttribute('aria-expanded', 'false'); more.hidden = false }
        }, { signal: sig })
      })
      if (close) close.addEventListener('click', closeOverlay, { signal: sig })
      if (more) {
        more.addEventListener('click', () => {
          const isOpen = overlay!.classList.toggle('info-open')
          more.setAttribute('aria-expanded', String(isOpen))
        }, { signal: sig })
      }
      if (infoClose && more) {
        infoClose.addEventListener('click', () => { overlay!.classList.remove('info-open'); more.setAttribute('aria-expanded', 'false') }, { signal: sig })
      }
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay() }, { signal: sig })
      window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay() }, { signal: sig })
    }

    function initContactForm() {
      const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
      const status = document.querySelector<HTMLElement>('[data-form-status]')
      if (!form || !status) return
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const invalid = [...form.querySelectorAll<HTMLInputElement>('[required]')].some((f) => !f.value.trim())
        status.textContent = invalid ? 'Preencha os campos essenciais.' : 'Briefing recebido. A wtfilm responde em breve.'
        status.style.color = invalid ? 'oklch(72% 0.18 55)' : 'oklch(72% 0.18 145)'
      }, { signal: sig })
    }

    function initCinematicMouse() {
      const root = document.querySelector<HTMLElement>('.home-site')
      // Não roda em touch devices (hover:none) — causa lag no mobile
      if (!root
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || window.matchMedia('(hover: none)').matches) return
      let rafFrame: number | null = null
      let next = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      let currentDotIndex = 0
      let forcedDot: { color: string; glow: string } | null = null
      const dotColors = [
        { color: 'oklch(61% 0.25 18)', glow: 'oklch(61% 0.25 18 / .34)' },
        { color: 'oklch(56% 0.25 264)', glow: 'oklch(56% 0.25 264 / .34)' },
        { color: 'oklch(68% 0.20 50)', glow: 'oklch(68% 0.20 50 / .34)' },
      ]
      const apply = () => {
        rafFrame = null
        const mx = (next.x / window.innerWidth) * 100
        const my = (next.y / window.innerHeight) * 100
        const dx = next.x / window.innerWidth - 0.5
        const dy = next.y / window.innerHeight - 0.5
        const colorPosition = mx * 0.55 + my * 0.45
        const rawIndex = Math.min(dotColors.length - 1, Math.max(0, Math.floor(colorPosition / (100 / dotColors.length))))
        const currentCenter = (currentDotIndex + 0.5) * (100 / dotColors.length)
        if (rawIndex !== currentDotIndex && Math.abs(colorPosition - currentCenter) > 17) currentDotIndex = rawIndex
        const dot = forcedDot || dotColors[currentDotIndex]
        root.style.setProperty('--mx', `${mx}%`)
        root.style.setProperty('--my', `${my}%`)
        root.style.setProperty('--tilt-x', `${(50 - my) * 0.035}deg`)
        root.style.setProperty('--tilt-y', `${(mx - 50) * 0.045}deg`)
        root.style.setProperty('--bg-x', `${dx * -22}px`)
        root.style.setProperty('--bg-y', `${dy * -16}px`)
        root.style.setProperty('--title-x', `${dx * 20}px`)
        root.style.setProperty('--title-y', `${dy * 16}px`)
        root.style.setProperty('--glass-x', `${dx * -28}px`)
        root.style.setProperty('--glass-y', `${dy * -18}px`)
        root.style.setProperty('--chapter-x', `${dx * 16}px`)
        root.style.setProperty('--chapter-y', `${dy * 10}px`)
        root.style.setProperty('--chapter-info-x', `${dx * 38}px`)
        root.style.setProperty('--chapter-info-y', `${dy * 26}px`)
        root.style.setProperty('--chapter-visual-x', `${dx * -48}px`)
        root.style.setProperty('--chapter-visual-y', `${dy * -32}px`)
        root.style.setProperty('--hero-dot-color', dot.color)
        root.style.setProperty('--hero-dot-glow', dot.glow)
        root.style.setProperty('--hero-kicker-color', dot.color)
      }
      const requestApply = () => { if (!rafFrame) rafFrame = requestAnimationFrame(apply) }
      window.addEventListener('pointermove', (e) => { next = { x: e.clientX, y: e.clientY }; requestApply() }, { signal: sig })
      document.querySelectorAll<HTMLElement>('.sidebar .nav a').forEach((item, i) => {
        item.addEventListener('pointerenter', () => { forcedDot = [dotColors[0], dotColors[1], dotColors[2], dotColors[0]][i] || dotColors[0]; requestApply() }, { signal: sig })
      })
      const sidebar = document.querySelector('.sidebar')
      if (sidebar) sidebar.addEventListener('pointerleave', () => { forcedDot = null; requestApply() }, { signal: sig })
    }

    function initHomeSequence() {
      const experience = document.querySelector<HTMLElement>('[data-home-experience]')
      const scroller = document.querySelector<HTMLElement>('[data-chapter-scroller]')
      if (!scroller || !experience) return

      const slides = [...scroller.querySelectorAll<HTMLElement>('.chapter-slide')]
      const chapters = [...scroller.querySelectorAll<HTMLElement>('.chapter-slide.chapter')]
      // Cache chapter visuals upfront — evita querySelector dentro do scroll handler
      const chapterVisuals = chapters.map(ch => ch.querySelector<HTMLElement>('.chapter-visual'))
      const progress = experience.querySelector<HTMLElement>('.sequence-progress')
      const progressSpan = progress?.querySelector<HTMLElement>('span')
      const revealButton = experience.querySelector<HTMLElement>('[data-scroll-reveal]')
      const returnButton = experience.querySelector<HTMLElement>('[data-chapter-return]')
      if (!slides.length) return

      // Reset scroll on every route entry (prevents stale position on navigation back)
      scroller.scrollTop = 0

      let currentIndex = 0
      // Lerp para barra suave — interpola sem depender de CSS transition em var()
      let progressDisplayed = 0
      let progressTarget = 0
      let progressRaf: number | null = null

      const animateProgress = () => {
        progressRaf = null
        const diff = progressTarget - progressDisplayed
        if (Math.abs(diff) < 0.0005) {
          progressDisplayed = progressTarget
        } else {
          progressDisplayed += diff * 0.14
          progressRaf = requestAnimationFrame(animateProgress)
        }
        if (progressSpan) progressSpan.style.transform = `scaleX(${progressDisplayed.toFixed(4)})`
      }

      const update = () => {
        const h = scroller.clientHeight || window.innerHeight
        const rawIdx = scroller.scrollTop / Math.max(1, h)
        const idx = Math.round(rawIdx)
        currentIndex = idx
        const isChapter = idx > 0

        // has-chapter on experience for CSS state (blur hero, show return btn, etc.)
        experience.classList.toggle('has-chapter', isChapter)

        // Progress bar: target contínuo, animado via lerp no RAF
        if (progressSpan && chapters.length > 1) {
          // hero = 0, lâmina 1 = 1/6, lâmina 6 = 1
          progressTarget = Math.min(1, Math.max(0, rawIdx / chapters.length))
          if (!progressRaf) progressRaf = requestAnimationFrame(animateProgress)
        }

        // Mark active chapter slide for enter animation
        slides.forEach((slide, i) => {
          slide.classList.toggle('is-snap-target', i === idx)
        })

        // Parallax: chapter-visual shifts at ~0.45x the slide scroll rate
        chapterVisuals.forEach((visual, i) => {
          if (!visual) return
          const fraction = rawIdx - (i + 1)
          const py = -(fraction * 44)
          visual.style.setProperty('--parallax-y', `${py.toFixed(1)}px`)
        })
      }

      // Run once at init
      update()

      scroller.addEventListener('scroll', update, { passive: true, signal: sig })
      window.addEventListener('resize', update, { signal: sig })

      // iOS snap fix — só em touch devices. No desktop o CSS snap é confiável
      // e o timer interfere com o smooth scroll nativo, causando stuttering.
      const isTouch = navigator.maxTouchPoints > 0
      if (isTouch) {
        let snapFixTimer: ReturnType<typeof setTimeout> | null = null
        scroller.addEventListener('scroll', () => {
          if (snapFixTimer) clearTimeout(snapFixTimer)
          snapFixTimer = setTimeout(() => {
            const h = scroller.clientHeight
            if (h <= 0) return
            const ideal = Math.round(scroller.scrollTop / h) * h
            if (Math.abs(scroller.scrollTop - ideal) > 3) {
              scroller.scrollTo({ top: ideal, behavior: 'smooth' })
            }
          }, 450)
        }, { passive: true, signal: sig })

        // Recalcula quando o visualViewport muda (Safari bar aparece/some)
        if (window.visualViewport) {
          window.visualViewport.addEventListener('resize', update, { signal: sig })
        }
      }

      // "explorar" button → scroll to first chapter
      if (revealButton) {
        revealButton.addEventListener('click', () => {
          scroller.scrollTo({ top: scroller.clientHeight, behavior: 'smooth' })
        }, { signal: sig })
      }

      // "início" return button → scroll back to hero
      if (returnButton) {
        returnButton.addEventListener('click', () => {
          scroller.scrollTo({ top: 0, behavior: 'smooth' })
        }, { signal: sig })
      }
    }

    function initGlassHover() {
      const targets = document.querySelectorAll<HTMLElement>('.pill, .button, .play-link, .card, .menu-toggle, .field input, .field textarea, .field select, .work-player-info-close')
      targets.forEach((target) => {
        // Cache rect on enter — getBoundingClientRect() numa pointermove força reflow por frame
        let rect = { left: 0, top: 0, width: 1, height: 1 }
        target.addEventListener('pointerenter', () => {
          rect = target.getBoundingClientRect()
        }, { signal: sig })
        target.addEventListener('pointermove', (e) => {
          target.style.setProperty('--local-x', `${((e.clientX - rect.left) / rect.width * 100).toFixed(2)}%`)
          target.style.setProperty('--local-y', `${((e.clientY - rect.top) / rect.height * 100).toFixed(2)}%`)
        }, { signal: sig })
      })
    }

    function initLazyVideos() {
      const scroller = document.querySelector<HTMLElement>('[data-chapter-scroller]')
      const iframes = [...document.querySelectorAll<HTMLIFrameElement>('.chapter-visual-video iframe[data-src]')]
      if (!iframes.length) return

      const load = (iframe: HTMLIFrameElement) => {
        if (!iframe.src && iframe.dataset.src) iframe.src = iframe.dataset.src
      }

      // Usa o chapter-scroller como root e pré-carrega 1 slide à frente/atrás
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) load(entry.target as HTMLIFrameElement)
        })
      }, { root: scroller || null, rootMargin: '100% 0px' })

      iframes.forEach(iframe => observer.observe(iframe))
    }

    function initVisualViewportOffset() {
      // Empurra conteúdo abaixo da barra do browser em landscape mobile.
      // A media query restringe o comportamento a celulares deitados (max-height: 500px).
      // maxH é resetado a cada mudança de orientação para não carregar altura do portrait.
      const mq = window.matchMedia('(orientation: landscape) and (max-height: 500px)')
      let maxH = window.innerHeight

      const setTop = (px: number) =>
        document.documentElement.style.setProperty('--vv-top', `${px}px`)

      const update = () => {
        if (!mq.matches) { setTop(0); return }
        maxH = Math.max(maxH, window.innerHeight)
        setTop(Math.max(0, maxH - window.innerHeight))
      }

      // Ao mudar de orientação, reseta maxH com a nova altura atual
      mq.addEventListener('change', () => { maxH = window.innerHeight; setTop(0) }, { signal: sig })

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', update, { signal: sig })
      }
      window.addEventListener('resize', update, { signal: sig })
      update()
    }

    function initPlayFeedback() {
      document.querySelectorAll<HTMLElement>('.play-link').forEach((btn) => {
        btn.addEventListener('pointerdown', () => { btn.classList.remove('clicked'); requestAnimationFrame(() => btn.classList.add('clicked')) }, { signal: sig })
        btn.addEventListener('animationend', () => btn.classList.remove('clicked'), { signal: sig })
      })
    }

    // Ativa classe works-body na página de trabalhos para o rail horizontal
    const isWorksPage = pathname === '/trabalhos'
    if (isWorksPage) document.body.classList.add('works-body')

    initLoader()
    initRouteTone()
    initMobileMenu()
    initFilters()
    initWorkCardPlayers()
    initContactForm()
    initCinematicMouse()
    initHomeSequence()
    initLazyVideos()
    initPlayFeedback()
    initGlassHover()
    initVisualViewportOffset()

    return () => {
      ac.abort()
      document.body.classList.remove('works-body')
    }
  }, [pathname])

  return (
    <Script
      src="https://player.vimeo.com/api/player.js"
      strategy="afterInteractive"
    />
  )
}
