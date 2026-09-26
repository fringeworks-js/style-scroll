# @niche-works/style-scroll

`@niche-works/style-scroll` is a niche library specialized in controlling scroll-related styles via CSS.\
It returns class names and CSS variables as an object based on the provided options. Framework-agnostic and SSR-compatible.

**[日本語版READMEはこちら](./README.ja.md)**

## Features

- Framework-agnostic (works in any JS environment)
- SSR-compatible (simply returns class names and inline style objects)
- Full TypeScript support

## Installation

```bash
npm install @niche-works/style-scroll
# or
pnpm add @niche-works/style-scroll
```

## Usage

Each style function returns a `{ className, style }` object. Apply it to the target element.

```ts
import { scrollbar } from '@niche-works/style-scroll';

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

When using the default import, CSS is loaded automatically.

```ts
import { scrollbar } from '@niche-works/style-scroll';
```

To manage CSS and functions separately, use modules under the `core` directory.

```ts
import { scrollbar } from '@niche-works/style-scroll/core';

// Import all styles at once
import '@niche-works/style-scroll/core/styles.css';

// Import only what you need
import '@niche-works/style-scroll/core/scrollbar.css';
```

### About `StyleState`

Many options accept the `StyleState<T, S>` type. You can specify either a scalar value or a per-state object.

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

To set different values for the horizontal and vertical axes, use the `X` (horizontal) and `Y` (vertical) suffixed options.\
When an axis-specific value is provided, it takes precedence. Unspecified states fall back to the corresponding common option's value.

```ts
scrollbar({
  thumbColor: 'rgba(0, 0, 0, 0.3)', // common for both axes
  thumbColorX: 'rgba(0, 0, 255, 0.3)', // overrides horizontal only

  // On hover: X falls back to thumbColor's hover since thumbColorX has no hover
  thumbColor: { base: 'rgba(0,0,0,0.3)', hover: 'rgba(0,0,0,0.5)' },
  thumbColorX: { base: 'rgba(0,0,255,0.3)' }, // X hover falls back to above
});
```

## Style Types

### `scrollbar`

Customizes the appearance of the scrollbar.

In WebKit browsers (Chrome, Edge, Safari), full customization via `::-webkit-scrollbar` is available.\
In non-WebKit browsers (Firefox), a fallback using `scrollbar-width` / `scrollbar-color` is applied.

```ts
import { scrollbar } from '@niche-works/style-scroll';

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

## Options (`ScrollbarOptions`)

### Thumb

#### `thumbSize` — Thumb thickness

| Option        | Type                             | States                    |
| ------------- | -------------------------------- | ------------------------- |
| `thumbSize?`  | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |
| `thumbSizeX?` | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |
| `thumbSizeY?` | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |

Numbers are treated as `px` values.

```ts
// 6px for both axes, all states
scrollbar({ thumbSize: 6 });

// 5px normally, 9px on hover
scrollbar({ thumbSize: { base: 5, hover: 9 } });

// Different values per axis
scrollbar({ thumbSize: 6, thumbSizeY: 10 });
```

#### `thumbColor` — Thumb color

| Option         | Type                             | States                    |
| -------------- | -------------------------------- | ------------------------- |
| `thumbColor?`  | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbColorX?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbColorY?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

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

| Option          | Type                                  | States                    |
| --------------- | ------------------------------------- | ------------------------- |
| `thumbRadius?`  | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |
| `thumbRadiusX?` | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |
| `thumbRadiusY?` | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |

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

| Option               | Type                                       | States                    |
| -------------------- | ------------------------------------------ | ------------------------- |
| `thumbBorderWidth?`  | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderWidthX?` | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderWidthY?` | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |

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
scrollbar({ thumbBorderWidthX: 2 }); // horizontal fixed, vertical auto mode
```

#### `thumbBorderColor` — Thumb border color

| Option               | Type                             | States                    |
| -------------------- | -------------------------------- | ------------------------- |
| `thumbBorderColor?`  | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderColorX?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderColorY?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

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

| Option         | Type                             | States          |
| -------------- | -------------------------------- | --------------- |
| `trackColor?`  | `StyleState<string, TrackState>` | `base`, `hover` |
| `trackColorX?` | `StyleState<string, TrackState>` | `base`, `hover` |
| `trackColorY?` | `StyleState<string, TrackState>` | `base`, `hover` |

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

| Option        | Type                                | States          |
| ------------- | ----------------------------------- | --------------- |
| `trackSize?`  | `StyleState<TrackSize, TrackState>` | `base`, `hover` |
| `trackSizeX?` | `StyleState<TrackSize, TrackState>` | `base`, `hover` |
| `trackSizeY?` | `StyleState<TrackSize, TrackState>` | `base`, `hover` |

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
scrollbar({ trackSize: 12, trackSizeX: 'auto' });
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

## Type Definitions

```ts
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
