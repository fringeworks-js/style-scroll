/**
 * 横スクロールバーのトラックの幅: autoモード（thumbSizeXとthumbBorderWidthXから算出）
 */
export const clsScrollbarTrackSizeXAuto =
  'frgs-scroll-scrollbar-trackSizeX-auto';

/**
 * 縦スクロールバーのトラックの幅: autoモード（thumbSizeYとthumbBorderWidthYから算出）
 */
export const clsScrollbarTrackSizeYAuto =
  'frgs-scroll-scrollbar-trackSizeY-auto';

/**
 * 矢印ボタン表示
 */
export const clsScrollbarArrows = 'frgs-scroll-scrollbar-arrows';

/**
 * transition有効
 */
export const clsScrollbarAnimation = 'frgs-scroll-scrollbar-animation';

/**
 * 値: ハンドルの色
 */
export const varScrollbarThumbColor = {
  x: {
    base: '--frgs-scroll-scrollbar-thumbColorX',
    hover: '--frgs-scroll-scrollbar-thumbColorX-hover',
    active: '--frgs-scroll-scrollbar-thumbColorX-active',
  },
  y: {
    base: '--frgs-scroll-scrollbar-thumbColorY',
    hover: '--frgs-scroll-scrollbar-thumbColorY-hover',
    active: '--frgs-scroll-scrollbar-thumbColorY-active',
  },
} as const;

/**
 * 値: ハンドルの太さ
 */
export const varScrollbarThumbSize = {
  x: {
    base: '--frgs-scroll-scrollbar-thumbSizeX',
    hover: '--frgs-scroll-scrollbar-thumbSizeX-hover',
    active: '--frgs-scroll-scrollbar-thumbSizeX-active',
  },
  y: {
    base: '--frgs-scroll-scrollbar-thumbSizeY',
    hover: '--frgs-scroll-scrollbar-thumbSizeY-hover',
    active: '--frgs-scroll-scrollbar-thumbSizeY-active',
  },
} as const;

/**
 * 値: ハンドルの角丸
 */
export const varScrollbarThumbRadius = {
  x: {
    base: '--frgs-scroll-scrollbar-thumbRadiusX',
    hover: '--frgs-scroll-scrollbar-thumbRadiusX-hover',
    active: '--frgs-scroll-scrollbar-thumbRadiusX-active',
  },
  y: {
    base: '--frgs-scroll-scrollbar-thumbRadiusY',
    hover: '--frgs-scroll-scrollbar-thumbRadiusY-hover',
    active: '--frgs-scroll-scrollbar-thumbRadiusY-active',
  },
} as const;

/**
 * 値: ハンドルの線の色
 */
export const varScrollbarThumbBorderColor = {
  x: {
    base: '--frgs-scroll-scrollbar-thumbBorderColorX',
    hover: '--frgs-scroll-scrollbar-thumbBorderColorX-hover',
    active: '--frgs-scroll-scrollbar-thumbBorderColorX-active',
  },
  y: {
    base: '--frgs-scroll-scrollbar-thumbBorderColorY',
    hover: '--frgs-scroll-scrollbar-thumbBorderColorY-hover',
    active: '--frgs-scroll-scrollbar-thumbBorderColorY-active',
  },
} as const;

/**
 * 値: ハンドルの線の幅（trackSizeがautoのときだけ使う）
 */
export const varScrollbarThumbBorderWidth = {
  x: {
    base: '--frgs-scroll-scrollbar-thumbBorderWidthX',
    hover: '--frgs-scroll-scrollbar-thumbBorderWidthX-hover',
  },
  y: {
    base: '--frgs-scroll-scrollbar-thumbBorderWidthY',
    hover: '--frgs-scroll-scrollbar-thumbBorderWidthY-hover',
  },
} as const;

/**
 * 値: トラックの色
 */
export const varScrollbarTrackColor = {
  x: {
    base: '--frgs-scroll-scrollbar-trackColorX',
    hover: '--frgs-scroll-scrollbar-trackColorX-hover',
  },
  y: {
    base: '--frgs-scroll-scrollbar-trackColorY',
    hover: '--frgs-scroll-scrollbar-trackColorY-hover',
  },
} as const;

/**
 * 値: スクロールバーのトラックの幅
 */
export const varScrollbarTrackSize = {
  x: {
    base: '--frgs-scroll-scrollbar-trackSizeX',
    hover: '--frgs-scroll-scrollbar-trackSizeX-hover',
  },
  y: {
    base: '--frgs-scroll-scrollbar-trackSizeY',
    hover: '--frgs-scroll-scrollbar-trackSizeY-hover',
  },
} as const;

/**
 * 値: フォールバック（非WebKit）スクロールバーの幅プリセット
 */
export const varScrollbarFallbackSize = '--frgs-scroll-scrollbar-fallbackSize';

// state
export const thumbStates = ['hover', 'active'] as const;
export const trackStates = ['hover'] as const;
