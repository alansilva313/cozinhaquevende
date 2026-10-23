import { useMemo, useState } from 'react';
import { ArrowUpRight, PlayCircle, ShieldCheck } from 'lucide-react';

type Category = 'Açaí e sobremesas geladas' | 'Doces e confeitaria' | 'Salgados e lanches' | 'Marmitas e refeições' | 'Café da manhã e encomendas' | 'Gestão e delivery';
type Video = {
  id: string;
  title: string;
  channel: string;
  category: Category;
  kind: 'Experiência real' | 'Como começar' | 'Receita e produção' | 'Custos e preço' | 'Planejamento';
  summary: string;
  lesson: string;
};

const videos: Video[] = [
  { id: 'LEUgF6E92SY', title: 'Como montar uma loja de açaí | Meu primeiro empreendimento', channel: 'Mickael Silveira', category: 'Açaí e sobremesas geladas', kind: 'Experiência real', summary: 'O criador documenta a construção da própria loja de açaí, do começo ao fim.', lesson: 'Observe as etapas da obra e da preparação do espaço. Cada ponto comercial tem custos e exigências diferentes.' },
  { id: 'hUj-cHGuSzA', title: 'Como montar uma loja de açaí [Açaíteria]', channel: 'Montar um Negócio', category: 'Açaí e sobremesas geladas', kind: 'Como começar', summary: 'Visão geral de planejamento, mercado, estrutura, equipamentos, divulgação e atendimento.', lesson: 'Use como uma lista inicial de assuntos para estudar. Confirme preços, regras e exigências atuais para sua cidade.' },
  { id: 'Bdf5WoAdEi0', title: 'Como montar uma sorveteria', channel: 'Montar um Negócio', category: 'Açaí e sobremesas geladas', kind: 'Como começar', summary: 'Passa por mercado, planejamento, localização, equipamentos e sazonalidade de uma sorveteria.', lesson: 'Compare formatos de operação e anote as perguntas que ainda precisa validar com fornecedores e órgãos locais.' },
  { id: 'o-KoHOFCFC0', title: 'Como começar a vender doces? Plano de negócios para confeitaria', channel: 'Angélica Rodrigues Mkt', category: 'Doces e confeitaria', kind: 'Planejamento', summary: 'Apresenta etapas para estruturar um plano antes de começar a vender doces e bolos.', lesson: 'Adapte as etapas ao seu produto e ao tempo disponível; não trate exemplos como previsão de renda.' },
  { id: 'x7YX8-nqm0I', title: 'Como montar uma doceria', channel: 'Montar um Negócio', category: 'Doces e confeitaria', kind: 'Como começar', summary: 'Introdução a vantagens, planejamento e passos para abrir uma doceria.', lesson: 'Reavalie os valores e orientações mais antigos com preços e normas atuais da sua região.' },
  { id: 'zujJbI4WE3Q', title: 'Aula completa: como precificar seus doces', channel: 'Danielle Trolezi', category: 'Doces e confeitaria', kind: 'Custos e preço', summary: 'Explica etapas para formar o preço dos doces e incluir os custos do trabalho.', lesson: 'Monte sua própria ficha técnica com os preços reais dos ingredientes, embalagem, perdas e tempo.' },
  { id: 'zZbN2A5_hXM', title: 'Como montar uma loja de bolo caseiro', channel: 'Bolos para Vender', category: 'Doces e confeitaria', kind: 'Como começar', summary: 'Discute modelos de loja de bolos, ponto de venda, produção e investimento.', lesson: 'O vídeo é antigo: use o formato como referência e atualize completamente custos e requisitos.' },
  { id: 'cldjjZO0LjM', title: 'Como montar uma loja de bolos ou mini fábrica do zero', channel: 'Vinícius Gonçalves', category: 'Doces e confeitaria', kind: 'Planejamento', summary: 'Mostra tópicos de estrutura, capital de giro, equipamentos, cardápio e plano financeiro.', lesson: 'Os valores apresentados são exemplos do vídeo. Refaça os cálculos com cotações da sua cidade.' },
  { id: 'umRAJlxwqOo', title: 'Como fazer coxinha para vender', channel: 'Suelen Garcia Cake Designer', category: 'Salgados e lanches', kind: 'Receita e produção', summary: 'Demonstra uma produção de coxinhas e mostra um exemplo de rendimento e custo.', lesson: 'Faça o seu próprio teste de rendimento e inclua gás, embalagem, mão de obra e taxas no custo.' },
  { id: 'wQtU2_npfTs', title: 'Como montar uma fábrica de salgados congelados', channel: 'Próximo Negócio', category: 'Salgados e lanches', kind: 'Como começar', summary: 'Visão de negócio sobre produzir salgados congelados em escala e vender ao consumidor ou a revendedores.', lesson: 'Escala exige controle de qualidade, armazenamento e regularização. Valide processos antes de produzir em volume.' },
  { id: 't_aK4b9HyFU', title: 'Como montar uma lanchonete pequena', channel: 'Vinícius Gonçalves', category: 'Salgados e lanches', kind: 'Como começar', summary: 'Aborda estrutura, equipamentos, cardápio, ponto, divulgação e planejamento financeiro.', lesson: 'Os números são ilustrativos e podem estar desatualizados; faça orçamento local e estime o capital de giro.' },
  { id: '3M9kxEmeSmk', title: 'Abrindo uma lanchonete do zero: passo a passo', channel: 'Ewerton Mendes', category: 'Salgados e lanches', kind: 'Experiência real', summary: 'Um empreendedor compartilha sua jornada para abrir uma lanchonete com recursos limitados.', lesson: 'Observe decisões e dificuldades da trajetória sem assumir que o mesmo resultado acontecerá com todo mundo.' },
  { id: 'eP1qtfguIzE', title: 'Como montar uma hamburgueria delivery', channel: 'Montar um Negócio', category: 'Salgados e lanches', kind: 'Como começar', summary: 'Trata de cardápio, embalagem, fornecedores, entrega, estrutura e divulgação para hambúrguer artesanal.', lesson: 'Teste o produto embalado e entregue antes de divulgar o cardápio inteiro.' },
  { id: 'WfojGuQZaZU', title: 'Como montar uma hamburgueria', channel: 'Montar um Negócio', category: 'Salgados e lanches', kind: 'Planejamento', summary: 'Resumo de tópicos como localização, equipamentos, equipe e organização do negócio.', lesson: 'Use como ponto de partida para pesquisar concorrentes e calcular custos atuais.' },
  { id: 'kp23XC1onvo', title: 'Marmitaria pequena com pouco dinheiro: como começar', channel: 'Vinícius Gonçalves', category: 'Marmitas e refeições', kind: 'Como começar', summary: 'Aborda modelos de atendimento, cozinha, preço, equipamentos e funcionamento por delivery ou retirada.', lesson: 'Planeje a operação e valide as exigências sanitárias antes de começar a vender refeições.' },
  { id: 'NsfdPCaMLVA', title: 'Pão de queijo para vender: custo e rendimento', channel: 'Se Vira nos 30', category: 'Café da manhã e encomendas', kind: 'Receita e produção', summary: 'Aula prática com receita, rendimento e uma correção feita pela própria criadora sobre a quantidade embalada.', lesson: 'A correção no próprio vídeo é um bom lembrete para pesar e registrar seu rendimento real por lote.' },
  { id: 'bbgDhhCgmzI', title: 'Como montar uma cesta de café da manhã simples para vender', channel: 'Ateliê Rosa Passarina', category: 'Café da manhã e encomendas', kind: 'Receita e produção', summary: 'Demonstra a composição de uma cesta simples e econômica para encomendas.', lesson: 'Calcule cada item, embalagem e entrega, e defina claramente o que está incluído em cada versão.' },
  { id: 'I_4YGVYYDqs', title: 'Delivery em casa: o que vender e como começar', channel: 'Thiago de Sena', category: 'Gestão e delivery', kind: 'Como começar', summary: 'Apresenta formatos e ideias para estruturar um delivery a partir de casa.', lesson: 'Confira regras locais para produção e venda de alimentos no domicílio e escolha um cardápio que consiga entregar bem.' },
  { id: 'A74gf21kwV0', title: 'Como montar um delivery de comida: comece pela pesquisa', channel: 'Negócio de Comida — Jaime Vieira', category: 'Gestão e delivery', kind: 'Planejamento', summary: 'Defende pesquisar mercado e clientes antes de investir na operação de delivery.', lesson: 'Converse com clientes potenciais e concorrentes da sua região antes de decidir o que comprar.' },
  { id: '4a-GRggAnEU', title: 'Cinco ideias de negócio para começar a empreender', channel: 'Montar um Negócio', category: 'Gestão e delivery', kind: 'Planejamento', summary: 'Panorama de ideias de negócio e caminhos para começar a pesquisar cada uma.', lesson: 'Trate as ideias como hipóteses. Valide procura, custos, concorrência e sua capacidade de produção.' },
];

