import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { ScrollbarOptions } from '../../src/scrollbar';
import createScrollContainer from '../_internal/createScrollContainer';
import type { DebugOptions } from '../_internal/types';

/**
 * Storybook用のフラットなオプション型。
 * StyleState<T, 'hover'> プロパティはbase/hoverを個別のコントロールとして分離する。
 */
type ScrollbarStoryOptions = {
  thumbSize?: number;
  thumbSizeX?: number;
  thumbSizeY?: number;
  thumbSizeHover?: number;
  thumbSizeXHover?: number;
  thumbSizeYHover?: number;
  thumbSizeActive?: number;
  thumbSizeXActive?: number;
  thumbSizeYActive?: number;
  thumbColor?: string;
  thumbColorX?: string;
  thumbColorY?: string;
  thumbColorHover?: string;
  thumbColorXHover?: string;
  thumbColorYHover?: string;
  thumbColorActive?: string;
  thumbColorXActive?: string;
  thumbColorYActive?: string;
  thumbRadius?: string | 'full' | 'none';
  thumbRadiusX?: string | 'full' | 'none';
  thumbRadiusY?: string | 'full' | 'none';
  thumbRadiusHover?: string | 'full' | 'none';
  thumbRadiusXHover?: string | 'full' | 'none';
  thumbRadiusYHover?: string | 'full' | 'none';
  thumbRadiusActive?: string | 'full' | 'none';
  thumbRadiusXActive?: string | 'full' | 'none';
  thumbRadiusYActive?: string | 'full' | 'none';
  thumbBorderColor?: string;
  thumbBorderColorX?: string;
  thumbBorderColorY?: string;
  thumbBorderColorHover?: string;
  thumbBorderColorXHover?: string;
  thumbBorderColorYHover?: string;
  thumbBorderColorActive?: string;
  thumbBorderColorXActive?: string;
  thumbBorderColorYActive?: string;
  thumbBorderWidth?: string | 'auto';
  thumbBorderWidthX?: string | 'auto';
  thumbBorderWidthY?: string | 'auto';
  thumbBorderWidthHover?: string | 'auto';
  thumbBorderWidthXHover?: string | 'auto';
  thumbBorderWidthYHover?: string | 'auto';
  thumbBorderWidthActive?: string | 'auto';
  thumbBorderWidthXActive?: string | 'auto';
  thumbBorderWidthYActive?: string | 'auto';
  trackColor?: string;
  trackColorX?: string;
  trackColorY?: string;
  trackColorHover?: string;
  trackColorXHover?: string;
  trackColorYHover?: string;
  trackSize?: string | 'auto';
  trackSizeX?: string | 'auto';
  trackSizeY?: string | 'auto';
  trackSizeHover?: string | 'auto';
  trackSizeXHover?: string | 'auto';
  trackSizeYHover?: string | 'auto';
  fallbackSize?: 'auto' | 'thin' | 'none';
  arrows?: boolean;
  noAnimationSize?: boolean;
  noAnimationColor?: boolean;
};

type StoryOptions = ScrollbarStoryOptions & DebugOptions;

function toNumber(value: any): any {
  if (value == null || value === '') {
    return undefined;
  }
  const num = Number(value);
  if (!isNaN(num)) {
    return num;
  }
  return value;
}

function toStyleState<T>(
  base?: T,
  hover?: T,
  active?: T,
): T | { base?: T; hover?: T; active?: T } | undefined {
  if (hover === undefined && active === undefined) {
    return base;
  }
  return { base, hover, active };
}

function toNumberStyleState(
  base?: string,
  hover?: string,
  active?: string,
): any | { base?: any; hover?: any; active?: any } | undefined {
  if (hover === undefined && active === undefined) {
    return toNumber(base);
  }
  return {
    base: toNumber(base),
    hover: toNumber(hover),
    active: toNumber(active),
  };
}

