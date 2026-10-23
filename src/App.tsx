import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './lib/state';
import { AppShell } from './components/AppShell';

const HomePage=lazy(()=>import('./pages/HomePage').then(module=>({default:module.HomePage})));
const ExplorePage=lazy(()=>import('./pages/ExplorePage').then(module=>({default:module.ExplorePage})));
const CategoryPage=lazy(()=>import('./pages/ExplorePage').then(module=>({default:module.CategoryPage})));
const BusinessPage=lazy(()=>import('./pages/BusinessPage').then(module=>({default:module.BusinessPage})));
const ReaderPage=lazy(()=>import('./pages/ReaderPage').then(module=>({default:module.ReaderPage})));
const ToolsPage=lazy(()=>import('./pages/ToolsPage').then(module=>({default:module.ToolsPage})));
const PlanPage=lazy(()=>import('./pages/PlanPage').then(module=>({default:module.PlanPage})));
const FavoritesPage=lazy(()=>import('./pages/PersonalPages').then(module=>({default:module.FavoritesPage})));
const ProgressPage=lazy(()=>import('./pages/PersonalPages').then(module=>({default:module.ProgressPage})));
const StartPage=lazy(()=>import('./pages/PersonalPages').then(module=>({default:module.StartPage})));
const OfferPage=lazy(()=>import('./pages/OfferPage').then(module=>({default:module.OfferPage})));
const VideosPage=lazy(()=>import('./pages/VideosPage').then(module=>({default:module.VideosPage})));

export default function App(){return <BrowserRouter><AppProvider><Suspense fallback={<div className="route-loading" role="status">Abrindo seu conteúdo…</div>}><Routes><Route element={<AppShell/>}>
  <Route path="/" element={<HomePage/>}/><Route path="/explorar" element={<ExplorePage/>}/><Route path="/categoria/:slug" element={<CategoryPage/>}/><Route path="/negocio/:id" element={<BusinessPage/>}/><Route path="/leitura/:id" element={<ReaderPage/>}/><Route path="/ferramentas" element={<ToolsPage/>}/><Route path="/plano" element={<PlanPage/>}/><Route path="/favoritos" element={<FavoritesPage/>}/><Route path="/progresso" element={<ProgressPage/>}/><Route path="/comecar" element={<StartPage/>}/><Route path="/oferta" element={<OfferPage/>}/><Route path="/videos" element={<VideosPage/>}/>
  <Route path="*" element={<HomePage/>}/>
</Route></Routes></Suspense></AppProvider></BrowserRouter>}
