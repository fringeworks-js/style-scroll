import { describe, expect, it } from 'vitest';
import scrollbar from './scrollbar';

describe('scrollbar', () => {
  describe('デフォルト', () => {
    it('引数なしで基本クラスと transition クラスだけが付与される', () => {
      const result = scrollbar();
      expect(result.className).toBe(
        'frgs-scroll-scrollbar frgs-scroll-scrollbar-animation',
      );
    });

    it('引数なしでスタイルは空', () => {
      const result = scrollbar();
      expect(result.style).toEqual({});
    });
  });

  describe('thumbSize', () => {
    it('thumbSize を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ thumbSize: 8 });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX']).toBe('8px');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY']).toBe('8px');
    });

    it('thumbSize: 0 はゼロとして設定される', () => {
      const result = scrollbar({ thumbSize: 0 });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX']).toBe('0px');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY']).toBe('0px');
    });

    it('x.thumbSize は thumbSize をX軸で上書きする', () => {
      const result = scrollbar({ thumbSize: 8, x: { thumbSize: 4 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX']).toBe('4px');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY']).toBe('8px');
    });

    it('y.thumbSize は thumbSize をY軸で上書きする', () => {
      const result = scrollbar({ thumbSize: 8, y: { thumbSize: 12 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX']).toBe('8px');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY']).toBe('12px');
    });
  });

  describe('thumbSize hover', () => {
    it('hover を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ thumbSize: { hover: 12 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '12px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '12px',
      );
    });

    it('x.thumbSize の hover は thumbSize の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbSize: { hover: 12 },
        x: { thumbSize: { hover: 6 } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '6px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '12px',
      );
    });

    it('y.thumbSize の hover は thumbSize の hover をY軸で上書きする', () => {
      const result = scrollbar({
        thumbSize: { hover: 12 },
        y: { thumbSize: { hover: 16 } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '12px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '16px',
      );
    });
  });

  describe('thumbColor', () => {
    it('thumbColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: 'red' });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX']).toBe('red');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY']).toBe('red');
    });

    it('x.thumbColor のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbColor: 'blue' } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX']).toBe(
        'blue',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorY'],
      ).toBeUndefined();
    });

    it('y.thumbColor のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { thumbColor: 'green' } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY']).toBe(
        'green',
      );
    });

    it('x.thumbColor は thumbColor をX軸で上書きする', () => {
      const result = scrollbar({
        thumbColor: 'red',
        x: { thumbColor: 'blue' },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX']).toBe(
        'blue',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY']).toBe('red');
    });
  });

  describe('thumbColor hover', () => {
    it('thumbColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: { hover: 'rgba(0,0,0,0.5)' } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-hover']).toBe(
        'rgba(0,0,0,0.5)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-hover']).toBe(
        'rgba(0,0,0,0.5)',
      );
    });

    it('x.thumbColor の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({
        x: { thumbColor: { hover: 'rgba(0,0,0,0.3)' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-hover']).toBe(
        'rgba(0,0,0,0.3)',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorY-hover'],
      ).toBeUndefined();
    });

    it('y.thumbColor の hover のみ指定するとYだけ設定される', () => {
      const result = scrollbar({
        y: { thumbColor: { hover: 'rgba(0,0,0,0.7)' } },
      });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorX-hover'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-hover']).toBe(
        'rgba(0,0,0,0.7)',
      );
    });

    it('x.thumbColor の hover は thumbColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbColor: { hover: 'red' },
        x: { thumbColor: { hover: 'blue' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-hover']).toBe(
        'blue',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-hover']).toBe(
        'red',
      );
    });

    it('x.thumbColor の base 指定のみで hover が未指定の場合、thumbColor の hover にフォールバックする', () => {
      const result = scrollbar({
        thumbColor: { hover: 'blue' },
        x: { thumbColor: { base: 'green' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-hover']).toBe(
        'blue',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-hover']).toBe(
        'blue',
      );
    });
  });

  describe('thumbColor active', () => {
    it('thumbColor の active を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: { active: '#333' } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-active']).toBe(
        '#333',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });

    it('x.thumbColor の active のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbColor: { active: '#555' } } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-active']).toBe(
        '#555',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorY-active'],
      ).toBeUndefined();
    });

    it('y.thumbColor の active のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { thumbColor: { active: '#777' } } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbColorX-active'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-active']).toBe(
        '#777',
      );
    });

    it('x.thumbColor の active は thumbColor の active をX軸で上書きする', () => {
      const result = scrollbar({
        thumbColor: { active: '#333' },
        x: { thumbColor: { active: '#555' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-active']).toBe(
        '#555',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });

    it('x.thumbColor の base 指定のみで active が未指定の場合、thumbColor の active にフォールバックする', () => {
      const result = scrollbar({
        thumbColor: { active: '#333' },
        x: { thumbColor: { base: 'blue' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorX-active']).toBe(
        '#333',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });
  });

  describe('thumbRadius', () => {
    it('数値を指定するとX・YにpxでCSSカスタムプロパティが設定される', () => {
      const result = scrollbar({ thumbRadius: 4 });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe(
        '4px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY']).toBe(
        '4px',
      );
    });

    it('"full" はX・Yともに 9999px に変換される', () => {
      const result = scrollbar({ thumbRadius: 'full' });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe(
        '9999px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY']).toBe(
        '9999px',
      );
    });

    it('"none" はX・Yともに 0 に変換される', () => {
      const result = scrollbar({ thumbRadius: 'none' });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe('0');
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY']).toBe('0');
    });

    it('x.thumbRadius のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbRadius: 'full' } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe(
        '9999px',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbRadiusY'],
      ).toBeUndefined();
    });

    it('y.thumbRadius のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { thumbRadius: 'none' } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbRadiusX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY']).toBe('0');
    });

    it('x.thumbRadius は thumbRadius をX軸で上書きする', () => {
      const result = scrollbar({ thumbRadius: 4, x: { thumbRadius: 8 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe(
        '8px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY']).toBe(
        '4px',
      );
    });
  });

  describe('thumbBorderWidth', () => {
    it('thumbBorderWidth を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderWidth: 2 });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '2px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '2px',
      );
    });

    it('x.thumbBorderWidth のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbBorderWidth: 1 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '1px',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthY'],
      ).toBeUndefined();
    });

    it('y.thumbBorderWidth のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { thumbBorderWidth: 3 } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '3px',
      );
    });

    it('x.thumbBorderWidth は thumbBorderWidth をX軸で上書きする', () => {
      const result = scrollbar({
        thumbBorderWidth: 2,
        x: { thumbBorderWidth: 1 },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '1px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '2px',
      );
    });
  });

  describe('thumbBorderColor', () => {
    it('thumbBorderColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderColor: 'transparent' });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX']).toBe(
        'transparent',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY']).toBe(
        'transparent',
      );
    });

    it('x.thumbBorderColor のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbBorderColor: 'white' } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY'],
      ).toBeUndefined();
    });

    it('y.thumbBorderColor のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { thumbBorderColor: 'black' } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY']).toBe(
        'black',
      );
    });

    it('x.thumbBorderColor は thumbBorderColor をX軸で上書きする', () => {
      const result = scrollbar({
        thumbBorderColor: 'transparent',
        x: { thumbBorderColor: 'white' },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY']).toBe(
        'transparent',
      );
    });
  });

  describe('thumbBorderColor hover', () => {
    it('thumbBorderColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderColor: { hover: 'red' } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('red');
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX'],
      ).toBeUndefined();
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY'],
      ).toBeUndefined();
    });

    it('x.thumbBorderColor の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { thumbBorderColor: { hover: 'blue' } } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('blue');
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBeUndefined();
    });

    it('x.thumbBorderColor の hover は thumbBorderColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbBorderColor: { hover: 'red' },
        x: { thumbBorderColor: { hover: 'blue' } },
      });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('blue');
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
    });

    it('x.thumbBorderColor の base 指定のみで hover が未指定の場合、thumbBorderColor の hover にフォールバックする', () => {
      const result = scrollbar({
        thumbBorderColor: { hover: 'red' },
        x: { thumbBorderColor: { base: 'white' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('red');
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
    });
  });

  describe('trackColor', () => {
    it('trackColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ trackColor: 'rgba(0,0,0,0.1)' });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.1)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.1)',
      );
    });

    it('x.trackColor のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ x: { trackColor: 'rgba(0,0,0,0.2)' } });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackColorY'],
      ).toBeUndefined();
    });

    it('y.trackColor のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ y: { trackColor: 'rgba(0,0,0,0.3)' } });
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackColorX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.3)',
      );
    });

    it('x.trackColor は trackColor をX軸で上書きする', () => {
      const result = scrollbar({
        trackColor: 'rgba(0,0,0,0.1)',
        x: { trackColor: 'rgba(0,0,0,0.2)' },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.1)',
      );
    });
  });

  describe('trackColor hover', () => {
    it('trackColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ trackColor: { hover: 'rgba(0,0,0,0.2)' } });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackColorX'],
      ).toBeUndefined();
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackColorY'],
      ).toBeUndefined();
    });

    it('x.trackColor の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({
        x: { trackColor: { hover: 'rgba(0,0,0,0.3)' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.3)',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackColorY-hover'],
      ).toBeUndefined();
    });

    it('x.trackColor の hover は trackColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        trackColor: { hover: 'rgba(0,0,0,0.2)' },
        x: { trackColor: { hover: 'rgba(0,0,0,0.4)' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.4)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
    });

    it('x.trackColor の base 指定のみで hover が未指定の場合、trackColor の hover にフォールバックする', () => {
      const result = scrollbar({
        trackColor: { hover: 'rgba(0,0,0,0.2)' },
        x: { trackColor: { base: 'rgba(0,0,0,0.1)' } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.1)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
    });
  });

  describe('thumbBorderWidth hover', () => {
    it('thumbBorderWidth の hover を指定するとX・Yにpx変換される', () => {
      const result = scrollbar({ thumbBorderWidth: { base: 1, hover: 2 } });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '1px',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthY-hover'],
      ).toBe('2px');
    });

    it('thumbBorderWidth に active のCSS変数は設定されない', () => {
      const result = scrollbar({ thumbBorderWidth: 2 });
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbBorderWidthX-active'],
      ).toBeUndefined();
    });
  });

  describe('trackSize', () => {
    it('trackSize に数値を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ trackSize: 12 });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('trackSize 未指定では auto クラスは付与されない', () => {
      const result = scrollbar();
      expect(result.className).not.toContain('trackSizeX-auto');
      expect(result.className).not.toContain('trackSizeY-auto');
    });

    it('trackSize: "auto" でX・Y両方に auto クラスが付与され、変数は設定されない', () => {
      const result = scrollbar({ trackSize: 'auto' });
      expect(result.className).toContain(
        'frgs-scroll-scrollbar-trackSizeX-auto',
      );
      expect(result.className).toContain(
        'frgs-scroll-scrollbar-trackSizeY-auto',
      );
      expect(result.style).toEqual({});
    });

    it('x.trackSize は trackSize をX軸で上書きする', () => {
      const result = scrollbar({ trackSize: 12, x: { trackSize: 8 } });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('8px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('x.trackSize は trackSize をX軸で上書きする(auto)', () => {
      const result = scrollbar({ trackSize: 12, x: { trackSize: 'auto' } });
      expect(result.className).toContain(
        'frgs-scroll-scrollbar-trackSizeX-auto',
      );
      expect(result.className).not.toContain(
        'frgs-scroll-scrollbar-trackSizeY-auto',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackSizeX'],
      ).toBeUndefined();
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('y.trackSize は trackSize をY軸で上書きする(auto)', () => {
      const result = scrollbar({ trackSize: 12, y: { trackSize: 'auto' } });
      expect(result.className).toContain(
        'frgs-scroll-scrollbar-trackSizeY-auto',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackSizeY'],
      ).toBeUndefined();
    });

    it('trackSize: "auto" を x.trackSize の数値で上書きすると、X軸は auto にならない', () => {
      const result = scrollbar({ trackSize: 'auto', x: { trackSize: 10 } });
      expect(result.className).not.toContain(
        'frgs-scroll-scrollbar-trackSizeX-auto',
      );
      expect(result.className).toContain(
        'frgs-scroll-scrollbar-trackSizeY-auto',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('10px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX-hover']).toBe(
        '10px',
      );
    });
  });

  describe('trackSize hover', () => {
    it('trackSize の hover を指定するとX・Yにpx変換される', () => {
      const result = scrollbar({ trackSize: { hover: 16 } });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX-hover']).toBe(
        '16px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackSizeX'],
      ).toBeUndefined();
      expect(
        result.style?.['--frgs-scroll-scrollbar-trackSizeY'],
      ).toBeUndefined();
    });

    it('trackSize に base と hover を指定するとX・Yそれぞれ設定される', () => {
      const result = scrollbar({ trackSize: { base: 12, hover: 16 } });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY']).toBe('12px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX-hover']).toBe(
        '16px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
    });

    it('x.trackSize の hover は trackSize の hover をX軸で上書きする', () => {
      const result = scrollbar({
        trackSize: { hover: 16 },
        x: { trackSize: { hover: 20 } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX-hover']).toBe(
        '20px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
    });

    it('x.trackSize の base 指定のみで hover が未指定の場合、trackSize の hover にフォールバックする', () => {
      const result = scrollbar({
        trackSize: { hover: 16 },
        x: { trackSize: { base: 8 } },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX']).toBe('8px');
      expect(result.style?.['--frgs-scroll-scrollbar-trackSizeX-hover']).toBe(
        '16px',
      );
    });
  });

  describe('thumbRadius hover', () => {
    it('thumbRadius の hover・active を指定するとそれぞれ変換される', () => {
      const result = scrollbar({
        thumbRadius: { base: 'full', hover: 4, active: 'none' },
      });
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusX']).toBe(
        '9999px',
      );
      expect(result.style?.['--frgs-scroll-scrollbar-thumbRadiusY-hover']).toBe(
        '4px',
      );
      expect(
        result.style?.['--frgs-scroll-scrollbar-thumbRadiusX-active'],
      ).toBe('0');
    });
  });

  describe('fallbackSize', () => {
    it('fallbackSize: "thin" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'thin' });
      expect(result.style?.['--frgs-scroll-scrollbar-fallbackSize']).toBe(
        'thin',
      );
    });

    it('fallbackSize: "none" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'none' });
      expect(result.style?.['--frgs-scroll-scrollbar-fallbackSize']).toBe(
        'none',
      );
    });

    it('fallbackSize: "auto" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'auto' });
      expect(result.style?.['--frgs-scroll-scrollbar-fallbackSize']).toBe(
        'auto',
      );
    });
  });

  describe('noAnimation', () => {
    it('noAnimation 未指定では transitionクラスが付与される', () => {
      const result = scrollbar();
      expect(result.className).toContain('frgs-scroll-scrollbar-animation');
    });

    it('noAnimation: false では transitionクラスが付与される', () => {
      const result = scrollbar({ noAnimation: false });
      expect(result.className).toContain('frgs-scroll-scrollbar-animation');
    });

    it('noAnimation: true では transitionクラスが付与されない', () => {
      const result = scrollbar({ noAnimation: true });
      expect(result.className).not.toContain('frgs-scroll-scrollbar-animation');
    });
  });

  describe('arrows', () => {
    it('arrows: true で arrows クラスが付与される', () => {
      const result = scrollbar({ arrows: true });
      expect(result.className).toContain('frgs-scroll-scrollbar-arrows');
    });

    it('arrows: false ではクラスが付与されない', () => {
      const result = scrollbar({ arrows: false });
      expect(result.className).not.toContain('frgs-scroll-scrollbar-arrows');
    });

    it('arrows 未指定ではクラスが付与されない', () => {
      const result = scrollbar();
      expect(result.className).not.toContain('frgs-scroll-scrollbar-arrows');
    });
  });
});