function toScrollbarOptions(opts: ScrollbarStoryOptions): ScrollbarOptions {
  const {
    thumbSize,
    thumbSizeX,
    thumbSizeY,
    thumbSizeHover,
    thumbSizeXHover,
    thumbSizeYHover,
    thumbSizeActive,
    thumbSizeXActive,
    thumbSizeYActive,
    thumbColor,
    thumbColorX,
    thumbColorY,
    thumbColorHover,
    thumbColorXHover,
    thumbColorYHover,
    thumbColorActive,
    thumbColorXActive,
    thumbColorYActive,
    thumbRadius,
    thumbRadiusX,
    thumbRadiusY,
    thumbRadiusHover,
    thumbRadiusXHover,
    thumbRadiusYHover,
    thumbRadiusActive,
    thumbRadiusXActive,
    thumbRadiusYActive,
    thumbBorderColor,
    thumbBorderColorX,
    thumbBorderColorY,
    thumbBorderColorHover,
    thumbBorderColorXHover,
    thumbBorderColorYHover,
    thumbBorderColorActive,
    thumbBorderColorXActive,
    thumbBorderColorYActive,
    thumbBorderWidth,
    thumbBorderWidthX,
    thumbBorderWidthY,
    thumbBorderWidthHover,
    thumbBorderWidthXHover,
    thumbBorderWidthYHover,
    thumbBorderWidthActive,
    thumbBorderWidthXActive,
    thumbBorderWidthYActive,
    trackColor,
    trackColorX,
    trackColorY,
    trackColorHover,
    trackColorXHover,
    trackColorYHover,
    trackSize,
    trackSizeX,
    trackSizeY,
    trackSizeHover,
    trackSizeXHover,
    trackSizeYHover,
    noAnimationSize,
    noAnimationColor,
    ...rest
  } = opts;

  return {
    ...rest,
    thumbColor: toStyleState(thumbColor, thumbColorHover, thumbColorActive),
    thumbColorX: toStyleState(thumbColorX, thumbColorXHover, thumbColorXActive),
    thumbColorY: toStyleState(thumbColorY, thumbColorYHover, thumbColorYActive),
    thumbSize: toStyleState(thumbSize, thumbSizeHover, thumbSizeActive),
    thumbSizeX: toStyleState(thumbSizeX, thumbSizeXHover, thumbSizeXActive),
    thumbSizeY: toStyleState(thumbSizeY, thumbSizeYHover, thumbSizeYActive),
    thumbRadius: toNumberStyleState(
      thumbRadius,
      thumbRadiusHover,
      thumbRadiusActive,
    ),
    thumbRadiusX: toNumberStyleState(
      thumbRadiusX,
      thumbRadiusXHover,
      thumbRadiusXActive,
    ),
    thumbRadiusY: toNumberStyleState(
      thumbRadiusY,
      thumbRadiusYHover,
      thumbRadiusYActive,
    ),
    thumbBorderColor: toStyleState(thumbBorderColor, thumbBorderColorHover),
    thumbBorderColorX: toStyleState(thumbBorderColorX, thumbBorderColorXHover),
    thumbBorderColorY: toStyleState(thumbBorderColorY, thumbBorderColorYHover),
    thumbBorderWidth: toNumberStyleState(
      thumbBorderWidth,
      thumbBorderWidthHover,
      thumbBorderWidthActive,
    ),
    thumbBorderWidthX: toNumberStyleState(
      thumbBorderWidthX,
      thumbBorderWidthXHover,
      thumbBorderWidthXActive,
    ),
    thumbBorderWidthY: toNumberStyleState(
      thumbBorderWidthY,
      thumbBorderWidthYHover,
      thumbBorderWidthYActive,
    ),
    trackColor: toStyleState(trackColor, trackColorHover),
    trackColorX: toStyleState(trackColorX, trackColorXHover),
    trackColorY: toStyleState(trackColorY, trackColorYHover),
    trackSize: toNumberStyleState(trackSize, trackSizeHover),
    trackSizeX: toNumberStyleState(trackSizeX, trackSizeXHover),
    trackSizeY: toNumberStyleState(trackSizeY, trackSizeYHover),
    noAnimation: toNoAnimation(noAnimationSize, noAnimationColor),
  };
}

function toNoAnimation(
  size?: boolean,
  color?: boolean,
): ScrollbarOptions['noAnimation'] {
  if (!size && !color) return undefined;
  if (size && color) return true;
  return { size, color };
}

