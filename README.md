# @fringeworks/style-scroll

`@fringeworks/style-scroll` is a library some will find handy, specialized in controlling scroll-related styles via CSS.\
It returns class names and CSS variables as an object based on the provided options. Framework-agnostic and SSR-compatible.

**[日本語のREADMEはこちら](./README.ja.md)**

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

Each function returns a `{ className, style }` object. Apply it to the scroll container.

```ts
import { scrollbar } from '@fringeworks/style-scroll';

const { className, style } = scrollbar({
  thumbSize: 6,
  thumbColor: 'rgba(0, 0, 0, 0.3)',
  trackColor: 'rgba(0, 0, 0, 0.05)',
});

// className: "frgs-scroll-scrollbar ..."
// style: { "--frgs-scroll-scrollbar-thumbSizeX": "6px", ... }
```

```html
<div
  class="frgs-scroll-scrollbar ..."
  style="--frgs-scroll-scrollbar-thumbSizeX: 6px; ..."
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
import '@fringeworks/style-scroll/snap.css';
```

If you want the CSS to be loaded automatically, use the modules under `with-css`. This requires a bundler that can handle CSS imports.

```ts
import { scrollbar, scrollSnap } from '@fringeworks/style-scroll/with-css';
```

### Common and Per-Axis Options

For both `scrollbar` and `scrollSnap`, options specified at the top level apply to both axes. To use different values per axis, override them inside `x` (horizontal) or `y` (vertical).

```ts
scrollbar({
  thumbColor: 'rgba(0, 0, 0, 0.3)', // both axes
  x: { thumbColor: 'rgba(0, 0, 255, 0.3)' }, // override horizontal only
});

scrollSnap({
  align: 'start', // both axes
  x: { align: 'center' }, // override horizontal only
});
```

### Per-State Values (`StyleState`)

Many `scrollbar` options accept a value per state, such as hover. A plain value applies to all states.

```ts
// Same value for all states
scrollbar({ thumbColor: 'rgba(0, 0, 0, 0.3)' });

// Per-state values (omitted states use the defaults)
scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.3)', // normal
    hover: 'rgba(0, 0, 0, 0.5)', // when hovering the container
    active: 'rgba(0, 0, 0, 0.7)', // when hovering the thumb itself (WebKit only)
  },
});
```

| State    | Applied when                                                                       |
| -------- | ---------------------------------------------------------------------------------- |
| `base`   | Normal                                                                             |
| `hover`  | Hovering the container                                                             |
| `active` | Hovering the thumb itself (WebKit only; some of the options starting with `thumb`) |

Per-axis values in `x` / `y` take precedence state by state; states omitted in the per-axis value fall back to the common value.

```ts
scrollbar({
  thumbColor: { base: 'rgba(0,0,0,0.3)', hover: 'rgba(0,0,0,0.5)' },
  // x has no hover value, so the horizontal hover color is thumbColor's hover
  x: { thumbColor: { base: 'rgba(0,0,255,0.3)' } },
});
```

## API

### `scrollbar`

```ts
scrollbar(options?: ScrollbarOptions): ScrollStyle
```

Returns class names and CSS variables that customize the appearance of scrollbars.

