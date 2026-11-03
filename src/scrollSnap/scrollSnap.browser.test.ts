import { afterEach, describe, expect, it } from 'vitest';
import type { ScrollStyle } from '../types';
import scrollSnap from './scrollSnap';
import './styles.scss';

const containers: HTMLElement[] = [];

afterEach(() => {
  for (const container of containers.splice(0)) {
    container.remove();
  }
});

/**
 * スナップするコンテナーを作り、スタイルを適用する
 */
function createContainer(
  { className, style }: ScrollStyle,
  itemClassName = '',
): { container: HTMLElement; item: HTMLElement } {
  const container = document.createElement('div');
  container.className = className ?? '';
  for (const [key, value] of Object.entries(style ?? {})) {
    if (value !== undefined) {
      container.style.setProperty(key, value);
    }
  }
  const item = document.createElement('div');
  item.className = itemClassName;
  container.append(item);
  document.body.append(container);
  containers.push(container);
  return { container, item };
}

describe('scrollSnap（CSS）', () => {
  it('axis と align を指定するとコンテナーと子要素に適用される', () => {
    const { container, item } = createContainer(
      scrollSnap({ axis: 'y', align: 'start', stop: 'always' }),
    );
    expect(getComputedStyle(container).scrollSnapType).toBe('y mandatory');
    expect(getComputedStyle(item).scrollSnapAlign).toBe('start');
    expect(getComputedStyle(item).scrollSnapStop).toBe('always');
  });

  it('margin だけを指定しても、子要素の scroll-snap-align は上書きされない', () => {
    const style = document.createElement('style');
    style.textContent = '.item { scroll-snap-align: center; }';
    document.head.append(style);
    try {
      const { item } = createContainer(
        scrollSnap({ axis: 'y', margin: 8 }),
        'item',
      );
      expect(getComputedStyle(item).scrollSnapAlign).toBe('center');
      expect(getComputedStyle(item).scrollMarginTop).toBe('8px');
    } finally {
      style.remove();
    }
  });

  it('子要素に付けたクラスで align を個別に上書きできる', () => {
    const style = document.createElement('style');
    style.textContent = '.item { scroll-snap-align: end; }';
    document.head.append(style);
    try {
      const { item } = createContainer(
        scrollSnap({ axis: 'y', align: 'start' }),
        'item',
      );
      expect(getComputedStyle(item).scrollSnapAlign).toBe('end');
    } finally {
      style.remove();
    }
  });

  it('軸ごとの margin は全辺の margin より優先される', () => {
    const { item } = createContainer(
      scrollSnap({ margin: 4, y: { margin: 16 } }),
    );
    expect(getComputedStyle(item).scrollMarginLeft).toBe('4px');
    expect(getComputedStyle(item).scrollMarginTop).toBe('16px');
  });

  it('軸ごとの padding は全辺の padding より優先される', () => {
    const { container } = createContainer(
      scrollSnap({ padding: 4, x: { padding: 10 } }),
    );
    expect(getComputedStyle(container).scrollPaddingTop).toBe('4px');
    expect(getComputedStyle(container).scrollPaddingLeft).toBe('10px');
  });
});
