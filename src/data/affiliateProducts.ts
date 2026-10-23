export type AffiliateProduct = {
  id: string;
  name: string;
  context: string;
  url: string;
  guides: string[];
};

// Links curtos criados no Gerador de Afiliados do Mercado Livre.
export const affiliateProducts: AffiliateProduct[] = [
  {
    id: 'scale',
    name: 'Balança digital de cozinha até 10 kg',
    context: 'Ajuda a repetir pesos e porções do jeito indicado nas fichas do guia.',
    url: 'https://meli.la/2JthRy6',
    guides: ['acai-no-copo','acai-delivery','acai-garrafa','geladinho-gourmet','sacole-cremoso','sorvetes-artesanais','milk-shakes','paletas-geladas','mousses-no-pote','sobremesas-geladas','brigadeiros-gourmet','brownies','bolos-de-pote','bolos-caseiros','trufas-recheadas','cones-trufados','pudins-individuais','cookies','palha-italiana','docinhos-festas','coxinhas','risoles','empadas','esfirras','mini-pizzas','hamburguer-artesanal','cachorro-quente','sanduiches-naturais','pasteis','salgados-congelados','marmitas-tradicionais','marmitas-fitness','marmitas-congeladas','marmitas-economicas','pratos-executivos','refeicoes-vegetarianas','caldos-e-sopas','massas-caseiras','lasanhas','comida-caseira-encomenda','pao-de-queijo','paes-caseiros','cestas-cafe','kits-cafe-tarde','tortas-salgadas','bolos-aniversario','kits-festas','tabuas-frios','kits-datas','cafe-delivery'],
  },
  {
    id: 'blender',
    name: 'Liquidificador Mondial Easy Power 550 W (127 V)',
    context: 'Para bater bases e bebidas em lotes pequenos; confira a voltagem, a capacidade e os limites do fabricante.',
    url: 'https://meli.la/24z5FBk',
    guides: ['acai-garrafa','geladinho-gourmet','sacole-cremoso','sorvetes-artesanais','milk-shakes','paletas-geladas','mousses-no-pote','sobremesas-geladas','bolos-de-pote','pudins-individuais','caldos-e-sopas','tortas-salgadas'],
  },
  {
    id: 'piping-bag',
    name: 'Kit com 2 sacos de confeitar reutilizáveis de silicone',
    context: 'Útil para dosar mousses, recheios e coberturas em potes ou doces; lave e seque conforme as instruções do produto.',
    url: 'https://meli.la/1dmYQdn',
    guides: ['mousses-no-pote','bolos-de-pote','bolos-caseiros','trufas-recheadas','cones-trufados','bolos-aniversario','docinhos-festas'],
  },
  {
    id: 'dessert-pots',
    name: 'Potes para sobremesa de 250 ml com tampa (kit com 24)',
    context: 'Embalagem para porções de sobremesas; confirme o uso, o fechamento e a compatibilidade com temperatura no anúncio.',
    url: 'https://meli.la/2cGcBr2',
    guides: ['mousses-no-pote','sobremesas-geladas','bolos-de-pote','pudins-individuais'],
  },
  {
    id: 'cups-with-lid',
    name: 'Copos descartáveis de 300 ml com tampa sem furo (kit com 100)',
    context: 'Formato para açaí e sobremesas de colher. Confira se o material e a tampa servem para o alimento e o uso que você planejou.',
    url: 'https://meli.la/2T9iZic',
    guides: ['acai-delivery','acai-no-copo','mousses-no-pote','sobremesas-geladas','sorvetes-artesanais'],
  },
  {
    id: 'bottles-with-seal',
    name: 'Garrafas PET de 300 ml com tampa e lacre (kit com 20)',
    context: 'Embalagem para envase de bebidas frias. Confira no anúncio a compatibilidade com o alimento e a temperatura antes de comprar.',
    url: 'https://meli.la/2Wa68cb',
    guides: ['acai-garrafa','cafe-delivery'],
  },
  {
    id: 'thermal-bag',
    name: 'Bolsa térmica para marmita com dois compartimentos',
    context: 'Pode ajudar a organizar o transporte de pedidos pequenos. Teste a rota e use embalagens adequadas ao alimento.',
    url: 'https://meli.la/2DTh6De',
    guides: ['acai-delivery','sanduiches-naturais','marmitas-tradicionais','marmitas-fitness','marmitas-economicas','pratos-executivos','comida-caseira-encomenda','tabuas-frios','cafe-delivery'],
  },
  {
    id: 'probe-thermometer',
    name: 'Kit com 2 termômetros culinários digitais de espeto',
    context: 'Ajuda a medir a temperatura de preparações durante o teste do processo; siga o método e os limites adequados ao alimento.',
    url: 'https://meli.la/2bsgowj',
    guides: ['sorvetes-artesanais','trufas-recheadas','hamburguer-artesanal','pasteis','marmitas-tradicionais','marmitas-fitness','marmitas-congeladas','pratos-executivos','tabuas-frios'],
  },
  {
    id: 'round-cake-pan',
    name: 'Forma redonda alta de alumínio de 25 cm',
    context: 'Uma opção para bolos e tortas; compare diâmetro, altura e capacidade com a receita antes de comprar.',
    url: 'https://meli.la/2n8tnSt',
    guides: ['brownies','bolos-de-pote','bolos-caseiros','tortas-salgadas','bolos-aniversario'],
  },
];

export function productsForGuide(guideId: string) {
  return affiliateProducts.filter((product) => product.guides.includes(guideId));
}
