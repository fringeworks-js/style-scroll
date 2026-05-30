import { describe, expect, it } from 'vitest';
import scrollbar from './scrollbar';

describe('scrollbar', () => {
  describe('デフォルト', () => {
    it('引数なしで基本クラスが付与される', () => {
      const result = scrollbar();
      expect(result.className).toContain('nws-scroll-scrollbar');
    });

    it('引数なしでスタイルは空', () => {
      const result = scrollbar();
      console.log('引数なしでスタイルは空', result);
      expect(result.style).toEqual({});
    });
  });

  describe('thumbSize', () => {
    it('thumbSize を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ thumbSize: 8 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX']).toBe('8px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY']).toBe('8px');
    });

    it('thumbSize: 0 はゼロとして設定される', () => {
      const result = scrollbar({ thumbSize: 0 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX']).toBe('0px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY']).toBe('0px');
    });

    it('thumbSizeX は thumbSize をX軸で上書きする', () => {
      const result = scrollbar({ thumbSize: 8, thumbSizeX: 4 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX']).toBe('4px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY']).toBe('8px');
    });

    it('thumbSizeY は thumbSize をY軸で上書きする', () => {
      const result = scrollbar({ thumbSize: 8, thumbSizeY: 12 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX']).toBe('8px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY']).toBe('12px');
    });
  });

  describe('thumbSize hover', () => {
    it('hover を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ thumbSize: { hover: 12 } });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '12px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '12px',
      );
    });

    it('thumbSizeX の hover は thumbSize の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbSize: { hover: 12 },
        thumbSizeX: { hover: 6 },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '6px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '12px',
      );
    });

    it('thumbSizeY の hover は thumbSize の hover をY軸で上書きする', () => {
      const result = scrollbar({
        thumbSize: { hover: 12 },
        thumbSizeY: { hover: 16 },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeX-hover']).toBe(
        '12px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbSizeY-hover']).toBe(
        '16px',
      );
    });
  });

  describe('thumbColor', () => {
    it('thumbColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: 'red' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX']).toBe('red');
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY']).toBe('red');
    });

    it('thumbColorX のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbColorX: 'blue' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX']).toBe('blue');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorY'],
      ).toBeUndefined();
    });

    it('thumbColorY のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbColorY: 'green' });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorX'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY']).toBe(
        'green',
      );
    });

    it('thumbColorX は thumbColor をX軸で上書きする', () => {
      const result = scrollbar({ thumbColor: 'red', thumbColorX: 'blue' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX']).toBe('blue');
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY']).toBe('red');
    });
  });

  describe('thumbColor hover', () => {
    it('thumbColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: { hover: 'rgba(0,0,0,0.5)' } });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-hover']).toBe(
        'rgba(0,0,0,0.5)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-hover']).toBe(
        'rgba(0,0,0,0.5)',
      );
    });

    it('thumbColorX の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbColorX: { hover: 'rgba(0,0,0,0.3)' } });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-hover']).toBe(
        'rgba(0,0,0,0.3)',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorY-hover'],
      ).toBeUndefined();
    });

    it('thumbColorY の hover のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbColorY: { hover: 'rgba(0,0,0,0.7)' } });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorX-hover'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-hover']).toBe(
        'rgba(0,0,0,0.7)',
      );
    });

    it('thumbColorX の hover は thumbColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbColor: { hover: 'red' },
        thumbColorX: { hover: 'blue' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-hover']).toBe(
        'blue',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-hover']).toBe(
        'red',
      );
    });

    it('thumbColorX の base 指定のみで hover が未指定の場合、thumbColor の hover にフォールバックする', () => {
      const result = scrollbar({
        thumbColor: { hover: 'blue' },
        thumbColorX: { base: 'green' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-hover']).toBe(
        'blue',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-hover']).toBe(
        'blue',
      );
    });
  });

  describe('thumbColor active', () => {
    it('thumbColor の active を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbColor: { active: '#333' } });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-active']).toBe(
        '#333',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });

    it('thumbColorX の active のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbColorX: { active: '#555' } });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-active']).toBe(
        '#555',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorY-active'],
      ).toBeUndefined();
    });

    it('thumbColorY の active のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbColorY: { active: '#777' } });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbColorX-active'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-active']).toBe(
        '#777',
      );
    });

    it('thumbColorX の active は thumbColor の active をX軸で上書きする', () => {
      const result = scrollbar({
        thumbColor: { active: '#333' },
        thumbColorX: { active: '#555' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-active']).toBe(
        '#555',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });

    it('thumbColorX の base 指定のみで active が未指定の場合、thumbColor の active にフォールバックする', () => {
      const result = scrollbar({
        thumbColor: { active: '#333' },
        thumbColorX: { base: 'blue' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorX-active']).toBe(
        '#333',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbColorY-active']).toBe(
        '#333',
      );
    });
  });

  describe('thumbRadius', () => {
    it('数値を指定するとX・YにpxでCSSカスタムプロパティが設定される', () => {
      const result = scrollbar({ thumbRadius: 4 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusX']).toBe('4px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusY']).toBe('4px');
    });

    it('"full" はX・Yともに 9999px に変換される', () => {
      const result = scrollbar({ thumbRadius: 'full' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusX']).toBe(
        '9999px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusY']).toBe(
        '9999px',
      );
    });

    it('"none" はX・Yともに 0 に変換される', () => {
      const result = scrollbar({ thumbRadius: 'none' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusX']).toBe('0');
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusY']).toBe('0');
    });

    it('thumbRadiusX のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbRadiusX: 'full' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusX']).toBe(
        '9999px',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbRadiusY'],
      ).toBeUndefined();
    });

    it('thumbRadiusY のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbRadiusY: 'none' });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbRadiusX'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusY']).toBe('0');
    });

    it('thumbRadiusX は thumbRadius をX軸で上書きする', () => {
      const result = scrollbar({ thumbRadius: 4, thumbRadiusX: 8 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusX']).toBe('8px');
      expect(result.style?.['--nws-scroll-scrollbar-thumbRadiusY']).toBe('4px');
    });
  });

  describe('thumbBorderWidth', () => {
    it('thumbBorderWidth を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderWidth: 2 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '2px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '2px',
      );
    });

    it('thumbBorderWidthX のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbBorderWidthX: 1 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '1px',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderWidthY'],
      ).toBeUndefined();
    });

    it('thumbBorderWidthY のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbBorderWidthY: 3 });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderWidthX'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '3px',
      );
    });

    it('thumbBorderWidthX は thumbBorderWidth をX軸で上書きする', () => {
      const result = scrollbar({ thumbBorderWidth: 2, thumbBorderWidthX: 1 });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthX']).toBe(
        '1px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderWidthY']).toBe(
        '2px',
      );
    });
  });

  describe('thumbBorderColor', () => {
    it('thumbBorderColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderColor: 'transparent' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorX']).toBe(
        'transparent',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorY']).toBe(
        'transparent',
      );
    });

    it('thumbBorderColorX のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbBorderColorX: 'white' });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY'],
      ).toBeUndefined();
    });

    it('thumbBorderColorY のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ thumbBorderColorY: 'black' });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorY']).toBe(
        'black',
      );
    });

    it('thumbBorderColorX は thumbBorderColor をX軸で上書きする', () => {
      const result = scrollbar({
        thumbBorderColor: 'transparent',
        thumbBorderColorX: 'white',
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorY']).toBe(
        'transparent',
      );
    });
  });

  describe('thumbBorderColor hover', () => {
    it('thumbBorderColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ thumbBorderColor: { hover: 'red' } });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('red');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX'],
      ).toBeUndefined();
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY'],
      ).toBeUndefined();
    });

    it('thumbBorderColorX の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ thumbBorderColorX: { hover: 'blue' } });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('blue');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBeUndefined();
    });

    it('thumbBorderColorX の hover は thumbBorderColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        thumbBorderColor: { hover: 'red' },
        thumbBorderColorX: { hover: 'blue' },
      });
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('blue');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
    });

    it('thumbBorderColorX の base 指定のみで hover が未指定の場合、thumbBorderColor の hover にフォールバックする', () => {
      const result = scrollbar({
        thumbBorderColor: { hover: 'red' },
        thumbBorderColorX: { base: 'white' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-thumbBorderColorX']).toBe(
        'white',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorX-hover'],
      ).toBe('red');
      expect(
        result.style?.['--nws-scroll-scrollbar-thumbBorderColorY-hover'],
      ).toBe('red');
    });
  });

  describe('trackColor', () => {
    it('trackColor を指定するとX・Yに展開される', () => {
      const result = scrollbar({ trackColor: 'rgba(0,0,0,0.1)' });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.1)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.1)',
      );
    });

    it('trackColorX のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ trackColorX: 'rgba(0,0,0,0.2)' });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-trackColorY'],
      ).toBeUndefined();
    });

    it('trackColorY のみ指定するとYだけ設定される', () => {
      const result = scrollbar({ trackColorY: 'rgba(0,0,0,0.3)' });
      expect(
        result.style?.['--nws-scroll-scrollbar-trackColorX'],
      ).toBeUndefined();
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.3)',
      );
    });

    it('trackColorX は trackColor をX軸で上書きする', () => {
      const result = scrollbar({
        trackColor: 'rgba(0,0,0,0.1)',
        trackColorX: 'rgba(0,0,0,0.2)',
      });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY']).toBe(
        'rgba(0,0,0,0.1)',
      );
    });
  });

  describe('trackColor hover', () => {
    it('trackColor の hover を指定するとX・Yに展開される', () => {
      const result = scrollbar({ trackColor: { hover: 'rgba(0,0,0,0.2)' } });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-trackColorX'],
      ).toBeUndefined();
      expect(
        result.style?.['--nws-scroll-scrollbar-trackColorY'],
      ).toBeUndefined();
    });

    it('trackColorX の hover のみ指定するとXだけ設定される', () => {
      const result = scrollbar({ trackColorX: { hover: 'rgba(0,0,0,0.3)' } });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.3)',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-trackColorY-hover'],
      ).toBeUndefined();
    });

    it('trackColorX の hover は trackColor の hover をX軸で上書きする', () => {
      const result = scrollbar({
        trackColor: { hover: 'rgba(0,0,0,0.2)' },
        trackColorX: { hover: 'rgba(0,0,0,0.4)' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.4)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
    });

    it('trackColorX の base 指定のみで hover が未指定の場合、trackColor の hover にフォールバックする', () => {
      const result = scrollbar({
        trackColor: { hover: 'rgba(0,0,0,0.2)' },
        trackColorX: { base: 'rgba(0,0,0,0.1)' },
      });
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX']).toBe(
        'rgba(0,0,0,0.1)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorX-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackColorY-hover']).toBe(
        'rgba(0,0,0,0.2)',
      );
    });
  });

  describe('trackSize', () => {
    it('trackSize に数値を指定するとX・Y両方にpx変換される', () => {
      const result = scrollbar({ trackSize: 12 });
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('trackSize: "auto" でX・Y両方に auto クラスが付与され変数はauto', () => {
      const result = scrollbar({ trackSize: 'auto' });
      expect(result.className).toContain(
        'nws-scroll-scrollbar-trackSizeX-auto',
      );
      expect(result.className).toContain(
        'nws-scroll-scrollbar-trackSizeY-auto',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('auto');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('auto');
    });

    it('trackSizeX は trackSize をX軸で上書きする', () => {
      const result = scrollbar({ trackSize: 12, trackSizeX: 8 });
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('8px');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('trackSizeX は trackSize をX軸で上書きする(auto)', () => {
      const result = scrollbar({ trackSize: 12, trackSizeX: 'auto' });
      expect(result.className).toContain(
        'nws-scroll-scrollbar-trackSizeX-auto',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('auto');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('12px');
    });

    it('trackSizeY は trackSize をX軸で上書きする(auto)', () => {
      const result = scrollbar({ trackSize: 12, trackSizeY: 'auto' });
      expect(result.className).toContain(
        'nws-scroll-scrollbar-trackSizeY-auto',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('auto');
    });
  });

  describe('trackSize hover', () => {
    it('trackSize の hover を指定するとX・Yにpx変換される', () => {
      const result = scrollbar({ trackSize: { hover: 16 } });
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX-hover']).toBe(
        '16px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
      expect(
        result.style?.['--nws-scroll-scrollbar-trackSizeX'],
      ).toBeUndefined();
      expect(
        result.style?.['--nws-scroll-scrollbar-trackSizeY'],
      ).toBeUndefined();
    });

    it('trackSize に base と hover を指定するとX・Yそれぞれ設定される', () => {
      const result = scrollbar({ trackSize: { base: 12, hover: 16 } });
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX']).toBe('12px');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY']).toBe('12px');
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX-hover']).toBe(
        '16px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
    });

    it('trackSizeX の hover は trackSize の hover をX軸で上書きする', () => {
      const result = scrollbar({
        trackSize: { hover: 16 },
        trackSizeX: { hover: 20 },
      });
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeX-hover']).toBe(
        '20px',
      );
      expect(result.style?.['--nws-scroll-scrollbar-trackSizeY-hover']).toBe(
        '16px',
      );
    });
  });

  describe('fallbackSize', () => {
    it('fallbackSize: "thin" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'thin' });
      expect(result.style?.['--nws-scroll-scrollbar-fallbackSize']).toBe(
        'thin',
      );
    });

    it('fallbackSize: "none" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'none' });
      expect(result.style?.['--nws-scroll-scrollbar-fallbackSize']).toBe(
        'none',
      );
    });

    it('fallbackSize: "auto" を設定する', () => {
      const result = scrollbar({ fallbackSize: 'auto' });
      expect(result.style?.['--nws-scroll-scrollbar-fallbackSize']).toBe(
        'auto',
      );
    });
  });

  describe('noAnimation', () => {
    it('noAnimation 未指定では size・color 両方のtransitionクラスが付与される', () => {
      const result = scrollbar({});
      expect(result.className).toContain('nws-scroll-scrollbar-animation-size');
      expect(result.className).toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });

    it('noAnimation: false では size・color 両方のtransitionクラスが付与される', () => {
      const result = scrollbar({ noAnimation: false });
      expect(result.className).toContain('nws-scroll-scrollbar-animation-size');
      expect(result.className).toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });

    it('noAnimation: true では transitionクラスが付与されない', () => {
      const result = scrollbar({ noAnimation: true });
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-size',
      );
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });

    it('noAnimation: { size: true } では color のみ transitionクラスが付与される', () => {
      const result = scrollbar({ noAnimation: { size: true } });
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-size',
      );
      expect(result.className).toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });

    it('noAnimation: { color: true } では size のみ transitionクラスが付与される', () => {
      const result = scrollbar({ noAnimation: { color: true } });
      expect(result.className).toContain('nws-scroll-scrollbar-animation-size');
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });

    it('noAnimation: { size: true, color: true } では transitionクラスが付与されない', () => {
      const result = scrollbar({ noAnimation: { size: true, color: true } });
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-size',
      );
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-animation-color',
      );
    });
  });

  describe('arrows', () => {
    it('arrows: true で arrows-show クラスが付与される', () => {
      const result = scrollbar({ arrows: true });
      expect(result.className).toContain('nws-scroll-scrollbar-arrows-true');
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-arrows-false',
      );
    });

    it('arrows: false で arrows-hide クラスが付与される', () => {
      const result = scrollbar({ arrows: false });
      expect(result.className).toContain('nws-scroll-scrollbar-arrows-false');
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-arrows-true',
      );
    });

    it('arrows 未指定ではクラスが付与されない', () => {
      const result = scrollbar({});
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-arrows-true',
      );
      expect(result.className).not.toContain(
        'nws-scroll-scrollbar-arrows-false',
      );
    });
  });
});
