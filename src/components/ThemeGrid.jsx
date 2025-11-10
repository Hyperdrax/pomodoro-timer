import { themes } from '../data/themes'

export default function ThemeGrid({ currentTheme, onThemeChange, customTheme, hasCustomTheme }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
      {Object.keys(themes).map((themeName) => {
        const t = themes[themeName].preview
        return (
          <button
            key={themeName}
            onClick={() => onThemeChange(themeName)}
            className={`relative h-24 rounded-lg border-2 transition-all overflow-hidden ${
              currentTheme === themeName 
                ? 'border-white scale-105 shadow-lg' 
                : 'border-transparent hover:scale-105'
            }`}
            style={{ 
              background: typeof t.bg === 'string' && t.bg.includes('gradient') ? t.bg : t.bg,
              color: t.text
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold capitalize" style={{ color: t.text }}>
                {themeName}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex gap-1 justify-center">
              <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.bg.includes('gradient') ? t.text : t.bg }}></div>
              <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.text }}></div>
              <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.accent }}></div>
              <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.accentText }}></div>
            </div>
          </button>
        )
      })}
      
      {/* Custom Theme - only show if created */}
      {hasCustomTheme && (
        <button
          onClick={() => onThemeChange('custom')}
          className={`relative h-24 rounded-lg border-2 transition-all overflow-hidden ${
            currentTheme === 'custom' 
              ? 'border-white scale-105 shadow-lg' 
              : 'border-transparent hover:scale-105'
          }`}
          style={{ 
            background: customTheme.bg,
            color: customTheme.text
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold capitalize" style={{ color: customTheme.text }}>
              Custom
            </span>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex gap-1 justify-center">
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: customTheme.bg }}></div>
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: customTheme.text }}></div>
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: customTheme.accent }}></div>
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: customTheme.accentText }}></div>
          </div>
        </button>
      )}
    </div>
  )
}