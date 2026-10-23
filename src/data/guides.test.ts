import { describe, expect, it } from 'vitest';
import { businesses } from './businesses';
import { guides, guideById } from './guides';

describe('biblioteca de guias', () => {
  it('tem um guia de 12 capítulos para cada uma das 50 oportunidades', () => {
    expect(businesses).toHaveLength(50);
    expect(guides).toHaveLength(50);
    for (const business of businesses) {
      const guide = guideById(business.id);
      expect(guide, `guia ausente: ${business.id}`).toBeDefined();
      expect(guide?.status).toBe('complete');
      expect(guide?.chapters).toHaveLength(12);
      expect(business.status).toBe('complete');
    }
  });

  it('inclui orientação de preparo própria em cada ficha além do guia de referência', () => {
    for (const guide of guides.filter(item => item.id !== 'acai-no-copo')) {
      const recipe = guide.chapters.find(chapter => chapter.id === 'receitas');
      expect(recipe?.sections.length).toBeGreaterThanOrEqual(4);
      expect(recipe?.sections.some(section => section.table?.rows.length)).toBe(true);
      expect(recipe?.sections.some(section => section.bullets && section.bullets.length >= 3)).toBe(true);
    }
  });
});
