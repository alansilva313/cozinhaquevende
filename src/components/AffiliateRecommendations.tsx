import { ArrowUpRight, ShoppingBasket } from 'lucide-react';
import { productsForGuide } from '../data/affiliateProducts';

export function AffiliateRecommendations({ guideId }: { guideId: string }) {
  const products = productsForGuide(guideId);
  if (!products.length) return null;

  return <section className="affiliate-recommendations" aria-labelledby="affiliate-heading">
    <div className="affiliate-heading">
      <span className="affiliate-icon"><ShoppingBasket size={18}/></span>
      <div><p className="eyebrow">MATERIAIS PARA ESTE NEGÓCIO</p><h2 id="affiliate-heading">Itens que podem ajudar na prática</h2></div>
    </div>
    <p className="affiliate-intro">Confira os detalhes e escolha apenas o que fizer sentido para o seu teste. Os links levam aos anúncios do Mercado Livre; preço e disponibilidade podem mudar.</p>
    <div className="affiliate-product-grid">{products.map((product) => <article className="affiliate-product" key={product.id}>
      <span className="affiliate-product-label">RECOMENDAÇÃO</span>
      <h3>{product.name}</h3>
      <p>{product.context}</p>
      <a href={product.url} target="_blank" rel="sponsored nofollow noopener noreferrer">Ver produto no Mercado Livre <ArrowUpRight size={15}/></a>
    </article>)}</div>
    <small className="affiliate-disclosure">Alguns links são de afiliado. Se você comprar por eles, posso receber uma comissão, sem custo adicional para você.</small>
  </section>;
}
