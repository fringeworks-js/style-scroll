/**
 * 横スクロールバーのトラックの幅: autoモード（thumbSizeXとthumbBorderWidthXから算出）
 */
export const clsScrollbarTrackSizeXAuto =
  'frg-scroll-scrollbar-trackSizeX-auto';

/**
 * 縦スクロールバーのトラックの幅: autoモード（thumbSizeYとthumbBorderWidthYから算出）
 */
export const clsScrollbarTrackSizeYAuto =
  'frg-scroll-scrollbar-trackSizeY-auto';

/**
 * 矢印ボタン表示
 */
export const clsScrollbarArrows = 'frg-scroll-scrollbar-arrows';

/**
 * transition有効
 */
export const clsScrollbarAnimation = 'frg-scroll-scrollbar-animation';

/**
 * 値: ハンドルの色
 */
export const varScrollbarThumbColor = {
  x: {
    base: '--frg-scroll-scrollbar-thumbColorX',
    hover: '--frg-scroll-scrollbar-thumbColorX-hover',
    active: '--frg-scroll-scrollbar-thumbColorX-active',
  },
  y: {
    base: '--frg-scroll-scrollbar-thumbColorY',
    hover: '--frg-scroll-scrollbar-thumbColorY-hover',
    active: '--frg-scroll-scrollbar-thumbColorY-active',
  },
} as const;

/**
 * 値: ハンドルの太さ
 */
export const varScrollbarThumbSize = {
  x: {
    base: '--frg-scroll-scrollbar-thumbSizeX',
    hover: '--frg-scroll-scrollbar-thumbSizeX-hover',
    active: '--frg-scroll-scrollbar-thumbSizeX-active',
  },
  y: {
    base: '--frg-scroll-scrollbar-thumbSizeY',
    hover: '--frg-scroll-scrollbar-thumbSizeY-hover',
    active: '--frg-scroll-scrollbar-thumbSizeY-active',
  },
} as const;

/**
 * 値: ハンドルの角丸
 */
export const varScrollbarThumbRadius = {
  x: {
    base: '--frg-scroll-scrollbar-thumbRadiusX',
    hover: '--frg-scroll-scrollbar-thumbRadiusX-hover',
    active: '--frg-scroll-scrollbar-thumbRadiusX-active',
  },
  y: {
    base: '--frg-scroll-scrollbar-thumbRadiusY',
    hover: '--frg-scroll-scrollbar-thumbRadiusY-hover',
    active: '--frg-scroll-scrollbar-thumbRadiusY-active',
  },
} as const;

/**
 * 値: ハンドルの線の色
 */
export const varScrollbarThumbBorderColor = {
  x: {
    base: '--frg-scroll-scrollbar-thumbBorderColorX',
    hover: '--frg-scroll-scrollbar-thumbBorderColorX-hover',
    active: '--frg-scroll-scrollbar-thumbBorderColorX-active',
  },
  y: {
    base: '--frg-scroll-scrollbar-thumbBorderColorY',
    hover: '--frg-scroll-scrollbar-thumbBorderColorY-hover',
    active: '--frg-scroll-scrollbar-thumbBorderColorY-active',
  },
} as const;

/**
 * 値: ハンドルの線の幅（trackSizeがautoのときだけ使う）
 */
export const varScrollbarThumbBorderWidth = {
  x: {
    base: '--frg-scroll-scrollbar-thumbBorderWidthX',
    hover: '--frg-scroll-scrollbar-thumbBorderWidthX-hover',
  },
  y: {
    base: '--frg-scroll-scrollbar-thumbBorderWidthY',
    hover: '--frg-scroll-scrollbar-thumbBorderWidthY-hover',
  },
} as const;

/**
 * 値: トラックの色
 */
export const varScrollbarTrackColor = {
  x: {
    base: '--frg-scroll-scrollbar-trackColorX',
    hover: '--frg-scroll-scrollbar-trackColorX-hover',
  },
  y: {
    base: '--frg-scroll-scrollbar-trackColorY',
    hover: '--frg-scroll-scrollbar-trackColorY-hover',
  },
} as const;

/**
 * 値: スクロールバーのトラックの幅
 */
export const varScrollbarTrackSize = {
  x: {
    base: '--frg-scroll-scrollbar-trackSizeX',
    hover: '--frg-scroll-scrollbar-trackSizeX-hover',
  },
  y: {
    base: '--frg-scroll-scrollbar-trackSizeY',
    hover: '--frg-scroll-scrollbar-trackSizeY-hover',
  },
} as const;

/**
 * 値: フォールバック（非WebKit）スクロールバーの幅プリセット
 */
export const varScrollbarFallbackSize = '--frg-scroll-scrollbar-fallbackSize';

// state
export const thumbStates = ['hover', 'active'] as const;
export const trackStates = ['hover'] as const;
