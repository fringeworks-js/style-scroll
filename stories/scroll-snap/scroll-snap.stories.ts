import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { ScrollSnapOptions, SnapAlign, SnapAxis, SnapBehavior, SnapStop, SnapStrictness } from '../../src/scroll-snap';
import type { SnapDebugOptions } from '../_internal/createSnapContainer';
import createSnapContainer from '../_internal/createSnapContainer';

type StoryArgs = {
  // コンテナオプション
  axis?: SnapAxis;
  strictness?: SnapStrictness;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  behavior?: SnapBehavior;
  // アイテムオプション（> * に一括適用）
  align?: SnapAlign;
  alignX?: SnapAlign;
  alignY?: SnapAlign;
  stop?: SnapStop;
  margin?: number;
  marginX?: number;
  marginY?: number;
  // デバッグオプション
  containerWidth?: number;
  containerHeight?: number;
  itemCount?: number;
};

function toOptions(args: StoryArgs): {
  containerOptions: ScrollSnapOptions;
  debugOptions: SnapDebugOptions;
} {
  const {
    axis,
    strictness,
    padding,
    paddingX,
    paddingY,
    behavior,
    align,
    alignX,
    alignY,
    stop,
    margin,
    marginX,
    marginY,
    containerWidth,
    containerHeight,
    itemCount,
  } = args;

  return {
    containerOptions: {
      axis,
      strictness,
      padding,
      paddingX,
      paddingY,
      behavior,
      align,
      alignX,
      alignY,
      stop,
      margin,
      marginX,
      marginY,
    },
    debugOptions: { containerWidth, containerHeight, itemCount },
  };
}

const ARG_TYPES: ArgTypes<StoryArgs> = {
  axis: {
    control: 'select',
    options: ['x', 'y', 'both', 'none'],
    description: 'scroll-snap-type の軸（スナップ方向）',
  },
  strictness: {
    control: 'radio',
    options: ['mandatory', 'proximity'],
    description: 'scroll-snap-type の厳密さ',
  },
  padding: {
    control: 'number',
    description: 'scroll-padding（全辺、px）',
  },
  paddingX: {
    control: 'number',
    description: 'scroll-padding-inline（横方向、px）',
  },
  paddingY: {
    control: 'number',
    description: 'scroll-padding-block（縦方向、px）',
  },
  behavior: {
    control: 'select',
    options: ['auto', 'smooth', 'instant'],
    description: 'scroll-behavior',
  },
  align: {
    control: 'radio',
    options: ['start', 'center', 'end', 'none'],
    description: 'scroll-snap-align（縦横共通、> * に一括適用）',
  },
  alignX: {
    control: 'select',
    options: ['start', 'center', 'end', 'none'],
    description: 'scroll-snap-align の横軸（インライン軸、> * に一括適用）',
  },
  alignY: {
    control: 'select',
    options: ['start', 'center', 'end', 'none'],
    description: 'scroll-snap-align の縦軸（ブロック軸、> * に一括適用）',
  },
  stop: {
    control: 'radio',
    options: ['normal', 'always'],
    description: 'scroll-snap-stop（> * に一括適用）',
  },
  margin: {
    control: 'number',
    description: 'scroll-margin（全辺、px、> * に一括適用）',
  },
  marginX: {
    control: 'number',
    description: 'scroll-margin-inline（横方向、px、> * に一括適用）',
  },
  marginY: {
    control: 'number',
    description: 'scroll-margin-block（縦方向、px、> * に一括適用）',
  },
  containerWidth: { control: 'number' },
  containerHeight: { control: 'number' },
  itemCount: { control: 'number' },
};

const meta = {
  title: 'scroll-snap',
  render: (args) => {
    const { containerOptions, debugOptions } = toOptions(args);
    return createSnapContainer(containerOptions, debugOptions);
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

// 縦方向スナップ（フルページ）
export const Vertical: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'mandatory',
    align: 'start',
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// 横方向スナップ（カルーセル）
export const Horizontal: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'x',
    strictness: 'mandatory',
    align: 'start',
    containerWidth: 400,
    containerHeight: 220,
    itemCount: 5,
  },
};

// 縦横両方向スナップ（2Dグリッド）
export const Both: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'both',
    strictness: 'mandatory',
    align: 'start',
    containerWidth: 300,
    containerHeight: 200,
    itemCount: 6,
  },
};

// 中央揃えスナップ
export const CenterAlign: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'mandatory',
    align: 'center',
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// proximity モード（緩いスナップ）
export const Proximity: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'proximity',
    align: 'start',
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// paddingY 付き（固定ヘッダー対応）
export const WithPaddingY: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'mandatory',
    align: 'start',
    paddingY: 60,
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// stop: always（スナップポイントを飛ばせない）
export const StopAlways: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'mandatory',
    align: 'start',
    stop: 'always',
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// marginY 付き
export const WithMarginY: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'y',
    strictness: 'mandatory',
    align: 'start',
    marginY: 16,
    containerWidth: 400,
    containerHeight: 300,
    itemCount: 5,
  },
};

// X軸・Y軸で揃え位置を個別指定
export const IndividualAlign: Story = {
  argTypes: ARG_TYPES,
  args: {
    axis: 'both',
    strictness: 'mandatory',
    alignX: 'center',
    alignY: 'start',
    containerWidth: 300,
    containerHeight: 200,
    itemCount: 6,
  },
};
