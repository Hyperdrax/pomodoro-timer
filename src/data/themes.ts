export interface ThemePreview {
  bg: string
  text: string
  accent: string
  accentText: string
}

export interface Theme {
  bg: string
  text: string
  accent: string
  secondary: string
  border: string
  preview: ThemePreview
}

export interface Themes {
  [key: string]: Theme
}

export const themes: Themes = {
  minimal: {
    bg: 'bg-stone-100',
    text: 'text-gray-900',
    accent: 'bg-gray-900 text-white',
    secondary: 'bg-gray-200 text-gray-900',
    border: 'border-gray-300',
    preview: { bg: '#f5f5f4', text: '#111827', accent: '#111827', accentText: '#ffffff' }
  },
  arctic: {
    bg: 'bg-gradient-to-br from-blue-100 to-cyan-200',
    text: 'text-blue-900',
    accent: 'bg-blue-500 text-blue-50',
    secondary: 'bg-blue-50/50 text-blue-900',
    border: 'border-blue-500',
    preview: { bg: 'linear-gradient(135deg, #dbeafe 0%, #a5f3fc 100%)', text: '#1e3a8a', accent: '#3b82f6', accentText: '#eff6ff' }
  },
  solarized: {
    bg: 'bg-gradient-to-br from-amber-100 to-yellow-200',
    text: 'text-slate-700',
    accent: 'bg-orange-500 text-amber-50',
    secondary: 'bg-yellow-100/50 text-slate-700',
    border: 'border-orange-500',
    preview: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)', text: '#334155', accent: '#f97316', accentText: '#fffbeb' }
  },
  lavender: {
    bg: 'bg-gradient-to-br from-purple-200 to-pink-200',
    text: 'text-purple-900',
    accent: 'bg-purple-500 text-purple-100',
    secondary: 'bg-purple-100/50 text-purple-900',
    border: 'border-purple-500',
    preview: { bg: 'linear-gradient(135deg, #e9d5ff 0%, #fbcfe8 100%)', text: '#581c87', accent: '#a855f7', accentText: '#f3e8ff' }
  },
  peach: {
    bg: 'bg-gradient-to-br from-orange-200 to-rose-200',
    text: 'text-orange-900',
    accent: 'bg-rose-400 text-orange-50',
    secondary: 'bg-orange-100/50 text-orange-900',
    border: 'border-rose-400',
    preview: { bg: 'linear-gradient(135deg, #fed7aa 0%, #fecdd3 100%)', text: '#7c2d12', accent: '#fb7185', accentText: '#fff7ed' }
  },
  mint: {
    bg: 'bg-gradient-to-br from-teal-100 to-emerald-200',
    text: 'text-teal-900',
    accent: 'bg-teal-500 text-teal-50',
    secondary: 'bg-teal-50/50 text-teal-900',
    border: 'border-teal-500',
    preview: { bg: 'linear-gradient(135deg, #ccfbf1 0%, #a7f3d0 100%)', text: '#134e4a', accent: '#14b8a6', accentText: '#f0fdfa' }
  },
  nord: {
    bg: 'bg-gradient-to-br from-slate-800 to-slate-600',
    text: 'text-slate-100',
    accent: 'bg-sky-400 text-slate-900',
    secondary: 'bg-slate-800/50 text-slate-100',
    border: 'border-sky-400',
    preview: { bg: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', text: '#f1f5f9', accent: '#38bdf8', accentText: '#1e293b' }
  },
  monokai: {
    bg: 'bg-gradient-to-br from-zinc-900 to-neutral-800',
    text: 'text-lime-400',
    accent: 'bg-lime-400 text-zinc-900',
    secondary: 'bg-zinc-900/50 text-lime-400',
    border: 'border-lime-400',
    preview: { bg: 'linear-gradient(135deg, #18181b 0%, #262626 100%)', text: '#a3e635', accent: '#a3e635', accentText: '#18181b' }
  },
  sunset: { 
    bg: 'bg-gradient-to-br from-orange-900 to-pink-600', 
    text: 'text-orange-50',
    accent: 'bg-orange-300 text-orange-900',
    secondary: 'bg-orange-900/50 text-orange-100',
    border: 'border-orange-400',
    preview: { bg: 'linear-gradient(135deg, #7c2d12 0%, #db2777 100%)', text: '#fff7ed', accent: '#fdba74', accentText: '#7c2d12' }
  },
  coffee: {
    bg: 'bg-gradient-to-br from-amber-900 to-orange-800',
    text: 'text-amber-100',
    accent: 'bg-amber-200 text-amber-900',
    secondary: 'bg-amber-900/50 text-amber-100',
    border: 'border-amber-200',
    preview: { bg: 'linear-gradient(135deg, #78350f 0%, #9a3412 100%)', text: '#fef3c7', accent: '#fde68a', accentText: '#78350f' }
  },
  forest: { 
    bg: 'bg-gradient-to-br from-green-900 to-emerald-600', 
    text: 'text-green-50',
    accent: 'bg-emerald-300 text-green-900',
    secondary: 'bg-green-900/50 text-emerald-100',
    border: 'border-emerald-400',
    preview: { bg: 'linear-gradient(135deg, #14532d 0%, #059669 100%)', text: '#f0fdf4', accent: '#6ee7b7', accentText: '#14532d' }
  },
  ocean: { 
    bg: 'bg-gradient-to-br from-blue-900 to-cyan-600', 
    text: 'text-cyan-50',
    accent: 'bg-cyan-300 text-blue-900',
    secondary: 'bg-blue-900/50 text-cyan-100',
    border: 'border-cyan-400',
    preview: { bg: 'linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)', text: '#ecfeff', accent: '#67e8f9', accentText: '#1e3a8a' }
  },
  ruby: {
    bg: 'bg-gradient-to-br from-red-800 to-pink-700',
    text: 'text-red-50',
    accent: 'bg-pink-300 text-red-900',
    secondary: 'bg-red-800/50 text-red-100',
    border: 'border-pink-400',
    preview: { bg: 'linear-gradient(135deg, #991b1b 0%, #be185d 100%)', text: '#fef2f2', accent: '#f9a8d4', accentText: '#7f1d1d' }
  },
  midnight: { 
    bg: 'bg-gradient-to-br from-purple-900 to-indigo-900', 
    text: 'text-purple-50',
    accent: 'bg-purple-300 text-purple-900',
    secondary: 'bg-purple-900/50 text-purple-100',
    border: 'border-purple-400',
    preview: { bg: 'linear-gradient(135deg, #581c87 0%, #312e81 100%)', text: '#faf5ff', accent: '#d8b4fe', accentText: '#581c87' }
  },
  cyberpunk: {
    bg: 'bg-gradient-to-br from-fuchsia-950 to-cyan-950',
    text: 'text-cyan-300',
    accent: 'bg-fuchsia-500 text-cyan-950',
    secondary: 'bg-fuchsia-950/50 text-cyan-300',
    border: 'border-fuchsia-500',
    preview: { bg: 'linear-gradient(135deg, #4a044e 0%, #083344 100%)', text: '#67e8f9', accent: '#d946ef', accentText: '#083344' }
  },
  dracula: {
    bg: 'bg-gradient-to-br from-purple-950 to-pink-950',
    text: 'text-pink-200',
    accent: 'bg-pink-400 text-purple-950',
    secondary: 'bg-purple-950/50 text-pink-200',
    border: 'border-pink-400',
    preview: { bg: 'linear-gradient(135deg, #4a044e 0%, #500724 100%)', text: '#fbcfe8', accent: '#f472b6', accentText: '#4a044e' }
  },
  neon: {
    bg: 'bg-gradient-to-br from-violet-900 to-fuchsia-900',
    text: 'text-yellow-300',
    accent: 'bg-yellow-300 text-violet-900',
    secondary: 'bg-violet-900/50 text-yellow-300',
    border: 'border-yellow-300',
    preview: { bg: 'linear-gradient(135deg, #4c1d95 0%, #701a75 100%)', text: '#fde047', accent: '#fde047', accentText: '#4c1d95' }
  },
  matrix: {
    bg: 'bg-gradient-to-br from-black to-green-950',
    text: 'text-green-400',
    accent: 'bg-green-400 text-black',
    secondary: 'bg-black/50 text-green-400',
    border: 'border-green-400',
    preview: { bg: 'linear-gradient(135deg, #000000 0%, #052e16 100%)', text: '#4ade80', accent: '#4ade80', accentText: '#000000' }
  },
  charcoal: {
    bg: 'bg-gradient-to-br from-neutral-900 to-stone-800',
    text: 'text-stone-200',
    accent: 'bg-stone-400 text-neutral-900',
    secondary: 'bg-neutral-900/50 text-stone-200',
    border: 'border-stone-400',
    preview: { bg: 'linear-gradient(135deg, #171717 0%, #292524 100%)', text: '#e7e5e4', accent: '#a8a29e', accentText: '#171717' }
  },
  dark: { 
    bg: 'bg-black', 
    text: 'text-white',
    accent: 'bg-white text-black',
    secondary: 'bg-zinc-900/50 text-white',
    border: 'border-zinc-800',
    preview: { bg: '#000000', text: '#ffffff', accent: '#ffffff', accentText: '#000000' }
  }
}
