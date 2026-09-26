/**
 * 横スクロールバーのハンドルの線の幅: autoモード（thumbSizeXに追従）
 */
export const clsScrollbarThumbBorderWidthXAuto =
  'lx-scroll-scrollbar-thumbBorderWidthX-auto';

/**
 * 縦スクロールバーのハンドルの線の幅: autoモード（thumbSizeYに追従）
 */
export const clsScrollbarThumbBorderWidthYAuto =
  'lx-scroll-scrollbar-thumbBorderWidthY-auto';

/**
 * 横スクロールバーのトラックの幅: autoモード（thumbSizeXに追従）
 */
export const clsScrollbarTrackSizeXAuto = 'lx-scroll-scrollbar-trackSizeX-auto';

/**
 * 縦スクロールバーのトラックの幅: autoモード（thumbSizeYに追従）
 */
export const clsScrollbarTrackSizeYAuto = 'lx-scroll-scrollbar-trackSizeY-auto';

/**
 * 矢印ボタン表示
 */
export const clsScrollbarArrowsTrue = 'lx-scroll-scrollbar-arrows-true';

/**
 * 矢印ボタン非表示
 */
export const clsScrollbarArrowsFalse = 'lx-scroll-scrollbar-arrows-false';

/**
 * サイズ系transition有効（thumbSize・trackSize・thumbBorderWidth）
 */
export const clsScrollbarAnimationSize = 'lx-scroll-scrollbar-animation-size';

/**
 * カラー系transition有効（thumbColor・trackColor・thumbBorderColor）
 */
export const clsScrollbarAnimationColor = 'lx-scroll-scrollbar-animation-color';

/**
 * 値: ハンドルの色
 */
export const varScrollbarThumbColor = {
  x: {
    base: '--lx-scroll-scrollbar-thumbColorX',
    hover: '--lx-scroll-scrollbar-thumbColorX-hover',
    active: '--lx-scroll-scrollbar-thumbColorX-active',
  },
  y: {
    base: '--lx-scroll-scrollbar-thumbColorY',
    hover: '--lx-scroll-scrollbar-thumbColorY-hover',
    active: '--lx-scroll-scrollbar-thumbColorY-active',
  },
} as const;

/**
 * 値: ハンドルの太さ
 */
export const varScrollbarThumbSize = {
  x: {
    base: '--lx-scroll-scrollbar-thumbSizeX',
    hover: '--lx-scroll-scrollbar-thumbSizeX-hover',
    active: '--lx-scroll-scrollbar-thumbSizeX-active',
  },
  y: {
    base: '--lx-scroll-scrollbar-thumbSizeY',
    hover: '--lx-scroll-scrollbar-thumbSizeY-hover',
    active: '--lx-scroll-scrollbar-thumbSizeY-active',
  },
} as const;

/**
 * 値: ハンドルの角丸
 */
export const varScrollbarThumbRadius = {
  x: {
    base: '--lx-scroll-scrollbar-thumbRadiusX',
    hover: '--lx-scroll-scrollbar-thumbRadiusX-hover',
    active: '--lx-scroll-scrollbar-thumbRadiusX-active',
  },
  y: {
    base: '--lx-scroll-scrollbar-thumbRadiusY',
    hover: '--lx-scroll-scrollbar-thumbRadiusY-hover',
    active: '--lx-scroll-scrollbar-thumbRadiusY-active',
  },
} as const;

/**
 * 値: ハンドルの線の色
 */
export const varScrollbarThumbBorderColor = {
  x: {
    base: '--lx-scroll-scrollbar-thumbBorderColorX',
    hover: '--lx-scroll-scrollbar-thumbBorderColorX-hover',
    active: '--lx-scroll-scrollbar-thumbBorderColorX-active',
  },
  y: {
    base: '--lx-scroll-scrollbar-thumbBorderColorY',
    hover: '--lx-scroll-scrollbar-thumbBorderColorY-hover',
    active: '--lx-scroll-scrollbar-thumbBorderColorY-active',
  },
} as const;

/**
 * 値: ハンドルの線の幅
 */
export const varScrollbarThumbBorderWidth = {
  x: {
    base: '--lx-scroll-scrollbar-thumbBorderWidthX',
    hover: '--lx-scroll-scrollbar-thumbBorderWidthX-hover',
    active: '--lx-scroll-scrollbar-thumbBorderWidthX-active',
  },
  y: {
    base: '--lx-scroll-scrollbar-thumbBorderWidthY',
    hover: '--lx-scroll-scrollbar-thumbBorderWidthY-hover',
    active: '--lx-scroll-scrollbar-thumbBorderWidthY-active',
  },
} as const;

/**
 * 値: トラックの色
 */
export const varScrollbarTrackColor = {
  x: {
    base: '--lx-scroll-scrollbar-trackColorX',
    hover: '--lx-scroll-scrollbar-trackColorX-hover',
  },
  y: {
    base: '--lx-scroll-scrollbar-trackColorY',
    hover: '--lx-scroll-scrollbar-trackColorY-hover',
  },
} as const;

/**
 * 値: スクロールバーのトラックの幅
 */
export const varScrollbarTrackSize = {
  x: {
    base: '--lx-scroll-scrollbar-trackSizeX',
    hover: '--lx-scroll-scrollbar-trackSizeX-hover',
  },
  y: {
    base: '--lx-scroll-scrollbar-trackSizeY',
    hover: '--lx-scroll-scrollbar-trackSizeY-hover',
  },
} as const;

/**
 * 値: フォールバック（非WebKit）スクロールバーの幅プリセット
 */
export const varScrollbarFallbackSize = '--lx-scroll-scrollbar-fallbackSize';

// state
export const thumbStates = ['hover', 'active'] as const;
export const trackStates = ['hover'] as const;
