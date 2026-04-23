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
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-4 tracking-tight">Transparência e Inovação</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Conheça a história e os valores que movem o {SITE_CONFIG.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 text-left">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">Nossa Missão</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            O <strong>{SITE_CONFIG.name}</strong> nasceu da necessidade de oferecer um serviço de entretenimento digital que fosse, acima de tudo, estável e honesto. Em um mercado saturado de promessas vazias, decidimos fazer diferente: oferecer qualidade real e deixar que o cliente julgue através de testes gratuitos.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Nosso objetivo é ser a referência nacional em entretenimento via streaming, proporcionando uma experiência de cinema no conforto da sua casa, sem travamentos e com o melhor custo-benefício.
          </p>
        </div>
        <div className="bg-slate-100 aspect-video rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
           <img src="https://picsum.photos/seed/office/800/600" alt="Nosso escritório" className="object-cover w-full h-full opacity-80" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-soft border border-slate-100 text-left mb-20 text-center">
        <h2 className="text-3xl font-extrabold text-brand-primary mb-8">Quem Atendemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-primary uppercase tracking-tighter">Clientes Residenciais</h3>
            <p className="text-sm text-slate-500">Famílias que buscam recomendações confiáveis e estabilidade para sua sala de cinema em casa.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-primary uppercase tracking-tighter">Empresas</h3>
            <p className="text-sm text-slate-500">Consultoria para consumo consciente e otimizado de conteúdo digital em ambientes corporativos.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-primary uppercase tracking-tighter">Suporte Técnico</h3>
            <p className="text-sm text-slate-500">Ajudamos você na configuração de dispositivos para extrair a melhor imagem de cada plataforma.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-brand-primary mb-12">Como Funciona nosso Atendimento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
            <h4 className="font-bold mb-2">Contato</h4>
            <p className="text-xs text-slate-400">Você entra em contato conosco via formulário ou WhatsApp.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
            <h4 className="font-bold mb-2">Análise</h4>
            <p className="text-xs text-slate-400">Analisamos sua necessidade de entretenimento e buscamos as melhores opções.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
            <h4 className="font-bold mb-2">Retorno</h4>
            <p className="text-xs text-slate-400">Enviamos as indicações personalizadas e orientamos sobre as plataformas oficiais.</p>
          </div>
        </div>
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
            <p className="text-slate-500 text-sm mb-2">Suporte imediato e ativações:</p>
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
