import { ArrowLeft, ArrowRight, Bookmark, Check, Clock3, CircleAlert, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { businesses } from '../data/businesses';
import { BusinessCover } from '../components/BusinessCard';
import { guideById } from '../data/guides';
import { useAppState } from '../lib/state';
import { AffiliateRecommendations } from '../components/AffiliateRecommendations';

export function BusinessPage(){
  const {id=''}=useParams(); const business=businesses.find(item=>item.id===id); const navigate=useNavigate(); const {favorites,setFavorites}=useAppState();
  if(!business)return <div className="empty-state"><h2>Não encontramos esse negócio.</h2><Link to="/explorar">Voltar para a biblioteca</Link></div>;
  const guide=guideById(id); const favorite=favorites.includes(id);
  return <div className="business-detail-page"><button className="back-button" onClick={()=>navigate(-1)}><ArrowLeft size={15}/> Voltar à biblioteca</button><div className="business-detail-grid"><div className="business-detail-hero"><BusinessCover business={business} large/><div className="detail-read-badge"><Clock3 size={14}/>{business.readingMinutes} min de leitura</div></div><div className="business-detail-copy"><p className="eyebrow">{business.category.toLocaleUpperCase('pt-BR')}</p><h1>{business.name}<br/><em>do primeiro teste aos primeiros clientes</em></h1><p className="detail-summary">{guide?.summary??business.description}</p><div className="detail-pills"><span>{business.difficulty}</span><span>{guide?`${guide.chapters.length} capítulos`:'Conteúdo em produção'}</span></div>{guide?<><Link to={`/leitura/${business.id}`} className="button-primary">Abrir o guia digital <ArrowRight size={16}/></Link><button className={`save-detail ${favorite?'saved':''}`} onClick={()=>setFavorites(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id])}>{favorite?<Check size={16}/>:<Bookmark size={16}/>} {favorite?'Salvo nos favoritos':'Salvar para depois'}</button></>:<div className="development-note"><CircleAlert size={18}/><div><strong>Guia em desenvolvimento</strong><p>Esta oportunidade já está catalogada; o conteúdo próprio dos capítulos ainda está sendo escrito. Não exibimos este material como guia concluído.</p></div></div>}<div className="detail-what"><span><Check size={14}/> Ideia e formato de venda</span><span><Check size={14}/> Planejamento de custos</span><span><Check size={14}/> Próximos passos práticos</span></div></div></div>
    {guide?<div className="chapter-preview"><div><p className="eyebrow">DENTRO DESTE GUIA</p><h2>Uma trilha de aprendizagem<br/><em>para começar com clareza.</em></h2></div><div className="preview-chapters">{guide.chapters.slice(0,6).map((chapter,i)=><Link key={chapter.id} to={`/leitura/${id}?capitulo=${chapter.id}`}><span>{String(i+1).padStart(2,'0')}</span>{chapter.title}<ArrowRight size={15}/></Link>)}</div></div>:<div className="detail-next"><Sparkles size={17}/><span>Enquanto este guia está em produção, explore os negócios já catalogados e use as ferramentas de planejamento.</span><Link to="/ferramentas">Abrir ferramentas <ArrowRight size={14}/></Link></div>}
    {guide&&<AffiliateRecommendations guideId={business.id}/>}
  </div>;
}
