import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import type { ScrollStyle } from '../types';
import scrollbar from './scrollbar';
import './styles.scss';

const containers: HTMLElement[] = [];

afterEach(() => {
  for (const container of containers.splice(0)) {
    container.remove();
  }
});

/**
 * 縦横にスクロールするコンテナーを作り、スタイルを適用する
 */
function createContainer({ className, style }: ScrollStyle): HTMLElement {
  const container = document.createElement('div');
  container.className = className ?? '';
  container.style.width = '100px';
  container.style.height = '100px';
  container.style.overflow = 'scroll';
  for (const [key, value] of Object.entries(style ?? {})) {
    if (value !== undefined) {
      container.style.setProperty(key, value);
    }
  }
  const content = document.createElement('div');
  content.style.width = '300px';
  content.style.height = '300px';
  container.append(content);
  document.body.append(container);
  containers.push(container);
  return container;
}

/**
 * 縦スクロールバーのトラックの幅
 */
function getTrackSizeY(container: HTMLElement): number {
  return container.offsetWidth - container.clientWidth;
}

/**
 * 横スクロールバーのトラックの幅
 */
function getTrackSizeX(container: HTMLElement): number {
  return container.offsetHeight - container.clientHeight;
}

function getVariable(container: HTMLElement, name: string): string {
  return getComputedStyle(container).getPropertyValue(name).trim();
}

describe('scrollbar（CSS）', () => {
  it('既定ではトラックの幅が 13px になる', () => {
    const container = createContainer(scrollbar());
    expect(getTrackSizeX(container)).toBe(13);
    expect(getTrackSizeY(container)).toBe(13);
  });

  it('trackSize に数値を指定するとトラックの幅になる', () => {
    const container = createContainer(
      scrollbar({ trackSize: 8, y: { trackSize: 16 } }),
    );
    expect(getTrackSizeX(container)).toBe(8);
    expect(getTrackSizeY(container)).toBe(16);
  });

  it('trackSize: "auto" ではトラックの幅が thumbSize と同じになる', () => {
    const container = createContainer(
      scrollbar({ thumbSize: 6, trackSize: 'auto' }),
    );
    expect(getTrackSizeX(container)).toBe(6);
    expect(getTrackSizeY(container)).toBe(6);
  });

  it('trackSize: "auto" ではトラックの幅が thumbSize + 2 × thumbBorderWidth になる', () => {
    const container = createContainer(
      scrollbar({ thumbSize: 6, thumbBorderWidth: 2, trackSize: 'auto' }),
    );
    expect(getTrackSizeX(container)).toBe(10);
    expect(getTrackSizeY(container)).toBe(10);
  });

  it('片方の軸だけ trackSize: "auto" にできる', () => {
    const container = createContainer(
      scrollbar({ thumbSize: 4, trackSize: 12, y: { trackSize: 'auto' } }),
    );
    expect(getTrackSizeX(container)).toBe(12);
    expect(getTrackSizeY(container)).toBe(4);
  });

  it('コンテナーへのホバーで trackSize の hover の値になる', async () => {
    const container = createContainer(
      scrollbar({ trackSize: { base: 8, hover: 12 }, noAnimation: true }),
    );
    expect(getTrackSizeY(container)).toBe(8);
    await userEvent.hover(container);
    expect(getTrackSizeY(container)).toBe(12);
  });

  it('trackSize: "auto" ではコンテナーへのホバーで thumbSize の hover に追従する', async () => {
    const container = createContainer(
      scrollbar({
        thumbSize: { base: 4, hover: 9 },
        trackSize: 'auto',
        noAnimation: true,
      }),
    );
    expect(getTrackSizeY(container)).toBe(4);
    await userEvent.hover(container);
    expect(getTrackSizeY(container)).toBe(9);
  });

  it('thumbRadius の値がステートを反映した変数に入る', () => {
    const container = createContainer(scrollbar({ thumbRadius: 3 }));
    expect(
      getVariable(container, '--frg-scroll-scrollbar-thumbRadiusY-state'),
    ).toBe('3px');
  });

  it('noAnimation 未指定では transition が設定される', () => {
    const container = createContainer(scrollbar());
    expect(getComputedStyle(container).transitionProperty).toContain(
      '--frg-scroll-scrollbar-trackSizeY-state',
    );
  });

  it('noAnimation: true では transition が設定されない', () => {
    const container = createContainer(scrollbar({ noAnimation: true }));
    expect(getComputedStyle(container).transitionProperty).toBe('all');
    expect(getComputedStyle(container).transitionDuration).toBe('0s');
  });
});