const categories: Array<'Todos' | Category> = ['Todos', 'Açaí e sobremesas geladas', 'Doces e confeitaria', 'Salgados e lanches', 'Marmitas e refeições', 'Café da manhã e encomendas', 'Gestão e delivery'];

export function VideosPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('Todos');
  const [activeId, setActiveId] = useState(videos[0].id);
  const visibleVideos = useMemo(() => videos.filter((video) => filter === 'Todos' || video.category === filter), [filter]);
  const activeVideo = videos.find((video) => video.id === activeId) ?? videos[0];

  return (
    <div className="videos-page">
      <header className="page-heading">
        <p className="eyebrow">BIBLIOTECA DE VÍDEOS</p>
        <h1>Aprenda com quem já <em>colocou a mão na massa.</em></h1>
        <p>Uma seleção de 20 vídeos sobre os negócios da biblioteca: açaí, doces, salgados, marmitas, encomendas e delivery. Escolha um tema e assista sem sair desta página.</p>
      </header>

      <section className="video-feature" aria-label="Vídeo selecionado">
        <div className="video-player-wrap">
          <iframe key={activeVideo.id} src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0`} title={`${activeVideo.title} — ${activeVideo.channel}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
        <div className="video-feature-copy">
          <span className="video-kind">{activeVideo.category}</span>
          <h2>{activeVideo.title}</h2>
          <p className="video-channel">Publicado por <strong>{activeVideo.channel}</strong></p>
          <p>{activeVideo.summary}</p>
          <div className="video-takeaway"><strong>O que observar</strong><span>{activeVideo.lesson}</span></div>
          <a className="video-original-link" href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noreferrer">Abrir no YouTube <ArrowUpRight size={16}/></a>
        </div>
      </section>

      <section className="video-library" aria-labelledby="video-library-title">
        <div className="section-title-row"><div><p className="eyebrow">ENCONTRE O SEU TEMA</p><h2 id="video-library-title">Vídeos recomendados</h2></div><span className="video-count">{visibleVideos.length} vídeos</span></div>
        <div className="video-filters" role="group" aria-label="Filtrar vídeos por nicho">
          {categories.map((item) => <button key={item} type="button" className={filter === item ? 'selected' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="video-list">
          {visibleVideos.map((video) => <article className={`video-card ${activeId === video.id ? 'is-playing' : ''}`} key={video.id}>
            <div className="video-card-copy"><span className="video-kind">{video.kind}</span><h3>{video.title}</h3><p className="video-channel">{video.channel} <span aria-hidden="true">·</span> {video.category}</p><p>{video.summary}</p></div>
            <button type="button" className="video-select" onClick={() => { setActiveId(video.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label={`Assistir ${video.title} nesta página`}><PlayCircle size={20}/>{activeId === video.id ? 'Selecionado' : 'Assistir aqui'}</button>
          </article>)}
        </div>
      </section>

      <aside className="video-note"><ShieldCheck size={21}/><p><strong>Conteúdo publicado por terceiros e recomendado pela biblioteca.</strong> Os vídeos são reproduzidos pelo player oficial do YouTube; alguns canais podem desativar a incorporação. Custos e regras apresentados podem estar desatualizados. Histórias e resultados individuais não são promessa de renda: pesquise as condições da sua cidade e faça suas próprias contas.</p></aside>
    </div>
  );
}
