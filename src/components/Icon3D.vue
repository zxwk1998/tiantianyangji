<script>
import { h } from 'vue'

function grad(id, stops) {
  return h(
    'linearGradient',
    { id, x1: '0', y1: '0', x2: '1', y2: '1' },
    stops.map(([offset, color]) => h('stop', { offset, 'stop-color': color }))
  )
}
function face(d, fill, opacity) {
  return h('path', { d, fill, ...(opacity != null ? { opacity } : {}) })
}
function line(d, stroke, width) {
  return h('path', { d, stroke, 'stroke-width': width, fill: 'none', 'stroke-linecap': 'round' })
}

export const Trophy3D = {
  render() {
    return h('svg', { viewBox: '0 0 100 100', class: 'i3d', 'aria-hidden': 'true' }, [
      h('defs', [
        grad('trp-top', [['0', '#ffedb3'], ['1', '#f2c14e']]),
        grad('trp-l', [['0', '#f5cd6b'], ['1', '#e0a93a']]),
        grad('trp-r', [['0', '#d99a2b'], ['1', '#b97d1e']]),
      ]),
      face('M28 22 L50 14 L72 22 L50 30 Z', 'url(#trp-top)'),
      face('M28 22 L50 30 L50 50 L28 42 Z', 'url(#trp-l)'),
      face('M72 22 L50 30 L50 50 L72 42 Z', 'url(#trp-r)'),
      face('M28 24 C16 32 16 46 26 48 L30 44 C22 42 22 34 28 30 Z', 'url(#trp-l)'),
      face('M72 24 C84 32 84 46 74 48 L70 44 C78 42 78 34 72 30 Z', 'url(#trp-r)'),
      face('M34 50 L50 42 L66 50 L50 58 Z', 'url(#trp-top)'),
      face('M34 50 L50 58 L50 68 L34 60 Z', 'url(#trp-l)'),
      face('M66 50 L50 58 L50 68 L66 60 Z', 'url(#trp-r)'),
      face('M33 26 L41 30 L41 46 L33 42 Z', '#fff', 0.35),
    ])
  },
}

export const Calendar3D = {
  render() {
    return h('svg', { viewBox: '0 0 100 100', class: 'i3d', 'aria-hidden': 'true' }, [
      h('defs', [
        grad('cal-top', [['0', '#b6c2f5'], ['1', '#8a9be8']]),
        grad('cal-l', [['0', '#7a8be0'], ['1', '#5f72cf']]),
        grad('cal-r', [['0', '#5a6cd0'], ['1', '#4658b8']]),
      ]),
      h('ellipse', { cx: '38', cy: '15', rx: '4.5', ry: '2.6', fill: 'url(#cal-r)' }),
      h('ellipse', { cx: '62', cy: '15', rx: '4.5', ry: '2.6', fill: 'url(#cal-r)' }),
      face('M50 16 L76 30 L50 44 L24 30 Z', 'url(#cal-top)'),
      face('M24 30 L50 44 L50 80 L24 66 Z', 'url(#cal-l)'),
      face('M76 30 L50 44 L50 80 L76 66 Z', 'url(#cal-r)'),
      line('M24 30 L76 30', '#ffffff', 1.6),
      line('M38 23 L38 37', '#ffffff', 1.6),
      line('M62 23 L62 37', '#ffffff', 1.6),
      face('M28 34 L40 40 L40 74 L28 68 Z', '#fff', 0.18),
    ])
  },
}

export const Stack3D = {
  render() {
    return h('svg', { viewBox: '0 0 100 100', class: 'i3d', 'aria-hidden': 'true' }, [
      h('defs', [
        grad('stk-top', [['0', '#b6c2f5'], ['1', '#8a9be8']]),
        grad('stk-l', [['0', '#7a8be0'], ['1', '#5f72cf']]),
        grad('stk-r', [['0', '#5a6cd0'], ['1', '#4658b8']]),
      ]),
      face('M20 36 L50 22 L80 36 L50 50 Z', 'url(#stk-top)'),
      face('M20 36 L50 50 L50 82 L20 68 Z', 'url(#stk-l)'),
      face('M80 36 L50 50 L50 82 L80 68 Z', 'url(#stk-r)'),
      face('M36 26 L58 16 L82 26 L58 36 Z', 'url(#stk-top)'),
      face('M36 26 L58 36 L58 58 L36 48 Z', 'url(#stk-l)'),
      face('M82 26 L58 36 L58 58 L82 48 Z', 'url(#stk-r)'),
      h('circle', { cx: '63', cy: '31', r: '3', fill: '#fff', opacity: '0.85' }),
      face('M30 41 L42 31 L52 39 L60 33 L70 41 Z', '#fff', 0.5),
      face('M42 34 L50 40 L50 76 L42 70 Z', '#fff', 0.14),
    ])
  },
}

export const Star3D = {
  render() {
    return h('svg', { viewBox: '0 0 100 100', class: 'i3d', 'aria-hidden': 'true' }, [
      h('defs', [
        grad('str-top', [['0', '#ffedb3'], ['1', '#f2c14e']]),
        grad('str-l', [['0', '#f5cd6b'], ['1', '#e0a93a']]),
        grad('str-r', [['0', '#d99a2b'], ['1', '#b97d1e']]),
      ]),
      face('M50 12 L74 34 L50 56 L26 34 Z', 'url(#str-top)'),
      face('M26 34 L50 56 L50 84 L26 62 Z', 'url(#str-l)'),
      face('M74 34 L50 56 L50 84 L74 62 Z', 'url(#str-r)'),
      face('M34 36 L46 48 L46 76 L34 64 Z', '#fff', 0.35),
    ])
  },
}

export const Hero3D = {
  render() {
    return h('svg', { viewBox: '0 0 120 100', class: 'hero3d', 'aria-hidden': 'true' }, [
      h('defs', [
        grad('hero-top', [['0', '#b6c2f5'], ['1', '#8a9be8']]),
        grad('hero-l', [['0', '#7a8be0'], ['1', '#5f72cf']]),
        grad('hero-r', [['0', '#5a6cd0'], ['1', '#4658b8']]),
        grad('hero-g', [['0', '#ffedb3'], ['1', '#f2c14e']]),
      ]),
      h('ellipse', { cx: '60', cy: '88', rx: '42', ry: '7', fill: '#3d4fb0', opacity: '0.12' }),
      face('M28 62 L38 57 L48 62 L38 67 Z', 'url(#hero-g)'),
      face('M28 62 L38 67 L38 80 L28 75 Z', 'url(#hero-l)'),
      face('M48 62 L38 67 L38 80 L48 75 Z', 'url(#hero-r)'),
      face('M44 50 L54 45 L64 50 L54 55 Z', 'url(#hero-g)'),
      face('M44 50 L54 55 L54 80 L44 75 Z', 'url(#hero-l)'),
      face('M64 50 L54 55 L54 80 L64 75 Z', 'url(#hero-r)'),
      face('M60 38 L70 33 L80 38 L70 43 Z', 'url(#hero-g)'),
      face('M60 38 L70 43 L70 80 L60 75 Z', 'url(#hero-l)'),
      face('M80 38 L70 43 L70 80 L80 75 Z', 'url(#hero-r)'),
      face('M32 65 L36 67 L36 76 L32 74 Z', '#fff', 0.3),
      face('M48 53 L52 55 L52 76 L48 74 Z', '#fff', 0.3),
      face('M64 41 L68 43 L68 76 L64 74 Z', '#fff', 0.3),
    ])
  },
}
</script>
