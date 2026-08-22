import chroma from 'chroma-js';
import type { ScrollSnapOptions } from '../../src/scroll-snap';
import { scrollSnap } from '../../src/scroll-snap';
import assignStyle from './assignStyle';

export type SnapDebugOptions = {
  containerWidth?: number;
  containerHeight?: number;
  itemCount?: number;
};

/**
 * スクロールスナップのプレビュー用コンテナを生成する。
 *
 * @param containerOptions - scrollSnap() に渡すオプション（アイテムオプションも含む）
 * @param debugOptions - プレビュー表示用の設定
 */
export default function createSnapContainer(
  containerOptions: ScrollSnapOptions,
  debugOptions: SnapDebugOptions = {},
): HTMLElement {
  const {
    containerWidth = 400,
    containerHeight = 300,
    itemCount = 5,
  } = debugOptions;

  const axis = containerOptions.axis ?? 'y';
  const isHorizontal = axis === 'x';
  const isBoth = axis === 'both';

  // ─── スクロールコンテナ ───────────────────────────────────────────
  const container = document.createElement('div');

  const { className: containerClass, style: containerStyle } =
    scrollSnap(containerOptions);
  if (containerClass) container.className = containerClass;

  assignStyle(container, {
    ...(containerStyle ?? {}),
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflowX: isHorizontal || isBoth ? 'scroll' : 'hidden',
    overflowY: !isHorizontal || isBoth ? 'scroll' : 'hidden',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '6px',
    boxSizing: 'border-box',
  });

  // ─── アイテムレイアウト ───────────────────────────────────────────
  const inner = document.createElement('div');

  if (isBoth) {
    const cols = Math.ceil(Math.sqrt(itemCount));
    assignStyle(inner, {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${containerWidth}px)`,
      gridAutoRows: `${containerHeight}px`,
    });
  } else {
    assignStyle(inner, {
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
    });
  }

  // ─── スナップアイテム ─────────────────────────────────────────────
  const colors = chroma
    .scale(['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'])
    .colors(itemCount);

  colors.forEach((color, i) => {
    const item = document.createElement('div');

    assignStyle(item, {
      flexShrink: '0',
      width: isHorizontal || isBoth ? `${containerWidth}px` : '100%',
      height: !isHorizontal || isBoth ? `${containerHeight}px` : '100%',
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.9)',
      fontSize: '32px',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      boxSizing: 'border-box',
    });

    item.textContent = String(i + 1);
    inner.appendChild(item);
  });

  container.appendChild(inner);

  // ─── 外枠 ─────────────────────────────────────────────────────────
  const base = document.createElement('div');
  assignStyle(base, { padding: '24px', display: 'inline-block' });
  base.appendChild(container);

  return base;
}
