import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import WtfilmScripts from './components/WtfilmScripts'

export const metadata: Metadata = {
  title: 'wtfilm - Histórias que não passam',
  description: 'Produzimos filmes que conectam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <aside className="sidebar">
          <div>
            <Link href="/">
              <Image className="brand-mark" src="/logo.png" alt="wtfilm" width={132} height={40} priority />
            </Link>
            <nav className="nav" aria-label="Principal">
              <Link href="/" data-icon="01">início</Link>
              <Link href="/trabalhos" data-icon="02">trabalhos</Link>
              <Link href="/sobre" data-icon="03">sobre</Link>
              <Link href="/contato" data-icon="04">contato</Link>
            </nav>
          </div>
          <div>
            <div className="social">
              <a href="https://instagram.com/wtfilm" aria-label="Instagram" target="_blank" rel="noopener">
                <Image src="/assets/icons/social-instagram.svg" alt="" width={18} height={18} />
              </a>
              <a href="https://vimeo.com/wtfilm" aria-label="Vimeo" target="_blank" rel="noopener">
                <Image src="/assets/icons/social-vimeo.svg" alt="" width={18} height={18} />
              </a>
              <a href="https://youtube.com/@wtfilm" aria-label="YouTube" target="_blank" rel="noopener">
                <Image src="/assets/icons/social-youtube.svg" alt="" width={18} height={18} />
              </a>
              <a href="https://linkedin.com/company/wtfilm" aria-label="LinkedIn" target="_blank" rel="noopener">
                <Image src="/assets/icons/social-linkedin.svg" alt="" width={18} height={18} />
              </a>
            </div>
            <p className="copyright">© 2026 wtfilm.<br />Todos os direitos reservados.</p>
          </div>
        </aside>

        <header className="mobile-bar">
          <Link href="/">
            <Image className="brand-mark" src="/logo.png" alt="wtfilm" width={132} height={40} />
          </Link>
          <button className="menu-toggle" data-menu-toggle aria-label="Abrir menu">
            <span></span><span></span>
          </button>
        </header>

        <nav className="mobile-menu" data-mobile-menu>
          <Link href="/">Início</Link>
          <Link href="/trabalhos">Trabalhos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        {children}

        <WtfilmScripts />
      </body>
    </html>
  )
}
