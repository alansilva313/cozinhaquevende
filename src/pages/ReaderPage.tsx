import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, Printer, SunMoon } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type Chapter, type GuideSection } from '../data/acaiGuide';
import { guideById } from '../data/guides';
import { businessById } from '../data/businesses';
import { useAppState } from '../lib/state';

function SectionContent({section}:{section:GuideSection}){
  return <section className="reader-section"><h3>{section.title}</h3>{section.paragraphs?.map((paragraph,i)=><p key={`p${i}`}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map((bullet,i)=><li key={i}>{bullet}</li>)}</ul>}{section.table&&<div className="reader-table-wrap"><table className="reader-table"><thead><tr>{section.table.headers.map(cell=><th key={cell}>{cell}</th>)}</tr></thead><tbody>{section.table.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}{section.tip&&<aside className="reader-callout tip"><strong>DICA PRÁTICA</strong><p>{section.tip}</p></aside>}{section.caution&&<aside className="reader-callout caution"><strong>ATENÇÃO</strong><p>{section.caution}</p></aside>}{section.links&&<div className="source-links"><span>Fontes e próximos passos</span>{section.links.map(link=><a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowRight size={13}/></a>)}</div>}</section>
}
export function ReaderPage(){
  const {id=''}=useParams();const business=businessById(id);const [params,setParams]=useSearchParams();const {readers,setReaders,checklists,setChecklists,fontScale,setFontScale,theme,setTheme,favorites,setFavorites}=useAppState();
  const guide=guideById(id);
  const stored=readers[id]??{completed:[],lastChapter:guide?.chapters[0]?.id??''};
  const initial=params.get('capitulo')??stored.lastChapter??guide?.chapters[0]?.id;
  const [activeId,setActiveId]=useState(initial??'');
  const [tocOpen,setTocOpen]=useState(false);
  const chapter=guide?.chapters.find(item=>item.id===activeId)??guide?.chapters[0];
  const index=chapter&&guide?guide.chapters.findIndex(item=>item.id===chapter.id):0;
  const progress=guide?Math.round(stored.completed.length/guide.chapters.length*100):0;
  useEffect(()=>{if(guide&&chapter){setReaders(current=>({...current,[id]:{...(current[id]??{completed:[],lastChapter:chapter.id}),lastChapter:chapter.id}}));setParams({capitulo:chapter.id},{replace:true});}},[guide,chapter?.id,id]);
  const go=(next:Chapter)=>{setActiveId(next.id);setTocOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
  if(!guide||!business||!chapter)return <div className="empty-state"><h2>Este guia ainda não está disponível.</h2><p>Consulte a biblioteca para ver quais materiais já foram concluídos.</p><Link to="/explorar">Voltar à biblioteca</Link></div>;
  const completed=stored.completed.includes(chapter.id);
  const toggleChapter=()=>setReaders(current=>{const old=current[id]??{completed:[],lastChapter:chapter.id};const done=old.completed.includes(chapter.id);return {...current,[id]:{...old,completed:done?old.completed.filter(c=>c!==chapter.id):[...old.completed,chapter.id],lastChapter:chapter.id}};});
  const chapterChecks=checklists[`${id}:${chapter.id}`]??[];
  const toggleChecklist=(item:string)=>setChecklists(current=>{const key=`${id}:${chapter.id}`;const old=current[key]??[];return {...current,[key]:old.includes(item)?old.filter(value=>value!==item):[...old,item]};});
  const favorite=favorites.includes(id);
  return <div className={`reader-page reader-${theme}`} style={{'--reader-scale':fontScale} as React.CSSProperties}>
    <div className="reader-topline"><Link to={`/negocio/${id}`} className="reader-back"><ArrowLeft size={14}/> {business.name}</Link><div className="reader-actions"><button aria-label="Diminuir fonte" onClick={()=>setFontScale(value=>Math.max(.88,Math.round((value-.06)*100)/100))}><Minus size={15}/></button><span>Aa</span><button aria-label="Aumentar fonte" onClick={()=>setFontScale(value=>Math.min(1.24,Math.round((value+.06)*100)/100))}><Plus size={15}/></button><button aria-label="Alternar tema" onClick={()=>setTheme(theme==='light'?'dark':'light')}><SunMoon size={15}/></button><button aria-label={favorite?'Remover guia dos favoritos':'Adicionar guia aos favoritos'} onClick={()=>setFavorites(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id])}><Bookmark size={15} fill={favorite?'currentColor':'none'}/></button><button aria-label="Imprimir capítulo" onClick={()=>window.print()}><Printer size={15}/></button></div></div>
    <div className="reader-progress-wrap"><div><span>SEU PROGRESSO</span><strong>{progress}%</strong></div><div className="reader-progress"><i style={{width:`${progress}%`}}/></div></div>
    <div className="reader-layout"><aside className={`reader-toc ${tocOpen?'toc-open':''}`}><div className="toc-heading"><span>SUMÁRIO</span><strong>{guide.chapters.length} capítulos</strong></div><button className="toc-mobile-toggle" onClick={()=>setTocOpen(!tocOpen)}>Sumário <ChevronDown size={15}/></button><nav>{guide.chapters.map((item,i)=><button key={item.id} className={`toc-item ${item.id===chapter.id?'active':''}`} onClick={()=>go(item)}><span>{String(i+1).padStart(2,'0')}</span><span>{item.title}</span>{stored.completed.includes(item.id)&&<CheckCircle2 size={14}/>}</button>)}</nav><div className="toc-storage">Seu progresso é salvo neste dispositivo e pode ser apagado ao limpar os dados do navegador.</div></aside>
      <article className="reader-content"><div className="chapter-kicker">CAPÍTULO {String(index+1).padStart(2,'0')} <span>·</span> {guide.title}</div><h1>{chapter.title}</h1><p className="chapter-subtitle">{chapter.subtitle}</p><div className="reader-rule"/>{chapter.sections.map(section=><SectionContent key={section.title} section={section}/>)}{chapter.checklist&&<section className="reader-checklist"><p className="eyebrow">CHECKLIST INTERATIVO</p><h3>Marque o que você já fez</h3>{chapter.checklist.map(item=><label key={item}><input type="checkbox" checked={chapterChecks.includes(item)} onChange={()=>toggleChecklist(item)}/><span>{item}</span></label>)}<small>As marcações ficam salvas neste dispositivo.</small></section>}<div className="chapter-completion"><button className={`complete-button ${completed?'done':''}`} onClick={toggleChapter}>{completed?<><Check size={16}/> Capítulo concluído</>:<>Marcar capítulo como lido <CheckCircle2 size={16}/></>}</button><span>{stored.completed.length} de {guide.chapters.length} capítulos concluídos</span></div><div className="chapter-pagination"><button disabled={index===0} onClick={()=>go(guide.chapters[index-1])}><ChevronLeft size={16}/><span>Anterior<small>{guide.chapters[index-1]?.title??'Início'}</small></span></button><button disabled={index===guide.chapters.length-1} onClick={()=>go(guide.chapters[index+1])}><span>Próximo<small>{guide.chapters[index+1]?.title??'Fim do guia'}</small></span><ChevronRight size={16}/></button></div></article></div>
  </div>;
}
