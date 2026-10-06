# @fringeworks/style-scroll

`@fringeworks/style-scroll` is a library some will find handy, specialized in controlling scroll-related styles via CSS.\
It returns class names and CSS variables as an object based on the provided options. Framework-agnostic and SSR-compatible.

**[日本語版READMEはこちら](./README.ja.md)**

## Features

- Framework-agnostic (works in any JS environment)
- SSR-compatible (simply returns class names and inline style objects)
- Full TypeScript support

## Installation

```bash
npm install @fringeworks/style-scroll
# or
pnpm add @fringeworks/style-scroll
```

## Usage

Each style function returns a `{ className, style }` object. Apply it to the target element.

```ts
import { scrollbar } from '@fringeworks/style-scroll';

const { className, style } = scrollbar({
  thumbSize: 6,
  thumbColor: 'rgba(0, 0, 0, 0.3)',
  trackColor: 'rgba(0, 0, 0, 0.05)',
});

// className: "lx-scroll-scrollbar ..."
// style: { "--lx-scroll-scrollbar-thumbSizeX": "6px", ... }
```

```html
<div
  class="lx-scroll-scrollbar ..."
  style="--lx-scroll-scrollbar-thumbSizeX: 6px; ..."
>
  <!-- scrollable content -->
</div>
```

### Loading CSS

The functions do not import any CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
import { scrollbar } from '@fringeworks/style-scroll';

// Import all styles at once
import '@fringeworks/style-scroll/styles.css';

// Import only what you need
import '@fringeworks/style-scroll/scrollbar.css';
import '@fringeworks/style-scroll/scroll-snap.css';
```

If you want the CSS to be loaded automatically, use the modules under `with-css`. This requires a bundler that can handle CSS imports.

```ts
import { scrollbar, scrollSnap } from '@fringeworks/style-scroll/with-css';
```

### About `StyleState`

Many `scrollbar` options accept the `StyleState<T, S>` type. You can specify either a scalar value or a per-state object.

```ts
// Scalar: applies the same value to all states
thumbColor: 'rgba(0, 0, 0, 0.3)'

// Per-state object: specify values per state
thumbColor: {
  base: 'rgba(0, 0, 0, 0.3)',   // default state
  hover: 'rgba(0, 0, 0, 0.5)',  // when the container is hovered
  active: 'rgba(0, 0, 0, 0.7)', // when the thumb itself is hovered (WebKit only)
}

// Partial states are also valid (unspecified states are not set)
thumbColor: { hover: 'rgba(0, 0, 0, 0.5)' }
```

### Axis-specific and Common Options

For both `scrollbar` and `scrollSnap`, top-level options apply to both axes. To set different values per axis, override them under `x` (horizontal) or `y` (vertical).\
The options accepted by `x` and `y` are `ScrollbarAxisOptions` and `ScrollSnapAxisOptions` respectively.

```ts
scrollbar({
  thumbColor: 'rgba(0, 0, 0, 0.3)', // common for both axes
  x: { thumbColor: 'rgba(0, 0, 255, 0.3)' }, // overrides horizontal only
});

scrollSnap({
  align: 'start', // common for both axes
  x: { align: 'center' }, // overrides horizontal only
});
```

For options that accept `StyleState`, axis-specific values take precedence per state; unspecified states fall back to the common value.

```ts
scrollbar({
  thumbColor: { base: 'rgba(0,0,0,0.3)', hover: 'rgba(0,0,0,0.5)' },
  // x has no hover, so horizontal hover falls back to thumbColor's hover
  x: { thumbColor: { base: 'rgba(0,0,255,0.3)' } },
});
```

## Style Types

### `scrollbar`

Customizes the appearance of the scrollbar.

In WebKit browsers (Chrome, Edge, Safari), full customization via `::-webkit-scrollbar` is available.\
In non-WebKit browsers (Firefox), a fallback using `scrollbar-width` / `scrollbar-color` is applied.

```ts
import { scrollbar } from '@fringeworks/style-scroll';