const ARG_TYPES: ArgTypes<StoryOptions> = {
  thumbColor: { control: 'color' },
  thumbColorX: { control: 'color' },
  thumbColorY: { control: 'color' },
  thumbColorHover: { control: 'color' },
  thumbColorXHover: { control: 'color' },
  thumbColorYHover: { control: 'color' },
  thumbColorActive: { control: 'color' },
  thumbColorXActive: { control: 'color' },
  thumbColorYActive: { control: 'color' },
  thumbSize: { control: 'number' },
  thumbSizeX: { control: 'number' },
  thumbSizeY: { control: 'number' },
  thumbSizeHover: { control: 'number' },
  thumbSizeXHover: { control: 'number' },
  thumbSizeYHover: { control: 'number' },
  thumbSizeActive: { control: 'number' },
  thumbSizeXActive: { control: 'number' },
  thumbSizeYActive: { control: 'number' },
  thumbRadius: { control: 'text', description: 'number | "auto"' },
  thumbRadiusX: { control: 'text', description: 'number | "auto"' },
  thumbRadiusY: { control: 'text', description: 'number | "auto"' },
  thumbRadiusHover: { control: 'text', description: 'number | "auto"' },
  thumbRadiusXHover: { control: 'text', description: 'number | "auto"' },
  thumbRadiusYHover: { control: 'text', description: 'number | "auto"' },
  thumbRadiusActive: { control: 'text', description: 'number | "auto"' },
  thumbRadiusXActive: { control: 'text', description: 'number | "auto"' },
  thumbRadiusYActive: { control: 'text', description: 'number | "auto"' },
  thumbBorderColor: { control: 'color' },
  thumbBorderColorX: { control: 'color' },
  thumbBorderColorY: { control: 'color' },
  thumbBorderColorHover: { control: 'color' },
  thumbBorderColorXHover: { control: 'color' },
  thumbBorderColorYHover: { control: 'color' },
  thumbBorderColorActive: { control: 'color' },
  thumbBorderColorXActive: { control: 'color' },
  thumbBorderColorYActive: { control: 'color' },
  thumbBorderWidth: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthX: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthY: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthHover: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthXHover: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthYHover: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthActive: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthXActive: { control: 'text', description: 'number | "auto"' },
  thumbBorderWidthYActive: { control: 'text', description: 'number | "auto"' },
  trackSize: { control: 'text', description: 'number | "auto"' },
  trackSizeX: { control: 'text', description: 'number | "auto"' },
  trackSizeY: { control: 'text', description: 'number | "auto"' },
  trackSizeHover: { control: 'text', description: 'number | "auto"' },
  trackSizeXHover: { control: 'text', description: 'number | "auto"' },
  trackSizeYHover: { control: 'text', description: 'number | "auto"' },
  trackColor: { control: 'color' },
  trackColorX: { control: 'color' },
  trackColorY: { control: 'color' },
  trackColorHover: { control: 'color' },
  trackColorXHover: { control: 'color' },
  trackColorYHover: { control: 'color' },
  fallbackSize: {
    control: 'select',
    options: ['auto', 'thin', 'none'],
    description: 'Non-WebKit only (CSS scrollbar-width)',
  },
  arrows: { control: 'boolean' },
  noAnimationSize: {
    control: 'boolean',
    description:
      'Disable size transitions (thumbSize, trackSize, thumbBorderWidth)',
  },
  noAnimationColor: {
    control: 'boolean',
    description:
      'Disable color transitions (thumbColor, trackColor, thumbBorderColor)',
  },
  containerWidth: { control: 'number' },
  containerHeight: { control: 'number' },
  containerBackground: { control: 'color' },
  overflowX: {
    control: 'select',
    options: ['visible', 'hidden', 'clip', 'scroll', 'auto', 'none'],
  },
  overflowY: {
    control: 'select',
    options: ['visible', 'hidden', 'clip', 'scroll', 'auto', 'none'],
  },
};

const meta = {
  title: 'scrollbar',
  render: ({
    containerWidth,
    containerHeight,
    containerBackground,
    overflowX,
    overflowY,
    disabled,
    ...storyOptions
  }) =>
    createScrollContainer(toScrollbarOptions(storyOptions), {
      containerWidth,
      containerHeight,
      containerBackground,
      overflowX,
      overflowY,
      disabled,
    }),
  args: {
    overflowX: 'auto',
    overflowY: 'auto',
  },
} satisfies Meta<StoryOptions>;

export default meta;
type Story = StoryObj<StoryOptions>;

// デフォルトスタイル（全オプション未指定）
export const Default: Story = {
  argTypes: ARG_TYPES,
  args: {},
};

// カラーカスタマイズのサンプル
export const Playground: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbColor: 'rgba(233, 196, 106, 0.9)',
    thumbColorHover: 'rgba(244, 162, 97, 0.9)',
    thumbColorActive: 'rgba(231, 111, 81, 0.9)',
    trackColor: 'rgba(42, 157, 143, 0.2)',
    thumbSize: 9,
    thumbRadius: '8',
  },
};

// 細いthumb・ホバーで拡大しない
export const Thin: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 4,
    thumbBorderWidth: '1',
    trackSize: 'auto',
  },
};

// 角丸なし
export const NoRounding: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbRadius: 'none',
  },
};

// ダーク背景
export const DarkBackground: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbColor: 'rgba(255, 255, 255, 0.35)',
    thumbColorHover: 'rgba(255, 255, 255, 0.7)',
    thumbColorActive: 'rgba(255, 255, 255, 0.9)',
    trackColor: 'rgba(255, 255, 255, 0.08)',
    containerBackground: '#1a1a2e',
  },
};

