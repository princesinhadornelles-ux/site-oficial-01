import React from 'react';
import { SITE_CONFIG } from '@/src/constants';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-3xl font-extrabold text-brand-primary mb-8">Política de Privacidade</h1>
      <p className="mb-4">Sua privacidade é extremamente importante para nós. No <strong>{SITE_CONFIG.name}</strong>, temos alguns princípios fundamentais:</p>
      
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>Não solicitamos informações pessoais, a menos que realmente precisemos delas.</li>
        <li>Não compartilhamos suas informações pessoais com ninguém, exceto para cumprir a lei ou proteger nossos direitos.</li>
        <li>Não armazenamos informações pessoais em nossa infraestrutura, a menos que seja necessário para a operação contínua de um de nossos serviços.</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">1. Visitantes do Site</h2>
      <p>Como a maioria dos operadores de sites, o {SITE_CONFIG.name} coleta informações que não identificam pessoalmente, do tipo que os navegadores e sistemas web normalmente disponibilizam, como o tipo de navegador, preferência de idioma, site de referência e a data e hora de cada solicitação do visitante. Nosso objetivo ao coletar informações de identificação não pessoal é entender melhor como nossos visitantes usam o site.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">2. Segurança</h2>
      <p>A segurança de suas informações pessoais é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Links para Sites Externos</h2>
      <p>Nosso serviço pode conter links para sites externos que não são operados por nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Aconselhamos vivamente que reveja a Política de Privacidade e os termos de serviço de cada site que visita.</p>
      <p>Não temos controle e não assumimos qualquer responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites, produtos ou serviços de terceiros.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">4. Cookies</h2>
      <p>Para enriquecer e aperfeiçoar sua experiência online, o {SITE_CONFIG.name} usa "Cookies", tecnologias semelhantes e serviços fornecidos por terceiros para exibir conteúdo personalizado, publicidade apropriada e armazenar suas preferências no seu computador.</p>
      <p>Um cookie é uma cadeia de informações que um site armazena no computador de um visitante e que o navegador do visitante fornece ao site cada vez que o visitante retorna.</p>
      
      <h2 className="text-xl font-bold mt-8 mb-4">5. Alterações na Política de Privacidade</h2>
      <p>Embora a maioria das alterações seja provavelmente pequena, o {SITE_CONFIG.name} pode alterar sua Política de Privacidade de tempos em tempos e a seu exclusivo critério. Encorajamos os visitantes a verificar frequentemente esta página para quaisquer alterações em sua Política de Privacidade.</p>

      <div className="mt-12 pt-8 border-t border-slate-100 text-xs text-slate-500">
        Esta política é efetiva a partir de <strong>{new Date().toLocaleDateString('pt-BR')}</strong>.
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-3xl font-extrabold text-brand-primary mb-8">Termos e Condições de Uso</h1>
      
      <h2 className="text-xl font-bold mt-8 mb-4">1. Termos</h2>
      <p>Ao acessar o site {SITE_CONFIG.name}, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">2. Isenção de Responsabilidade</h2>
      <ol className="list-decimal pl-6 space-y-4">
        <li>Os materiais no site do {SITE_CONFIG.name} são fornecidos 'como estão'. {SITE_CONFIG.name} não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
        <li>Além disso, o {SITE_CONFIG.name} não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Limitações</h2>
      <p>Em nenhum caso o {SITE_CONFIG.name} ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em {SITE_CONFIG.name}, mesmo que o {SITE_CONFIG.name} ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">4. Precisão dos Materiais</h2>
      <p>Os materiais exibidos no site do {SITE_CONFIG.name} podem incluir erros técnicos, tipográficos ou fotográficos. {SITE_CONFIG.name} não garante que qualquer material em seu site seja preciso, completo ou atual. {SITE_CONFIG.name} pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, não se compromete a atualizar os materiais.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">5. Links</h2>
      <p>O {SITE_CONFIG.name} não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso pelo {SITE_CONFIG.name} do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">6. Modificações</h2>
      <p>O {SITE_CONFIG.name} pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">7. Lei Aplicável</h2>
      <p>Estes termos e condições são regidos e interpretados de acordo com as leis brasileiras e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-4 tracking-tight">Sobre o Filmes My View</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Um guia informativo independente para quem quer encontrar filmes e séries em plataformas legais.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 text-sm text-blue-800 leading-relaxed">
        <strong>Aviso de transparência:</strong> O Filmes My View é um guia informativo independente. <strong>Não vendemos IPTV, listas de canais, login, senha, streaming próprio, downloads, desbloqueios ou acesso a filmes, séries e canais.</strong> Nosso objetivo é exclusivamente orientar usuários sobre onde encontrar conteúdos em plataformas oficiais e legais.
      </div>

      <div className="space-y-12 text-left mb-16">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">O que é o Filmes My View?</h2>
          <p className="text-slate-600 leading-relaxed">
            O <strong>Filmes My View</strong> é um portal informativo e independente criado para ajudar usuários a descobrirem onde encontrar filmes e séries de forma legal e segura. Atuamos como um guia de referência, orientando sobre plataformas de streaming oficiais disponíveis no Brasil e no mundo.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">O que NÃO fazemos</h2>
          <ul className="space-y-2 text-slate-600 list-none">
            {[
              "Não vendemos IPTV ou qualquer serviço de transmissão",
              "Não fornecemos listas de canais, login ou senha",
              "Não hospedamos, transmitimos ou distribuímos filmes, séries ou canais",
              "Não oferecemos streaming próprio ou acesso desbloqueado a conteúdo",
              "Não somos afiliados oficiais de Netflix, Prime Video, Disney+, Max, Globoplay ou outras plataformas, salvo indicação expressa",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">O que fazemos</h2>
          <ul className="space-y-2 text-slate-600 list-none">
            {[
              "Orientamos usuários sobre plataformas oficiais onde determinados conteúdos podem estar disponíveis legalmente",
              "Indicamos as melhores plataformas de acordo com o perfil e interesse do usuário",
              "Oferecemos suporte informativo para configuração de dispositivos nas plataformas oficiais",
              "Publicamos guias, listas e recomendações sobre o universo do cinema e séries",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">Como funciona nosso atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Contato", desc: "Você entra em contato conosco via formulário ou WhatsApp com sua dúvida ou necessidade." },
              { n: "2", title: "Orientação", desc: "Nossa equipe analisa seu perfil e indica as plataformas oficiais mais adequadas para você." },
              { n: "3", title: "Acompanhamento", desc: "Auxiliamos na configuração de dispositivos para aproveitar ao máximo cada plataforma oficial." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">{n}</div>
                <h4 className="font-bold mb-2">{title}</h4>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-3xl font-extrabold text-brand-primary mb-8">Aviso Legal</h1>

      <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 mb-8 text-sm text-yellow-900 leading-relaxed not-prose">
        <strong>Leia com atenção antes de utilizar este site.</strong>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">1. Natureza do Serviço</h2>
      <p>O <strong>Filmes My View</strong> é um guia informativo independente. Não somos representantes oficiais de Netflix, Prime Video, Disney+, Max, Globoplay ou qualquer outra plataforma de streaming, salvo indicação expressa.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">2. O que não oferecemos</h2>
      <p>O Filmes My View <strong>não vende</strong> e <strong>não oferece</strong>:</p>
      <ul>
        <li>IPTV ou qualquer serviço de transmissão de canais</li>
        <li>Listas de canais ou conteúdo audiovisual</li>
        <li>Login, senha ou credenciais de acesso a plataformas</li>
        <li>Streaming próprio ou hospedagem de conteúdo</li>
        <li>Downloads de filmes, séries ou programas</li>
        <li>Desbloqueio ou acesso a conteúdo protegido</li>
        <li>Qualquer serviço que viole direitos autorais ou a legislação vigente</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Propriedade Intelectual</h2>
      <p>Todas as marcas, logotipos e nomes de plataformas mencionados neste site (como Netflix, Prime Video, Disney+, Max, Globoplay, entre outros) pertencem aos seus respectivos proprietários. O Filmes My View não possui qualquer vínculo oficial com essas marcas.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">4. Limitação de Responsabilidade</h2>
      <p>As informações disponibilizadas neste site têm caráter exclusivamente informativo. O Filmes My View não se responsabiliza por decisões tomadas com base nas orientações aqui apresentadas, nem pela disponibilidade de conteúdos nas plataformas indicadas, que pode variar a qualquer momento.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">5. Conformidade Legal</h2>
      <p>Este site opera em conformidade com a legislação brasileira vigente, incluindo o Marco Civil da Internet (Lei nº 12.965/2014), a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e as demais normas aplicáveis.</p>

      <div className="mt-12 pt-8 border-t border-slate-100 text-xs text-slate-500">
        Última atualização: <strong>{new Date().toLocaleDateString('pt-BR')}</strong>
      </div>
    </div>
  );
}

export function DireitosAutoraisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-3xl font-extrabold text-brand-primary mb-8">Direitos Autorais</h1>

      <h2 className="text-xl font-bold mt-8 mb-4">1. Sobre o Conteúdo deste Site</h2>
      <p>O <strong>Filmes My View</strong> não hospeda, transmite, armazena, vende ou distribui filmes, séries, canais ou qualquer conteúdo protegido por direitos autorais.</p>
      <p>Nosso objetivo é exclusivamente orientar usuários sobre plataformas oficiais onde determinados conteúdos podem estar disponíveis legalmente.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">2. Marcas e Logotipos de Terceiros</h2>
      <p>Eventuais menções a marcas como Netflix, Prime Video, Disney+, Max, Globoplay, Apple TV+, Paramount+, entre outras, são feitas apenas para fins informativos e de referência. O Filmes My View não possui vínculo oficial com essas plataformas e não representa nenhuma delas.</p>
      <p>Todos os nomes, logotipos e marcas registradas citados pertencem exclusivamente aos seus respectivos proprietários.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Conteúdo Próprio</h2>
      <p>Os textos, guias, listas e recomendações produzidos pela equipe do Filmes My View são de autoria própria e protegidos por direitos autorais. É vedada a reprodução total ou parcial sem autorização prévia por escrito.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">4. Notificação de Infração</h2>
      <p>Se você acredita que algum conteúdo deste site viola direitos autorais, entre em contato pelo e-mail <strong>{SITE_CONFIG.email}</strong> com as informações necessárias para análise e providências cabíveis.</p>

      <div className="mt-12 pt-8 border-t border-slate-100 text-xs text-slate-500">
        Última atualização: <strong>{new Date().toLocaleDateString('pt-BR')}</strong>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-4 tracking-tight">Estamos aqui para você</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Escolha o canal de sua preferência e fale com nossa equipe hoje mesmo.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-brand-accent rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-bold text-brand-primary">E-mail</h3>
            </div>
            <p className="text-slate-500 text-sm mb-2">Ideal para questões administrativas:</p>
            <p className="text-brand-accent font-bold">{SITE_CONFIG.email}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 text-brand-success rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-bold text-brand-primary">WhatsApp</h3>
            </div>
            <p className="text-slate-500 text-sm mb-2">Dúvidas e orientações:</p>
            <p className="text-brand-success font-bold">Disponível no botão flutuante</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-50 text-brand-warning rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="font-bold text-brand-primary">Localização</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{SITE_CONFIG.address}</p>
          </div>
        </div>

        {/* Form Placeholder */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-soft border border-slate-100">
          <h2 className="text-2xl font-bold text-brand-primary mb-8">Envie uma mensagem</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
                <input type="text" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-accent transition-smooth" placeholder="Ex: João Silva" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</label>
                <input type="email" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-accent transition-smooth" placeholder="seu@email.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assunto</label>
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-accent transition-smooth">
                <option>Suporte Técnico</option>
                <option>Assuntos Financeiros</option>
                <option>Parcerias</option>
                <option>Outros</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensagem</label>
              <textarea rows={5} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-accent transition-smooth" placeholder="Como podemos ajudar?"></textarea>
            </div>
            <button type="button" className="btn-sleek-primary w-full">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </div>
  );
}