const { className, style } = scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.2)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.6)',
  },
  thumbSize: { base: 5, hover: 9 },
  trackColor: 'rgba(128, 128, 128, 0.04)',
  thumbRadius: 'full',
  thumbBorderWidth: 2,
  thumbBorderColor: 'transparent',
});
```

#### CSS Default Values (WebKit)

These are the CSS defaults when no option is specified.

| Property           | Default Value               |
| ------------------ | --------------------------- |
| `thumbSize`        | `5` (normal) / `9` (hover)  |
| `thumbColor`       | `rgba(0, 0, 0, 0.1)`        |
| `thumbColor.hover` | `rgba(0, 0, 0, 0.3)`        |
| `trackColor`       | `rgba(128, 128, 128, 0.04)` |
| `thumbRadius`      | `'full'` (9999px)           |
| `thumbBorderWidth` | `2`                         |
| `thumbBorderColor` | `transparent`               |

### `scrollSnap`

Configures scroll snapping. Apply it to the scroll container.\
`align`, `stop` and `margin` are applied to all direct children (`> *`) at once.

```ts
import { scrollSnap } from '@fringeworks/style-scroll';

// Scroll vertically and snap to the start of each child
const { className, style } = scrollSnap({ axis: 'y', align: 'start' });
```

To enable snapping, specify both `axis` and `align`. Both default to `none`, so nothing snaps when they are omitted.

#### Per-child settings

To use a different alignment (or other setting) for a specific child, set the CSS property directly in that child's inline style. Inline styles take precedence over the styles applied via `> *`.

```html
<div class="lx-scroll-snap ..." style="...">
  <div>...</div>
  <div style="scroll-snap-align: center">...</div>
</div>
```

## `scrollbar` Options (`ScrollbarOptions`)

All Thumb and Track options can also be specified per axis under `x` / `y` (see [Axis-specific and Common Options](#axis-specific-and-common-options)).

### Thumb

#### `thumbSize` — Thumb thickness

| Option       | Type                             | States                    |
| ------------ | -------------------------------- | ------------------------- |
| `thumbSize?` | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |

Numbers are treated as `px` values.

```ts
// 6px for both axes, all states
scrollbar({ thumbSize: 6 });

// 5px normally, 9px on hover
scrollbar({ thumbSize: { base: 5, hover: 9 } });

// Different values per axis
scrollbar({ thumbSize: 6, y: { thumbSize: 10 } });
```

#### `thumbColor` — Thumb color

| Option        | Type                             | States                    |
| ------------- | -------------------------------- | ------------------------- |
| `thumbColor?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

- `hover`: color when the container is hovered
- `active`: color when the thumb itself is directly hovered (WebKit only)

```ts
scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.2)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.6)',
  },
});
```

#### `thumbRadius` — Thumb corner radius

| Option         | Type                                  | States                    |
| -------------- | ------------------------------------- | ------------------------- |
| `thumbRadius?` | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |

##### `ThumbRadius` values

| Value    | Output   | Description      |
| -------- | -------- | ---------------- |
| `number` | `${n}px` | Fixed value (px) |
| `'full'` | `9999px` | Fully rounded    |
| `'none'` | `0`      | No rounding      |

```ts
scrollbar({ thumbRadius: 'full' }); // 9999px
scrollbar({ thumbRadius: 'none' }); // 0
scrollbar({ thumbRadius: 4 }); // 4px
```

#### `thumbBorderWidth` — Thumb border width

| Option              | Type                                       | States                    |
| ------------------- | ------------------------------------------ | ------------------------- |
| `thumbBorderWidth?` | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |

##### `ThumbBorderWidth` values

| Value    | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| `number` | Fixed width (px)                                                     |
| `'auto'` | Automatically adjusts to follow the thumb size animation (auto mode) |

> **Auto mode**: When the `base` of `thumbBorderWidth` is `null`, `undefined`, or `'auto'`, auto mode is applied.\
> Auto mode is also active by default when the option is not specified at all.

