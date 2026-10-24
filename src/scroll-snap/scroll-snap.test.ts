import { describe, expect, it } from 'vitest';
import scrollSnap from './scroll-snap';

describe('scrollSnap', () => {
  describe('デフォルト', () => {
    it('引数なしで基本クラスのみ付与され、スタイルは空', () => {
      const result = scrollSnap();
      expect(result.className).toBe('frg-scroll-snap');
      expect(result.style).toEqual({});
    });
  });

  describe('axis / strictness', () => {
    it('axis を指定すると strictness のデフォルト mandatory と組み合わされる', () => {
      const result = scrollSnap({ axis: 'y' });
      expect(result.style?.['--frg-scroll-snap-type']).toBe('y mandatory');
    });

    it('strictness: "proximity" は axis と組み合わされる', () => {
      const result = scrollSnap({ axis: 'x', strictness: 'proximity' });
      expect(result.style?.['--frg-scroll-snap-type']).toBe('x proximity');
    });

    it('axis: "none" は none になる', () => {
      const result = scrollSnap({ axis: 'none', strictness: 'proximity' });
      expect(result.style?.['--frg-scroll-snap-type']).toBe('none');
    });

    it('axis 未指定では strictness を指定しても scroll-snap-type は設定されない', () => {
      const result = scrollSnap({ strictness: 'proximity' });
      expect(result.style?.['--frg-scroll-snap-type']).toBeUndefined();
    });
  });

  describe('behavior', () => {
    it('behavior を指定すると scroll-behavior の値が設定される', () => {
      const result = scrollSnap({ behavior: 'smooth' });
      expect(result.className).toBe('frg-scroll-snap');
      expect(result.style?.['--frg-scroll-snap-behavior']).toBe('smooth');
    });
  });

  describe('padding', () => {
    it('padding は全辺に適用される', () => {
      const result = scrollSnap({ padding: 10 });
      expect(result.className).toContain('frg-scroll-snap-padding');
      expect(result.style?.['--frg-scroll-snap-padding']).toBe('10px');
    });

    it('x.padding / y.padding は軸ごとのクラスと変数を設定する', () => {
      const result = scrollSnap({ x: { padding: 8 }, y: { padding: '80px' } });
      expect(result.className).toContain('frg-scroll-snap-padding-x');
      expect(result.className).toContain('frg-scroll-snap-padding-y');
      expect(result.style?.['--frg-scroll-snap-padding-x']).toBe('8px');
      expect(result.style?.['--frg-scroll-snap-padding-y']).toBe('80px');
      expect(result.style?.['--frg-scroll-snap-padding']).toBeUndefined();
    });
  });

  describe('align', () => {
    it('アイテムオプション未指定ならアイテム用クラスは付与されない', () => {
      const result = scrollSnap({ axis: 'y' });
      expect(result.className).not.toContain('frg-scroll-snap-item');
    });

    it('align を指定すると align のクラスと値だけが設定される', () => {
      const result = scrollSnap({ align: 'start' });
      expect(result.className).toBe(
        'frg-scroll-snap frg-scroll-snap-item-align',
      );
      expect(result.style).toEqual({ '--frg-scroll-snap-item-align': 'start' });
    });

    it('x.align / y.align は <block> <inline> の順で設定される', () => {
      const result = scrollSnap({
        x: { align: 'center' },
        y: { align: 'start' },
      });
      expect(result.style?.['--frg-scroll-snap-item-align']).toBe(
        'start center',
      );
    });

    it('x.align は align をインライン軸で上書きする', () => {
      const result = scrollSnap({ align: 'start', x: { align: 'end' } });
      expect(result.style?.['--frg-scroll-snap-item-align']).toBe('start end');
    });

    it('y.align のみ指定するとインライン軸は none になる', () => {
      const result = scrollSnap({ y: { align: 'center' } });
      expect(result.style?.['--frg-scroll-snap-item-align']).toBe(
        'center none',
      );
    });
  });

  describe('stop', () => {
    it('stop を指定すると stop のクラスと値だけが設定される', () => {
      const result = scrollSnap({ stop: 'always' });
      expect(result.className).toBe(
        'frg-scroll-snap frg-scroll-snap-item-stop',
      );
      expect(result.style).toEqual({ '--frg-scroll-snap-item-stop': 'always' });
    });
  });

  describe('margin', () => {
    it('margin は全辺に適用され、align・stop のクラスは付与されない', () => {
      const result = scrollSnap({ margin: 4 });
      expect(result.className).toBe(
        'frg-scroll-snap frg-scroll-snap-item-margin',
      );
      expect(result.style?.['--frg-scroll-snap-item-margin']).toBe('4px');
    });

    it('x.margin / y.margin は軸ごとのクラスと変数を設定する', () => {
      const result = scrollSnap({ x: { margin: 16 }, y: { margin: '1rem' } });
      expect(result.className).toContain('frg-scroll-snap-item-margin-x');
      expect(result.className).toContain('frg-scroll-snap-item-margin-y');
      expect(result.style?.['--frg-scroll-snap-item-margin-x']).toBe('16px');
      expect(result.style?.['--frg-scroll-snap-item-margin-y']).toBe('1rem');
      expect(result.style?.['--frg-scroll-snap-item-margin']).toBeUndefined();
    });
  });
});
