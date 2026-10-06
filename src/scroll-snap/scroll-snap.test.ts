import { describe, expect, it } from 'vitest';
import scrollSnap from './scroll-snap';

describe('scrollSnap', () => {
  describe('デフォルト', () => {
    it('引数なしで基本クラスのみ付与され、スタイルは空', () => {
      const result = scrollSnap();
      expect(result.className).toBe('lx-scroll-snap');
      expect(result.style).toEqual({});
    });
  });

  describe('axis / strictness', () => {
    it('axis を指定すると strictness のデフォルト mandatory と組み合わされる', () => {
      const result = scrollSnap({ axis: 'y' });
      expect(result.style?.['--lx-scroll-snap-type']).toBe('y mandatory');
    });

    it('axis: "none" は none になる', () => {
      const result = scrollSnap({ axis: 'none', strictness: 'proximity' });
      expect(result.style?.['--lx-scroll-snap-type']).toBe('none');
    });
  });

  describe('padding', () => {
    it('padding は全辺に適用される', () => {
      const result = scrollSnap({ padding: 10 });
      expect(result.className).toContain('lx-scroll-snap-padding');
      expect(result.style?.['--lx-scroll-snap-padding']).toBe('10px');
    });

    it('x.padding / y.padding は軸ごとのクラスと変数を設定する', () => {
      const result = scrollSnap({ x: { padding: 8 }, y: { padding: '80px' } });
      expect(result.className).toContain('lx-scroll-snap-padding-x');
      expect(result.className).toContain('lx-scroll-snap-padding-y');
      expect(result.style?.['--lx-scroll-snap-padding-x']).toBe('8px');
      expect(result.style?.['--lx-scroll-snap-padding-y']).toBe('80px');
      expect(result.style?.['--lx-scroll-snap-padding']).toBeUndefined();
    });
  });

  describe('align', () => {
    it('アイテムオプション未指定ならアイテム用クラスは付与されない', () => {
      const result = scrollSnap({ axis: 'y' });
      expect(result.className).not.toContain('lx-scroll-snap-item');
    });

    it('align を指定するとアイテム用クラスと値が設定される', () => {
      const result = scrollSnap({ align: 'start' });
      expect(result.className).toContain('lx-scroll-snap-item');
      expect(result.style?.['--lx-scroll-snap-item-align']).toBe('start');
    });

    it('x.align / y.align は <block> <inline> の順で設定される', () => {
      const result = scrollSnap({
        x: { align: 'center' },
        y: { align: 'start' },
      });
      expect(result.style?.['--lx-scroll-snap-item-align']).toBe(
        'start center',
      );
    });

    it('x.align は align をインライン軸で上書きする', () => {
      const result = scrollSnap({ align: 'start', x: { align: 'end' } });
      expect(result.style?.['--lx-scroll-snap-item-align']).toBe('start end');
    });

    it('y.align のみ指定するとインライン軸は none になる', () => {
      const result = scrollSnap({ y: { align: 'center' } });
      expect(result.style?.['--lx-scroll-snap-item-align']).toBe('center none');
    });
  });

  describe('stop', () => {
    it('stop を指定するとアイテム用クラスと値が設定される', () => {
      const result = scrollSnap({ stop: 'always' });
      expect(result.className).toContain('lx-scroll-snap-item');
      expect(result.style?.['--lx-scroll-snap-item-stop']).toBe('always');
    });
  });

  describe('margin', () => {
    it('margin は全辺に適用される', () => {
      const result = scrollSnap({ margin: 4 });
      expect(result.className).toContain('lx-scroll-snap-item-margin');
      expect(result.style?.['--lx-scroll-snap-item-margin']).toBe('4px');
    });

    it('x.margin / y.margin だけでもアイテム用クラスが付与される', () => {
      const result = scrollSnap({ x: { margin: 16 }, y: { margin: 8 } });
      expect(result.className).toContain('lx-scroll-snap-item ');
      expect(result.className).toContain('lx-scroll-snap-item-margin-x');
      expect(result.className).toContain('lx-scroll-snap-item-margin-y');
      expect(result.style?.['--lx-scroll-snap-item-margin-x']).toBe('16px');
      expect(result.style?.['--lx-scroll-snap-item-margin-y']).toBe('8px');
    });
  });
});
