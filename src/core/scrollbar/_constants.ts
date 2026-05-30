/**
 * 横スクロールバーのハンドルの線の幅: autoモード（thumbSizeXに追従）
 */
export const clsScrollbarThumbBorderWidthXAuto =
  'nws-scroll-scrollbar-thumbBorderWidthX-auto';

/**
 * 縦スクロールバーのハンドルの線の幅: autoモード（thumbSizeYに追従）
 */
export const clsScrollbarThumbBorderWidthYAuto =
  'nws-scroll-scrollbar-thumbBorderWidthY-auto';

/**
 * 横スクロールバーのトラックの幅: autoモード（thumbSizeXに追従）
 */
export const clsScrollbarTrackSizeXAuto =
  'nws-scroll-scrollbar-trackSizeX-auto';

/**
 * 縦スクロールバーのトラックの幅: autoモード（thumbSizeYに追従）
 */
export const clsScrollbarTrackSizeYAuto =
  'nws-scroll-scrollbar-trackSizeY-auto';

/**
 * 矢印ボタン表示
 */
export const clsScrollbarArrowsTrue = 'nws-scroll-scrollbar-arrows-true';

/**
 * 矢印ボタン非表示
 */
export const clsScrollbarArrowsFalse = 'nws-scroll-scrollbar-arrows-false';

/**
 * サイズ系transition有効（thumbSize・trackSize・thumbBorderWidth）
 */
export const clsScrollbarAnimationSize = 'nws-scroll-scrollbar-animation-size';

/**
 * カラー系transition有効（thumbColor・trackColor・thumbBorderColor）
 */
export const clsScrollbarAnimationColor =
  'nws-scroll-scrollbar-animation-color';

/**
 * 値: ハンドルの色
 */
export const varScrollbarThumbColor = {
  x: {
    base: '--nws-scroll-scrollbar-thumbColorX',
    hover: '--nws-scroll-scrollbar-thumbColorX-hover',
    active: '--nws-scroll-scrollbar-thumbColorX-active',
  },
  y: {
    base: '--nws-scroll-scrollbar-thumbColorY',
    hover: '--nws-scroll-scrollbar-thumbColorY-hover',
    active: '--nws-scroll-scrollbar-thumbColorY-active',
  },
} as const;

/**
 * 値: ハンドルの太さ
 */
export const varScrollbarThumbSize = {
  x: {
    base: '--nws-scroll-scrollbar-thumbSizeX',
    hover: '--nws-scroll-scrollbar-thumbSizeX-hover',
    active: '--nws-scroll-scrollbar-thumbSizeX-active',
  },
  y: {
    base: '--nws-scroll-scrollbar-thumbSizeY',
    hover: '--nws-scroll-scrollbar-thumbSizeY-hover',
    active: '--nws-scroll-scrollbar-thumbSizeY-active',
  },
} as const;

/**
 * 値: ハンドルの角丸
 */
export const varScrollbarThumbRadius = {
  x: {
    base: '--nws-scroll-scrollbar-thumbRadiusX',
    hover: '--nws-scroll-scrollbar-thumbRadiusX-hover',
    active: '--nws-scroll-scrollbar-thumbRadiusX-active',
  },
  y: {
    base: '--nws-scroll-scrollbar-thumbRadiusY',
    hover: '--nws-scroll-scrollbar-thumbRadiusY-hover',
    active: '--nws-scroll-scrollbar-thumbRadiusY-active',
  },
} as const;

/**
 * 値: ハンドルの線の色
 */
export const varScrollbarThumbBorderColor = {
  x: {
    base: '--nws-scroll-scrollbar-thumbBorderColorX',
    hover: '--nws-scroll-scrollbar-thumbBorderColorX-hover',
    active: '--nws-scroll-scrollbar-thumbBorderColorX-active',
  },
  y: {
    base: '--nws-scroll-scrollbar-thumbBorderColorY',
    hover: '--nws-scroll-scrollbar-thumbBorderColorY-hover',
    active: '--nws-scroll-scrollbar-thumbBorderColorY-active',
  },
} as const;

/**
 * 値: ハンドルの線の幅
 */
export const varScrollbarThumbBorderWidth = {
  x: {
    base: '--nws-scroll-scrollbar-thumbBorderWidthX',
    hover: '--nws-scroll-scrollbar-thumbBorderWidthX-hover',
    active: '--nws-scroll-scrollbar-thumbBorderWidthX-active',
  },
  y: {
    base: '--nws-scroll-scrollbar-thumbBorderWidthY',
    hover: '--nws-scroll-scrollbar-thumbBorderWidthY-hover',
    active: '--nws-scroll-scrollbar-thumbBorderWidthY-active',
  },
} as const;

/**
 * 値: トラックの色
 */
export const varScrollbarTrackColor = {
  x: {
    base: '--nws-scroll-scrollbar-trackColorX',
    hover: '--nws-scroll-scrollbar-trackColorX-hover',
  },
  y: {
    base: '--nws-scroll-scrollbar-trackColorY',
    hover: '--nws-scroll-scrollbar-trackColorY-hover',
  },
} as const;

/**
 * 値: スクロールバーのトラックの幅
 */
export const varScrollbarTrackSize = {
  x: {
    base: '--nws-scroll-scrollbar-trackSizeX',
    hover: '--nws-scroll-scrollbar-trackSizeX-hover',
  },
  y: {
    base: '--nws-scroll-scrollbar-trackSizeY',
    hover: '--nws-scroll-scrollbar-trackSizeY-hover',
  },
} as const;

/**
 * 値: フォールバック（非WebKit）スクロールバーの幅プリセット
 */
export const varScrollbarFallbackSize = '--nws-scroll-scrollbar-fallbackSize';

// state
export const thumbStates = ['hover', 'active'] as const;
export const trackStates = ['hover'] as const;
