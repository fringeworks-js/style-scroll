import chroma from 'chroma-js';
import scrollbar from '../../src/with-css/scrollbar';
import assignStyle from './assignStyle';
import createResizableElement from './createResizableElement';
import type { DebugOptions } from './types';

export default function createScrollContainer(
  options: Record<string, any>,
  debugOptions: DebugOptions = {},
) {
  const {
    containerWidth = 400,
    containerHeight = 300,
    containerBackground,
    overflowX,
    overflowY,
    disabled,
  } = debugOptions;

  const container = document.createElement('div');
  let containerStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflowX: overflowX === 'none' ? null : overflowX,
    overflowY: overflowY === 'none' ? null : overflowY,
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '4px',
    backgroundColor: containerBackground ?? '#f9fbfc',
  };
  if (!disabled) {
    const { className, style } = scrollbar(options);
    if (className) {
      container.className = className;
    }
    containerStyle = { ...containerStyle, ...style };
  } else {
    container.className = 'lx-scroll-disabled';
  }
  assignStyle(container, containerStyle);

  const inner = document.createElement('div');
  assignStyle(inner, {
    // width: '1200px',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 120px)',
    gridAutoRows: '120px',
    gap: '8px',
    padding: '16px',
    boxSizing: 'border-box',
  });

  const colors = chroma.scale(['#a9c6cf', '#ed8a0f']).colors(15);
  colors.forEach((color, i) => {
    const cell = document.createElement('div');
    cell.textContent = String(i + 1);
    assignStyle(cell, {
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(0,0,0,0.4)',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      borderRadius: '4px',
    });
    inner.appendChild(cell);
  });

  container.appendChild(inner);

  const { wrapper } = createResizableElement({
    element: container,
    initialWidth: containerWidth,
    initialHeight: containerHeight,
  });
  assignStyle(wrapper, { paddingRight: '8px', paddingBottom: '8px' });

  const base = document.createElement('div');
  assignStyle(base, { padding: '24px' });
  base.appendChild(wrapper);

  return base;
}