```ts
scrollbar({ thumbBorderWidth: 2 }); // fixed 2px
scrollbar({ thumbBorderWidth: 'auto' }); // auto mode
scrollbar({ x: { thumbBorderWidth: 2 } }); // horizontal fixed, vertical auto mode
```

#### `thumbBorderColor` — Thumb border color

| Option              | Type                             | States                    |
| ------------------- | -------------------------------- | ------------------------- |
| `thumbBorderColor?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

The CSS default when not specified is `transparent`.

```ts
scrollbar({
  thumbBorderWidth: 2,
  thumbBorderColor: 'transparent', // thumb background shows through
});
```

---

### Track

#### `trackColor` — Track color

| Option        | Type                             | States          |
| ------------- | -------------------------------- | --------------- |
| `trackColor?` | `StyleState<string, TrackState>` | `base`, `hover` |

- `hover`: color when the container is hovered

```ts
scrollbar({
  trackColor: {
    base: 'rgba(0, 0, 0, 0.04)',
    hover: 'rgba(0, 0, 0, 0.08)',
  },
});
```

#### `trackSize` — Track width

| Option       | Type                                | States          |
| ------------ | ----------------------------------- | --------------- |
| `trackSize?` | `StyleState<TrackSize, TrackState>` | `base`, `hover` |

##### `TrackSize` values

| Value    | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| `number` | Fixed width (px)                                                    |
| `'auto'` | Tracks `thumbSizeActive + 2×thumbBorderWidth` and animates on hover |

> **Auto mode**: Specifying `'auto'` for `trackSize` activates auto mode.

```ts
// Fixed width
scrollbar({ trackSize: 12 });

// Auto mode (follows thumb size)
scrollbar({ trackSize: 'auto' });

// 8px normally, 12px on hover
scrollbar({ trackSize: { base: 8, hover: 12 } });

// Different settings per axis
scrollbar({ trackSize: 12, x: { trackSize: 'auto' } });
```

---

### Other

#### `fallbackSize` — Non-WebKit fallback

| Option          | Type                         | Default  |
| --------------- | ---------------------------- | -------- |
| `fallbackSize?` | `'auto' \| 'thin' \| 'none'` | `'auto'` |

Controls the `scrollbar-width` CSS property for non-WebKit browsers (Firefox). Has no effect in WebKit browsers.

| Value    | Description                    |
| -------- | ------------------------------ |
| `'auto'` | Browser default                |
| `'thin'` | Thin scrollbar                 |
| `'none'` | Hidden (scrolling still works) |

```ts
scrollbar({ fallbackSize: 'thin' });
```

#### `arrows` — Arrow buttons

| Option    | Type      | Default     |
| --------- | --------- | ----------- |
| `arrows?` | `boolean` | `undefined` |

Forces the display or hiding of scrollbar end arrow buttons (WebKit only).

| Value       | Description                        |
| ----------- | ---------------------------------- |
| `true`      | Show arrow buttons                 |
| `false`     | Hide arrow buttons                 |
| `undefined` | No class applied (browser default) |

```ts
scrollbar({ arrows: false }); // hide arrows
```

#### `noAnimation` — Disable animations

| Option         | Type          | Default     |
| -------------- | ------------- | ----------- |
| `noAnimation?` | `NoAnimation` | `undefined` |

Disables transition animations. Animations are enabled by default when not specified.

| Value                 | Description                   |
| --------------------- | ----------------------------- |
| `undefined` / `false` | Animations enabled (default)  |
| `true`                | Disable both size and color   |
| `{ size: true }`      | Disable size animations only  |
| `{ color: true }`     | Disable color animations only |

Animations can be controlled per property group.

| Group   | Target Properties                                           |
| ------- | ----------------------------------------------------------- |
| `size`  | `thumbSize`, `trackSize`, `thumbBorderWidth`, `thumbRadius` |
| `color` | `thumbColor`, `trackColor`, `thumbBorderColor`              |

```ts
// Disable all animations
scrollbar({ noAnimation: true });

