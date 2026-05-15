export const metadata = { title: 'Contato · wtfilm' }

export default function ContatoPage() {
  return (
    <main className="site">
      <section className="page split">
        <div>
          <span className="kicker">Contato</span>
          <h1 className="page-title">Vamos criar algo impossível de ignorar?</h1>
          <p className="lead">Campanha, filme, experimento, clipe ou uma imagem que ainda não existe.</p>
          <div className="filters" style={{ marginTop: 32 }}>
            <a className="pill whatsapp-pill" href="https://wa.me/5511999999999" target="_blank" rel="noopener">
              WhatsApp
            </a>
            <a className="pill" href="mailto:contato@wtfilm.com.br">E-mail</a>
          </div>
        </div>

        <form className="glass panel form" data-contact-form>
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input id="nome" name="nome" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="empresa">Empresa</label>
            <input id="empresa" name="empresa" autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="tipo">Tipo de projeto</label>
            <select id="tipo" name="tipo">
              <option>Campanha</option>
              <option>IA / Experimentos</option>
              <option>Conteúdo</option>
              <option>Videoclipe</option>
              <option>Cinema</option>
              <option>Animação</option>
              <option>Outros</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" required />
          </div>
          <button className="button reel-type" type="submit">
            Enviar mensagem →
          </button>
          <p className="card-meta" data-form-status aria-live="polite" />
        </form>
      </section>
    </main>
  )
}