In browsers that support WebKit scrollbars (`::-webkit-scrollbar`; Chrome, Edge, Safari), all options are applied.\
In browsers that do not (Firefox), only the color and width via `scrollbar-width` and `scrollbar-color` are applied (see [Non-WebKit Browsers](#non-webkit-browsers)).

| Parameter  | Type               | Description       |
| ---------- | ------------------ | ----------------- |
| `options?` | `ScrollbarOptions` | The options below |

| Option              | Type                                       | Description                                                                                                                 |
| ------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `thumbColor?`       | `StyleState<string, ThumbState>`           | Thumb color                                                                                                                 |
| `thumbSize?`        | `StyleState<number, ThumbState>`           | Thumb thickness (px). Capped at the track width if larger                                                                   |
| `thumbRadius?`      | `StyleState<ThumbRadius, ThumbState>`      | Thumb corner radius. A number (px), `'full'` (fully rounded), or `'none'` (square)                                          |
| `thumbBorderColor?` | `StyleState<string, ThumbState>`           | Thumb border color. The border fills the gap between the track and the thumb                                                |
| `thumbBorderWidth?` | `StyleState<number, TrackState>`           | Thumb border width (px). Used only when `trackSize` is `'auto'` (see [How Sizes Are Determined](#how-sizes-are-determined)) |
| `trackColor?`       | `StyleState<string, TrackState>`           | Track color                                                                                                                 |
| `trackSize?`        | `StyleState<number, TrackState> \| 'auto'` | Track width (px). `'auto'` follows `thumbSize + 2 × thumbBorderWidth`                                                       |
| `x?`                | `ScrollbarAxisOptions`                     | The options above starting with `thumb` / `track`, applied to the horizontal scrollbar only                                 |
| `y?`                | `ScrollbarAxisOptions`                     | The options above starting with `thumb` / `track`, applied to the vertical scrollbar only                                   |
| `fallbackSize?`     | `ScrollbarFallbackSize`                    | Scrollbar width for non-WebKit browsers (`scrollbar-width`): `'auto'`, `'thin'`, or `'none'`. Defaults to `'thin'`          |
| `arrows?`           | `boolean`                                  | Shows arrow buttons at the ends of the scrollbar (WebKit only). Defaults to `false`                                         |
| `noAnimation?`      | `boolean`                                  | Disables animations. Defaults to `false` (see [Animation](#animation))                                                      |

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
});
```

#### Default Values

Values used when an option is omitted.

| Option             | `base`                      | `hover`                     | `active`                   |
| ------------------ | --------------------------- | --------------------------- | -------------------------- |
| `thumbColor`       | `rgba(127, 127, 127, 0.1)`  | `rgba(127, 127, 127, 0.3)`  | `rgba(127, 127, 127, 0.5)` |
| `thumbSize`        | `5`                         | `7`                         | `7`                        |
| `thumbRadius`      | `'full'`                    | `'full'`                    | `'full'`                   |
| `thumbBorderColor` | transparent                 | transparent                 | transparent                |
| `thumbBorderWidth` | `0`                         | `0`                         | -                          |
| `trackColor`       | `rgba(127, 127, 127, 0.04)` | `rgba(127, 127, 127, 0.04)` | -                          |
| `trackSize`        | `13`                        | `13`                        | -                          |

#### How Sizes Are Determined

The thumb is drawn in the center of the track, with the remaining space (track width minus thumb thickness) as its border. The track width is determined in one of two ways.

- `trackSize` is a number (default): the track width is fixed. The thumb has the thickness of `thumbSize`, and the remaining gap is painted with `thumbBorderColor`. `thumbBorderWidth` is not used.
- `trackSize` is `'auto'`: the track width is `thumbSize + 2 × thumbBorderWidth`. If you specify a hover value for `thumbSize`, the track grows together with the thumb when hovering the container.

When hovering the thumb itself (`active`), the track width does not change; only the thumb takes the `active` thickness. In either case, a thumb thicker than the track is capped at the track width.

```ts
// The track stays at 13px; only the thumb grows on hover
scrollbar({ thumbSize: { base: 5, hover: 9 } });

// The track grows together with the thumb (2px gap around the thumb)
scrollbar({
  thumbSize: { base: 5, hover: 9 },
  thumbBorderWidth: 2,
  trackSize: 'auto',
});

// Different settings per axis
scrollbar({ trackSize: 12, x: { trackSize: 'auto' } });
```

#### Animation

Value changes between states are animated: 0.3 seconds for sizes and 0.5 seconds for colors. There is no animation when `noAnimation: true` is specified, or when the user prefers reduced motion (`prefers-reduced-motion: reduce`).

The animation uses the `transition` property of the element the style is applied to. If you specify another `transition` on the same element, one of them overrides the other. To animate other properties on the same element, specify `noAnimation: true` or use a separate element as the scroll container.

#### Non-WebKit Browsers

In browsers that do not support WebKit scrollbars (Firefox), only the following are applied.

| CSS Property      | Value                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| `scrollbar-width` | `fallbackSize`                                                          |
| `scrollbar-color` | The vertical (`y`) `thumbColor` and `trackColor` (states are reflected) |

Since the two axes cannot have different colors, colors specified in `x` are not used.

### `scrollSnap`

```ts
scrollSnap(options?: ScrollSnapOptions): ScrollStyle
```

Returns class names and CSS variables that configure scroll snapping. Apply it to the scroll container.\
The child options (`align`, `stop`, `margin`) are applied to all direct children of the container (`> *`).

To enable snapping, specify both `axis` and `align`. If either is omitted, no snapping occurs.

| Parameter  | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| `options?` | `ScrollSnapOptions` | The options below |

| Option        | Type                    | Description                                                                                                                          |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `axis?`       | `SnapAxis`              | Snap axis (`scroll-snap-type`): `'x'`, `'y'`, `'both'`, or `'none'`. No snapping if omitted                                          |
| `strictness?` | `SnapStrictness`        | Snap strictness: `'mandatory'` (always stops at a snap position) or `'proximity'` (stops only when close). Defaults to `'mandatory'` |
| `padding?`    | `number \| string`      | Offset of the snap position (`scroll-padding`), e.g. for the height of a fixed header                                                |
| `behavior?`   | `SnapBehavior`          | Scroll behavior (`scroll-behavior`): `'auto'`, `'smooth'`, or `'instant'`. Browser default if omitted                                |
| `align?`      | `SnapAlign`             | Which part of each child aligns to the snap position (`scroll-snap-align`): `'start'`, `'center'`, `'end'`, or `'none'`              |
| `stop?`       | `SnapStop`              | Whether snap positions can be passed (`scroll-snap-stop`): `'normal'` (can be passed with momentum) or `'always'`                    |
| `margin?`     | `number \| string`      | Offset of the snap position on the child side (`scroll-margin`)                                                                      |
| `x?`          | `ScrollSnapAxisOptions` | `padding`, `align`, and `margin` applied to the horizontal (inline) axis only                                                        |
| `y?`          | `ScrollSnapAxisOptions` | `padding`, `align`, and `margin` applied to the vertical (block) axis only                                                           |

Numbers for `padding` / `margin` are treated as `px`; strings are used as CSS values as-is.\
Values in `x` / `y` map to the following CSS properties. An axis whose `align` is not determined becomes `none`.

| Option                   | CSS Property                                    |
| ------------------------ | ----------------------------------------------- |
| `x.padding`, `y.padding` | `scroll-padding-inline`, `scroll-padding-block` |
| `x.margin`, `y.margin`   | `scroll-margin-inline`, `scroll-margin-block`   |
| `x.align`, `y.align`     | `scroll-snap-align: <y.align> <x.align>`        |

```ts
import { scrollSnap } from '@fringeworks/style-scroll';

// Scroll vertically and snap to the start of each child
scrollSnap({ axis: 'y', align: 'start' });

// Horizontal carousel (snap only when close)
scrollSnap({ axis: 'x', strictness: 'proximity', align: 'center' });

// Shift the snap position down by the height of a fixed header
scrollSnap({ axis: 'y', align: 'start', y: { padding: 80 } });
```

#### Per-Child Overrides

Only the child options you specify are applied to the children. Their specificity is 0, so you can override them per child with a class or an inline style on the child.

```html
<div class="frgs-scroll-snap ..." style="...">
  <div>...</div>
  <div class="featured">...</div>
</div>
```

```css
.featured {
  scroll-snap-align: center;
}
```

### Types

| Type                    | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `ScrollStyle`           | Return value of the functions, with `className` and `style` (CSS variables) |
| `CreateScrollStyle<O>`  | Type of a function that takes options `O` and returns `ScrollStyle`         |
| `ScrollbarOptions`      | Options for `scrollbar`                                                     |
| `ScrollbarAxisOptions`  | Options for `x` / `y` of `scrollbar`                                        |
| `ThumbState`            | Thumb states (`'hover' \| 'active'`)                                        |
| `TrackState`            | Track states (`'hover'`)                                                    |
| `ThumbRadius`           | Thumb corner radius (`number \| 'full' \| 'none'`)                          |
| `ScrollbarFallbackSize` | Scrollbar width for non-WebKit browsers (`'auto' \| 'thin' \| 'none'`)      |
| `ScrollSnapOptions`     | Options for `scrollSnap`                                                    |
| `ScrollSnapAxisOptions` | Options for `x` / `y` of `scrollSnap`                                       |
| `ScrollSnapItemOptions` | Options of `scrollSnap` applied to the children                             |
| `SnapAxis`              | Snap axis (`'x' \| 'y' \| 'both' \| 'none'`)                                |
| `SnapStrictness`        | Snap strictness (`'mandatory' \| 'proximity'`)                              |
| `SnapAlign`             | Snap alignment (`'start' \| 'center' \| 'end' \| 'none'`)                   |
| `SnapStop`              | Whether snap positions can be passed (`'normal' \| 'always'`)               |
| `SnapBehavior`          | Scroll behavior (`'auto' \| 'smooth' \| 'instant'`)                         |

`StyleState<T, S>` is a type from `@fringeworks/style-utils` that accepts either a plain value `T` or per-state values `{ base?: T; [state in S]?: T }`.

## Browser Support

This library is designed using modern CSS standards and supports the following major browser versions.

| Browser         | Supported Version  | Supported Version (no animation) | Scrollbar Customization                        |
| --------------- | ------------------ | -------------------------------- | ---------------------------------------------- |
| Google Chrome   | 88 (January 2021)+ | 88 (January 2021)+               | All options (WebKit)                           |
| Microsoft Edge  | 88 (January 2021)+ | 88 (January 2021)+               | All options (WebKit)                           |
| Apple Safari    | 16.4 (March 2023)+ | 14.1 (April 2021)+               | All options (WebKit)                           |
| Mozilla Firefox | 128 (July 2024)+   | 83 (November 2020)+              | Color and width only (`scrollbar-width`, etc.) |

Animations use `@property`. Browsers without `@property` support still apply all other styles, just without animation.

## License

MIT