// Disable size animations only
scrollbar({ noAnimation: { size: true } });

// Disable color animations only
scrollbar({ noAnimation: { color: true } });
```

---

## `scrollSnap` Options (`ScrollSnapOptions`)

`padding`, `align` and `margin` can also be specified per axis under `x` / `y` (see [Axis-specific and Common Options](#axis-specific-and-common-options)).

### Container

#### `axis` — Snap axis

| Option  | Type                             | Default     |
| ------- | -------------------------------- | ----------- |
| `axis?` | `'x' \| 'y' \| 'both' \| 'none'` | `undefined` |

Sets the axis of `scroll-snap-type`. When omitted, nothing snaps.

| Value    | Description       |
| -------- | ----------------- |
| `'x'`    | Horizontal only   |
| `'y'`    | Vertical only     |
| `'both'` | Both axes         |
| `'none'` | Snapping disabled |

#### `strictness` — Snap strictness

| Option        | Type                         | Default       |
| ------------- | ---------------------------- | ------------- |
| `strictness?` | `'mandatory' \| 'proximity'` | `'mandatory'` |

Combined with `axis` to form the `scroll-snap-type` value.

| Value         | Description                              |
| ------------- | ---------------------------------------- |
| `'mandatory'` | Always rests on a snap position          |
| `'proximity'` | Snaps only when close to a snap position |

```ts
scrollSnap({ axis: 'x', strictness: 'proximity' }); // scroll-snap-type: x proximity
```

#### `padding` — Scroll padding

| Option     | Type               | Default     |
| ---------- | ------------------ | ----------- |
| `padding?` | `number \| string` | `undefined` |

Sets the offset of the snap position (`scroll-padding`). Useful for offsetting by the height of a fixed header.\
Numbers are treated as `px`; strings are used as CSS values as-is.

| Specified   | CSS property            |
| ----------- | ----------------------- |
| `padding`   | `scroll-padding`        |
| `x.padding` | `scroll-padding-inline` |
| `y.padding` | `scroll-padding-block`  |

```ts
// Offset by the height of a fixed header
scrollSnap({ axis: 'y', align: 'start', y: { padding: 80 } });
```

#### `behavior` — Scroll behavior

| Option      | Type                              | Default     |
| ----------- | --------------------------------- | ----------- |
| `behavior?` | `'auto' \| 'smooth' \| 'instant'` | `undefined` |

Sets `scroll-behavior`. When omitted, the browser default (`auto`) is used.

### Children (applied to `> *`)

#### `align` — Snap alignment

| Option   | Type                                     | Default     |
| -------- | ---------------------------------------- | ----------- |
| `align?` | `'start' \| 'center' \| 'end' \| 'none'` | `undefined` |

Sets which part of each child aligns to the snap position (`scroll-snap-align`).\
`x.align` is the alignment on the inline (horizontal) axis and `y.align` on the block (vertical) axis. An axis with no resolved value becomes `none`.

```ts
scrollSnap({ axis: 'y', align: 'start' }); // scroll-snap-align: start
scrollSnap({ axis: 'both', x: { align: 'center' }, y: { align: 'start' } }); // scroll-snap-align: start center
```

#### `stop` — Snap stop

| Option  | Type                   | Default     |
| ------- | ---------------------- | ----------- |
| `stop?` | `'normal' \| 'always'` | `undefined` |

Sets `scroll-snap-stop`. When omitted, `normal` is used.

| Value      | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `'normal'` | Snap positions may be skipped depending on scroll momentum |
| `'always'` | Always stops at each snap position                         |

#### `margin` — Scroll margin

| Option    | Type               | Default     |
| --------- | ------------------ | ----------- |
| `margin?` | `number \| string` | `undefined` |

Sets the snap position offset on the child side (`scroll-margin`). Numbers are treated as `px`.

| Specified  | CSS property           |
| ---------- | ---------------------- |
| `margin`   | `scroll-margin`        |
| `x.margin` | `scroll-margin-inline` |
| `y.margin` | `scroll-margin-block`  |

```ts
scrollSnap({ axis: 'y', align: 'start', y: { margin: 16 } });
```

---

## Type Definitions

```ts
/** Scrollbar options (common styles + per-axis overrides) */
type ScrollbarOptions = ScrollbarAxisOptions & {
  x?: ScrollbarAxisOptions;
  y?: ScrollbarAxisOptions;
  fallbackSize?: FallbackSize;
  arrows?: boolean;
  noAnimation?: NoAnimation;
};