// X軸・Y軸で異なるthumbサイズ（ホバーで拡大しない）
export const IndividualSize: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSizeX: 6,
    thumbSizeY: 12,
    trackSizeX: '10',
    trackSizeY: '16',
  },
};

// ホバーでthumb・トラックが拡大（auto trackモード）
export const ExpandOnHover: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 4,
    thumbSizeHover: 9,
    thumbSizeActive: 9,
    thumbBorderWidth: '0',
    thumbBorderWidthHover: '2',
    thumbBorderWidthActive: '2',
    trackSize: 'auto',
  },
};

// ホバーでX軸・Y軸が異なる幅に拡大（auto trackモード）
export const ExpandOnHoverIndividual: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSizeX: 4,
    thumbSizeXHover: 6,
    thumbSizeXActive: 6,
    thumbSizeY: 4,
    thumbSizeYHover: 16,
    thumbSizeYActive: 16,
    thumbBorderWidth: '0',
    thumbBorderWidthHover: '2',
    thumbBorderWidthActive: '2',
    trackSize: 'auto',
  },
};

// thumbが拡大してもトラック幅を固定
export const FixedTrack: Story = {
  argTypes: ARG_TYPES,
  args: {
    trackSize: '21',
    thumbSize: 9,
    thumbSizeHover: 13,
    thumbSizeActive: 17,
  },
};

// X軸・Y軸で異なる固定トラック幅
export const FixedTrackIndividual: Story = {
  argTypes: ARG_TYPES,
  args: {
    trackSizeX: '21',
    trackSizeY: '11',
    thumbSizeX: 9,
    thumbSizeY: 5,
    thumbSizeXHover: 13,
    thumbSizeYHover: 7,
    thumbSizeXActive: 17,
    thumbSizeYActive: 9,
  },
};

// 矢印ボタン表示
export const WithArrows: Story = {
  argTypes: ARG_TYPES,
  args: {
    arrows: true,
  },
};

// 矢印ボタン非表示
export const WithoutArrows: Story = {
  argTypes: ARG_TYPES,
  args: {
    arrows: false,
  },
};

// コンテナ・thumbホバーで3段階の色変化（thumbColorActiveはinstant change）
export const ThumbHover: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbColor: 'rgba(0, 0, 0, 0.2)',
    thumbColorHover: 'rgba(0, 0, 0, 0.35)',
    thumbColorActive: 'rgb(237, 138, 15)',
  },
};

// ホバーするまでスクロールバーを非表示（auto trackモード）
export const HiddenUntilHover: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 0,
    thumbSizeHover: 7,
    thumbSizeActive: 7,
    trackSize: '0',
    trackSizeHover: '13',
  },
};

// 非WebKitブラウザでネイティブスクロールバーを非表示
// WebKitブラウザではカスタムスクロールバーが引き続き表示される
export const FallbackHidden: Story = {
  argTypes: ARG_TYPES,
  args: {
    fallbackSize: 'none',
  },
};

// 全アニメーション無効（サイズ・色の変化が即時）
export const NoAnimation: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 5,
    thumbSizeHover: 11,
    thumbSizeActive: 17,
    thumbBorderWidth: '2',
    trackSize: 'auto',
    thumbColor: 'rgb(169, 198, 207)',
    thumbColorHover: 'rgb(203, 168, 111)',
    thumbColorActive: 'rgb(237, 138, 15)',
    noAnimationSize: true,
    noAnimationColor: true,
  },
};

// サイズ系アニメーション無効（拡縮は即時・色の変化はふわっと）
export const NoAnimationSize: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 5,
    thumbSizeHover: 11,
    thumbSizeActive: 17,
    thumbBorderWidth: '2',
    trackSize: 'auto',
    thumbColor: 'rgb(169, 198, 207)',
    thumbColorHover: 'rgb(203, 168, 111)',
    thumbColorActive: 'rgb(237, 138, 15)',
    noAnimationSize: true,
  },
};

// カラー系アニメーション無効（色の変化は即時・拡縮はアニメーション）
export const NoAnimationColor: Story = {
  argTypes: ARG_TYPES,
  args: {
    thumbSize: 5,
    thumbSizeHover: 11,
    thumbSizeActive: 17,
    thumbBorderWidth: '2',
    trackSize: 'auto',
    thumbColor: 'rgb(169, 198, 207)',
    thumbColorHover: 'rgb(203, 168, 111)',
    thumbColorActive: 'rgb(237, 138, 15)',
    noAnimationColor: true,
  },
};

// スクロールバー無効（ネイティブデフォルト）
export const Disabled: Story = {
  argTypes: ARG_TYPES,
  args: {
    disabled: true,
  },
};
