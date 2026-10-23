import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Bookmark, ChartNoAxesColumn, CircleHelp, Compass, CookingPot, Heart, House, ListChecks, LogOut, PlayCircle, Settings2, Wrench, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../lib/state';
import { hasLocalAccessSession, loadLocalAccessProfile, setLocalAccessSession, type LocalAccessProfile } from '../lib/access';
import { AccessGate } from './AccessGate';

const primary = [
  {to:'/',label:'Início',icon:House,end:true},
  {to:'/explorar',label:'Explorar negócios',icon:Compass},
  {to:'/videos',label:'Vídeos recomendados',icon:PlayCircle},
  {to:'/ferramentas',label:'Minhas ferramentas',icon:Wrench},
  {to:'/plano',label:'Plano de ação',icon:ListChecks},
];
const library = [
  {to:'/favoritos',label:'Favoritos',icon:Heart},
  {to:'/progresso',label:'Meu progresso',icon:ChartNoAxesColumn},
  {to:'/comecar',label:'Guia para começar',icon:CircleHelp},
];
type NavItemData={to:string;label:string;icon:LucideIcon;end?:boolean};
function NavItem({item}:{item:NavItemData}) { const Icon=item.icon; return <NavLink to={item.to} end={item.end} className={({isActive})=>`side-link ${isActive?'active':''}`}><Icon size={17}/><span>{item.label}</span></NavLink>; }
export function AppShell(){
  const {theme,setTheme}=useAppState();
  const location=useLocation();
  const [profile,setProfile]=useState<LocalAccessProfile|null>(()=>loadLocalAccessProfile());
  const [unlocked,setUnlocked]=useState(()=>hasLocalAccessSession());
  const publicOffer=location.pathname==='/oferta';
  if(!unlocked&&!publicOffer) return <div className={`app-frame ${theme==='dark'?'theme-dark':''}`}><AccessGate profile={profile} onUnlocked={(nextProfile)=>{setProfile(nextProfile);setLocalAccessSession(true);setUnlocked(true);}}/></div>;
  function signOut(){setLocalAccessSession(false);setUnlocked(false);}
  return <div className={`app-frame ${theme==='dark'?'theme-dark':''}`}>
    <aside className="sidebar">
      <NavLink to="/" className="brand"><span className="brand-symbol"><CookingPot size={19}/></span><span>Cozinha <em>que Rende</em></span></NavLink>
      <div className="sidebar-label">SUA BIBLIOTECA</div>
      <nav className="side-nav">{primary.map(item=><NavItem key={item.to} item={item}/>)}</nav>
      <div className="sidebar-label second-label">ACOMPANHAMENTO</div>
      <nav className="side-nav">{library.map(item=><NavItem key={item.to} item={item}/>)}</nav>
      <div className="sidebar-spacer"/>
      <NavLink to="/oferta" className="offer-side-link"><Bookmark size={16}/><span>Conheça o guia</span></NavLink>
      <div className="storage-note">Seu progresso fica salvo neste dispositivo.</div>
    </aside>
    <div className="app-main">
      <header className="topbar"><div className="mobile-brand"><CookingPot size={18}/> Cozinha <em>que Rende</em></div><div className="topbar-kicker">BIBLIOTECA DIGITAL <span>·</span> APRENDA NO SEU RITMO</div><div className="topbar-actions"><button className="theme-toggle" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={theme==='light'?'Ativar modo escuro':'Ativar modo claro'}><Settings2 size={16}/><span>{theme==='light'?'Aparência':'Modo claro'}</span></button>{unlocked?<button className="logout-button" onClick={signOut} aria-label={`Sair do acesso de ${profile?.username??'aluno'}`}><LogOut size={16}/><span>Sair</span></button>:<NavLink className="access-entry-link" to="/">Ativar acesso</NavLink>}</div></header>
      <motion.main className="page-content" key={location.pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.22}}><Outlet/></motion.main>
    </div>
    <nav className="mobile-nav" aria-label="Navegação principal para celular">
      {[{to:'/',label:'Início',icon:House},{to:'/explorar',label:'Explorar',icon:Compass},{to:'/videos',label:'Vídeos',icon:PlayCircle},{to:'/ferramentas',label:'Ferramentas',icon:Wrench},{to:'/progresso',label:'Progresso',icon:ChartNoAxesColumn}].map(item=>{const Icon=item.icon;return <NavLink key={item.to} to={item.to} end={item.to==='/'} className={({isActive})=>`mobile-nav-item ${isActive?'active':''}`}><Icon size={19}/><span>{item.label}</span></NavLink>})}
    </nav>
  </div>
}