/** Styles that can be specified per axis */
type ScrollbarAxisOptions = {
  thumbColor?: StyleState<string, ThumbState>;
  thumbSize?: StyleState<number, ThumbState>;
  thumbRadius?: StyleState<ThumbRadius, ThumbState>;
  thumbBorderColor?: StyleState<string, ThumbState>;
  thumbBorderWidth?: StyleState<ThumbBorderWidth, ThumbState>;
  trackColor?: StyleState<string, TrackState>;
  trackSize?: StyleState<TrackSize, TrackState>;
};

/** Thumb states */
type ThumbState = 'hover' | 'active';

/** Track states */
type TrackState = 'hover';

/** Thumb border width */
type ThumbBorderWidth = number | 'auto';

/** Thumb corner radius */
type ThumbRadius = number | 'full' | 'none';

/** Track width */
type TrackSize = number | 'auto';

/** Non-WebKit fallback size */
type FallbackSize = 'auto' | 'thin' | 'none';

/** Animation disable configuration */
type NoAnimation = boolean | { size?: boolean; color?: boolean };

/** scrollSnap options (common options + per-axis overrides) */
type ScrollSnapOptions = ScrollSnapAxisOptions & {
  x?: ScrollSnapAxisOptions;
  y?: ScrollSnapAxisOptions;
  axis?: SnapAxis;
  strictness?: SnapStrictness;
  behavior?: SnapBehavior;
  stop?: SnapStop;
};

/** Options that can be specified per axis */
type ScrollSnapAxisOptions = {
  padding?: number | string;
  align?: SnapAlign;
  margin?: number | string;
};

/** Snap axis */
type SnapAxis = 'x' | 'y' | 'both' | 'none';

/** Snap strictness */
type SnapStrictness = 'mandatory' | 'proximity';

/** Snap alignment */
type SnapAlign = 'start' | 'center' | 'end' | 'none';

/** Snap stop */
type SnapStop = 'always' | 'normal';

/** Scroll behavior */
type SnapBehavior = 'smooth' | 'auto' | 'instant';

/** Per-state value type */
type StyleState<T, S extends string> =
  | T
  | { [key in S]?: T }
  | { base?: T; [key in S]?: T };
```

## Return Value

Style functions return a `ScrollStyle`.

```ts
type ScrollStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## Browser Support

This library is designed using modern CSS standards and supports the following major browser versions.

| Browser         | Supported Version  | Supported Version (no animation) | Scrollbar Customization      |
| --------------- | ------------------ | -------------------------------- | ---------------------------- |
| Google Chrome   | 85 (August 2020)+  | 83 (May 2020)+                   | Full customization (WebKit)  |
| Microsoft Edge  | 85 (August 2020)+  | 83 (May 2020)+                   | Full customization (WebKit)  |
| Apple Safari    | 16.4 (March 2023)+ | 14.1 (April 2021)+               | Full customization (WebKit)  |
| Mozilla Firefox | 128 (July 2024)+   | 83 (November 2020)+              | Fallback (`scrollbar-width`) |

> **WebKit browsers (Chrome, Edge, Safari)** support full customization via `::-webkit-scrollbar`.\
> **Non-WebKit browsers (Firefox)** only apply `scrollbar-width` / `scrollbar-color` (color and width only).

## License

MIT
