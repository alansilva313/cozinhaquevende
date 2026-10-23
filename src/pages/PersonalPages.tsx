import { ArrowRight, Bookmark, BookOpen, Check, Clock3, Heart, ListChecks, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businesses } from '../data/businesses';
import { BusinessCard, BusinessCover } from '../components/BusinessCard';
import { acaiGuide } from '../data/acaiGuide';
import { guideById } from '../data/guides';
import { useAppState } from '../lib/state';

export function FavoritesPage(){
  const {favorites}=useAppState();
  const saved=businesses.filter(b=>favorites.includes(b.id));
  return <div className="content-page"><div className="page-heading compact-heading"><p className="eyebrow">SUA COLEÇÃO</p><h1>Favoritos</h1><p>Ideias e guias que você salvou para consultar depois.</p></div>{saved.length?<div className="catalog-grid">{saved.map(b=><BusinessCard key={b.id} business={b}/>)}</div>:<div className="empty-state"><Heart size={24}/><h3>Seu espaço está esperando por ideias</h3><p>Use o marcador em um negócio para guardá-lo aqui.</p><Link to="/explorar">Explorar negócios <ArrowRight size={14}/></Link></div>}</div>;
}

export function ProgressPage(){
  const {readers,favorites,planChecks,checklists}=useAppState();
  const started=Object.entries(readers).filter(([id,progress])=>Boolean(progress.lastChapter&&guideById(id)));
  const [guideId,progress]=started[started.length-1]??['acai-no-copo',undefined];
  const activeGuide=guideById(guideId)??acaiGuide;
  const business=businesses.find(item=>item.id===guideId)??businesses[0];
  const allChecks=Object.values(checklists).reduce((sum,value)=>sum+value.length,0);
  const guidesStarted=started.length;
  const complete=started.filter(([id,reader])=>reader.completed.length>=(guideById(id)?.chapters.length??12)).length;
  const percentage=progress?Math.round(progress.completed.length/activeGuide.chapters.length*100):0;
  return <div className="content-page"><div className="page-heading"><p className="eyebrow">ACOMPANHAMENTO LOCAL</p><h1>Seu progresso,<br/><em>no seu ritmo.</em></h1><p>Essas informações ficam salvas somente neste navegador e neste dispositivo.</p></div>
    <div className="progress-metrics"><article><BookOpen size={18}/><strong>{guidesStarted}</strong><span>guias iniciados</span></article><article><Check size={18}/><strong>{complete}</strong><span>guias concluídos</span></article><article><ListChecks size={18}/><strong>{allChecks+planChecks.length}</strong><span>itens marcados</span></article><article><Bookmark size={18}/><strong>{favorites.length}</strong><span>favoritos</span></article></div>
    <section className="progress-detail"><div className="section-title-row"><div><p className="eyebrow">RETOMAR</p><h2>Um guia da sua biblioteca</h2></div></div>{progress?<div className="progress-guide-row"><div className="progress-guide-thumb"><BusinessCover business={business}/></div><div><h3>{activeGuide.title}</h3><p>Última leitura: {activeGuide.chapters.find(c=>c.id===progress.lastChapter)?.title??'início'}</p><div className="progress-line"><i style={{width:`${percentage}%`}}/></div><small>{progress.completed.length} de {activeGuide.chapters.length} capítulos marcados como lidos</small></div><Link to={`/leitura/${guideId}`}>Continuar <ArrowRight size={14}/></Link></div>:<div className="empty-inline">Você ainda não começou um guia. <Link to="/negocio/acai-no-copo">Comece pelo guia de referência ↗</Link></div>}</section>
    <p className="local-note"><Sparkles size={15}/> Não há sincronização entre dispositivos. Apagar os dados do navegador pode remover seu progresso, favoritos e marcações.</p>
  </div>;
}

export function StartPage(){
  const steps=[{n:'01',title:'Escolha quem você quer atender',body:'Pense em pessoas e ocasiões reais: lanche no trabalho, sobremesa em família, almoço durante a semana. Converse antes de definir o produto.'},{n:'02',title:'Comece com um cardápio pequeno',body:'Escolha uma ou duas opções que compartilhem ingredientes e utensílios. Um teste pequeno ajuda a perceber rendimento, tempo e aceitação.'},{n:'03',title:'Anote custos e capacidade',body:'Registre quanto usou, o que perdeu, quanto tempo levou e quantas unidades consegue preparar sem comprometer a conservação.'},{n:'04',title:'Calcule preço e cenário',body:'Use a calculadora de preço e o simulador de vendas. Compare faturamento, custos variáveis, despesas fixas e resultado operacional.'},{n:'05',title:'Verifique as regras aplicáveis',body:'Consulte a Vigilância Sanitária e a prefeitura da sua cidade. Veja se a ocupação pode ser MEI e confira obrigações antes de formalizar.'},{n:'06',title:'Faça uma rodada limitada',body:'Apresente o produto com foto real, ingredientes importantes, preço, prazo e entrega. Registre pedidos e use o retorno para revisar o plano.'}];
  return <div className="content-page start-page"><div className="page-heading"><p className="eyebrow">COMECE AQUI</p><h1>Do primeiro plano<br/><em>ao primeiro pedido.</em></h1><p>Você não precisa começar comprando tudo. Use estas etapas para testar uma ideia, entender os números e escolher o próximo passo com cuidado.</p></div><div className="start-steps">{steps.map(step=><article key={step.n}><span>{step.n}</span><div><h2>{step.title}</h2><p>{step.body}</p></div></article>)}</div><div className="start-resources"><Link to="/explorar"><BookOpen size={18}/><span><strong>Escolha entre 50 guias</strong><small>Açaí, doces, salgados, refeições e encomendas</small></span><ArrowRight size={15}/></Link><Link to="/ferramentas"><ListChecks size={18}/><span><strong>Ferramentas</strong><small>Preço, vendas, compras e divulgação</small></span><ArrowRight size={15}/></Link><Link to="/plano"><Clock3 size={18}/><span><strong>Plano de 7 dias</strong><small>Atividades com progresso salvo neste dispositivo</small></span><ArrowRight size={15}/></Link></div></div>;
}
