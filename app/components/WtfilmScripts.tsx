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
        const grid = group.closest('.works-page')?.querySelector('.grid')
        const cards: HTMLElement[] = grid
          ? [...grid.querySelectorAll<HTMLElement>('[data-category]')]
          : [...document.querySelectorAll<HTMLElement>('[data-category]')]

        // Save the original DOM order so "todos" can restore the mosaic nth-child positions
        const originalOrder = [...cards]

        const requested = new URLSearchParams(window.location.search).get('f')
        const categoryOrder = ['campanhas', 'ia', 'conteudo', 'videoclipes', 'cinema', 'animacao']
        const categoryBuckets = categoryOrder.map((cat) => cards.filter((c) => c.dataset.category === cat))
        const orderedCards = new Map<string, HTMLElement[]>()
        categoryOrder.forEach((cat) => orderedCards.set(cat, cards.filter((c) => c.dataset.category === cat)))

        const applyFilter = (filter: string) => {
          if (grid) {
            if (filter === 'todos') {
              // Restore original DOM order to preserve nth-child mosaic CSS positions
              originalOrder.forEach((c) => grid.appendChild(c))
            } else {
              const nextCards = orderedCards.get(filter) || cards
              nextCards.forEach((c) => grid.appendChild(c))
            }
          }
          if (grid) grid.classList.toggle('is-filtered', filter !== 'todos')
          buttons.forEach((b) => b.classList.toggle('active', b.dataset.filter === filter))
          cards.forEach((c) => {
            const show = filter === 'todos' || c.dataset.category === filter
            c.style.display = show ? '' : 'none'
            if (show) c.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' })
          })
          if (grid) (grid as HTMLElement).scrollTo({ left: 0, behavior: 'smooth' })
        }
        buttons.forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter!), { signal: sig }))
        if (requested && [...buttons].some((b) => b.dataset.filter === requested)) applyFilter(requested)
      })
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
      }
      const openOverlay = (card: HTMLElement, index: number) => {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Projeto wtfilm'
        const meta = card.querySelector('.card-meta')?.textContent?.trim() || 'filme'
        const category = card.dataset.category || ''
        const vimeoId = card.dataset.vimeoId || '699221144'
        const vimeoHash = card.dataset.vimeoHash || '41566b7914'
        overlay!.style.setProperty('--player-accent', getComputedStyle(card).getPropertyValue('--card-accent') || 'var(--accent)')
        if (titleNode) titleNode.textContent = title
        if (categoryNode) categoryNode.textContent = `${labels[category] || 'Projeto'} · ${meta}`
        if (descriptionNode) descriptionNode.innerHTML = `<p>${descriptions[category] || 'Projeto audiovisual wtfilm.'}</p>`
        if (video) video.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&badge=0&autopause=0&app_id=58479&autoplay=1&player_id=work-${index}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="${title}"></iframe>`
        document.body.classList.add('work-player-open')
        overlay!.classList.add('open')
        overlay!.classList.remove('info-open')
        overlay!.setAttribute('aria-hidden', 'false')
        if (more) { more.setAttribute('aria-expanded', 'false'); more.hidden = false }
        overlay!.scrollTo({ top: 0, behavior: 'auto' })
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
      if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
        root.style.setProperty('--chapter-info-x', `${dx * 14}px`)
        root.style.setProperty('--chapter-info-y', `${dy * 9}px`)
        root.style.setProperty('--chapter-visual-x', `${dx * -18}px`)
        root.style.setProperty('--chapter-visual-y', `${dy * -12}px`)
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
      const sequence = document.querySelector<HTMLElement>('[data-home-sequence]')
      if (!sequence) return
      const pin = sequence.querySelector<HTMLElement>('.home-pin')
      const chapters = [...sequence.querySelectorAll<HTMLElement>('[data-step]')]
      const progress = sequence.querySelector<HTMLElement>('.sequence-progress')
      const revealButton = sequence.querySelector<HTMLElement>('[data-scroll-reveal]')
      if (!chapters.length) return
      const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
      const smooth = (e0: number, e1: number, v: number) => { const t = clamp((v - e0) / (e1 - e0)); return t * t * (3 - 2 * t) }
      const revealStart = 0.08, revealEnd = 0.95
      const readAmount = () => {
        const rect = sequence.getBoundingClientRect()
        const scrollable = Math.max(1, rect.height - window.innerHeight)
        return clamp(-rect.top / scrollable)
      }
      const targetAmountFor = (index: number) => {
        const step = (revealEnd - revealStart) / chapters.length
        return revealStart + step * (index + 0.94)
      }
      const scrollToAmount = (amount: number) => {
        const scrollable = Math.max(1, sequence.offsetHeight - window.innerHeight)
        window.scrollTo({ top: sequence.offsetTop + scrollable * clamp(amount), behavior: 'smooth' })
      }
      let raf: number | null = null
      let rafInit: number | null = null
      const render = (amount: number) => {
        const chapterProgress = clamp((amount - revealStart) / (revealEnd - revealStart))
        const hasChapter = amount > revealStart + 0.006
        const flow = chapterProgress * chapters.length
        const activeIndex = clamp(Math.floor(flow + 0.36), 0, chapters.length - 1)
        sequence.style.setProperty('--sequence-progress', amount.toFixed(3))
        if (pin) pin.classList.toggle('has-chapter', hasChapter)
        if (progress) progress.style.setProperty('--sequence-progress', amount.toFixed(3))
        chapters.forEach((chapter, i) => {
          const local = flow - i
          const entering = smooth(0, 1, local)
          const fadeIn = smooth(0.04, 0.22, local)
          const fadeBack = i === chapters.length - 1 ? 1 : 1 - smooth(1.04, 1.72, local)
          const hasEntered = hasChapter && local > 0
          const y = hasEntered ? (1 - entering) * 106 : 108
          const opacity = hasEntered ? clamp(fadeIn * fadeBack) : 0
          chapter.style.setProperty('--chapter-opacity', opacity.toFixed(3))
          chapter.style.setProperty('--chapter-y-scroll', `${y.toFixed(2)}svh`)
          chapter.style.setProperty('--chapter-scale', '1')
          chapter.style.setProperty('--chapter-sheen', (0.024 + opacity * 0.035).toFixed(3))
          chapter.style.setProperty('--chapter-image-pos', `50% ${Math.round(54 - entering * 6)}%`)
          chapter.style.setProperty('--chapter-z', `${10 + i}`)
          chapter.classList.toggle('is-flowing', opacity > 0.01)
          chapter.classList.toggle('is-active', hasEntered && i === activeIndex)
          chapter.classList.toggle('is-clickable', hasEntered && opacity > 0.16)
          chapter.classList.toggle('is-prev', hasEntered && i < activeIndex)
          chapter.classList.toggle('is-next', !hasEntered && i > activeIndex)
        })
      }
      const requestUpdate = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = null; render(readAmount()) }) }

      // Snap to the nearest chapter when the user stops scrolling
      let snapTimer: number | null = null
      const snapToNearest = () => {
        if (!sequence.isConnected) return
        const amount = readAmount()
        // Only snap while inside the chapter sequence zone
        if (amount < revealStart + 0.018 || amount > revealEnd - 0.018) return
        const targets = chapters.map((_, i) => targetAmountFor(i))
        const nearest = targets.reduce((best, t) => Math.abs(t - amount) < Math.abs(best - amount) ? t : best)
        if (Math.abs(nearest - amount) > 0.012) scrollToAmount(nearest)
      }
      // Clear the snap timer when the effect is cleaned up
      sig.addEventListener('abort', () => { if (snapTimer !== null) { clearTimeout(snapTimer); snapTimer = null } })

      // Defer initial render to ensure the browser has laid out the sequence element
      rafInit = requestAnimationFrame(() => { rafInit = null; render(readAmount()) })
      if (revealButton) revealButton.addEventListener('click', () => { scrollToAmount(targetAmountFor(0)); window.setTimeout(() => render(readAmount()), 560) }, { signal: sig })
      window.addEventListener('scroll', () => {
        requestUpdate()
        // Debounce: snap 320 ms after the last scroll event
        if (snapTimer !== null) clearTimeout(snapTimer)
        snapTimer = window.setTimeout(snapToNearest, 320)
      }, { passive: true, signal: sig } as AddEventListenerOptions)
      window.addEventListener('resize', () => render(readAmount()), { signal: sig })
    }

    function initGlassHover() {
      const targets = document.querySelectorAll<HTMLElement>('.pill, .button, .play-link, .card, .menu-toggle, .field input, .field textarea, .field select, .work-player-info-close')
      targets.forEach((target) => {
        target.addEventListener('pointermove', (e) => {
          const rect = target.getBoundingClientRect()
          target.style.setProperty('--local-x', `${((e.clientX - rect.left) / rect.width * 100).toFixed(2)}%`)
          target.style.setProperty('--local-y', `${((e.clientY - rect.top) / rect.height * 100).toFixed(2)}%`)
        }, { signal: sig })
      })
    }

    function initPlayFeedback() {
      document.querySelectorAll<HTMLElement>('.play-link').forEach((btn) => {
        btn.addEventListener('pointerdown', () => { btn.classList.remove('clicked'); requestAnimationFrame(() => btn.classList.add('clicked')) }, { signal: sig })
        btn.addEventListener('animationend', () => btn.classList.remove('clicked'), { signal: sig })
      })
    }

    initLoader()
    initRouteTone()
    initMobileMenu()
    initFilters()
    initWorkCardPlayers()
    initContactForm()
    initCinematicMouse()
    initHomeSequence()
    initPlayFeedback()
    initGlassHover()

    return () => ac.abort()
  }, [pathname])

  return (
    <Script
      src="https://player.vimeo.com/api/player.js"
      strategy="afterInteractive"
    />
  )
}
