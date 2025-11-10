import { CustomTheme } from '../hooks/useThemeSettings'
import { ChangeEvent } from 'react'

interface CustomThemeCreatorProps {
  customTheme: CustomTheme
  onChange: (theme: CustomTheme) => void
  onCancel: () => void
  onApply: () => void
  theme: CustomTheme
}

export default function CustomThemeCreator({ customTheme, onChange, onCancel, onApply, theme }: CustomThemeCreatorProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onChange({ ...customTheme, bgImage: url })
    }
  }

  return (
    <div>
      {/* Live Preview */}
      <div className="mb-4">
        <div 
          className="relative h-32 rounded-lg border-2 overflow-hidden"
          style={{ 
            background: customTheme.bgImage 
              ? `url(${customTheme.bgImage}) center/cover, ${customTheme.bg}`
              : customTheme.bg,
            borderColor: customTheme.accent
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold font-mono" style={{ color: customTheme.text }}>
              25:00
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <div 
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ 
                backgroundColor: customTheme.accent,
                color: customTheme.accentText
              }}
            >
              preview
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 justify-center">
            <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: customTheme.bg }}></div>
            <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: customTheme.text }}></div>
            <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: customTheme.accent }}></div>
            <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: customTheme.accentText }}></div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold" style={{ color: theme.text }}>
          Background Image <span className="text-sm font-normal opacity-60">(optional)</span>
        </label>
        <input 
          type="text"
          placeholder="Enter image URL"
          value={customTheme.bgImage}
          onChange={(e) => onChange({ ...customTheme, bgImage: e.target.value })}
          className="w-full px-3 py-2 rounded border mb-2"
          style={{
            background: theme.bg,
            color: theme.text,
            borderColor: theme.accent
          }}
        />
        <label 
          className="inline-block px-4 py-2 rounded border cursor-pointer hover:opacity-80"
          style={{
            background: theme.accent,
            color: theme.accentText,
            borderColor: theme.accent
          }}
        >
          Upload Local Image
          <input 
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {customTheme.bgImage && (
          <button
            onClick={() => onChange({ ...customTheme, bgImage: '' })}
            className="ml-2 px-4 py-2 rounded opacity-60 hover:opacity-100"
            style={{ color: theme.text }}
          >
            Clear Image
          </button>
        )}
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm opacity-70 block mb-2">background</label>
          <input
            type="color"
            value={customTheme.bg}
            onChange={(e) => onChange({...customTheme, bg: e.target.value})}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm opacity-70 block mb-2">text</label>
          <input
            type="color"
            value={customTheme.text}
            onChange={(e) => onChange({...customTheme, text: e.target.value})}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm opacity-70 block mb-2">accent bg</label>
          <input
            type="color"
            value={customTheme.accent}
            onChange={(e) => onChange({...customTheme, accent: e.target.value})}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm opacity-70 block mb-2">accent text</label>
          <input
            type="color"
            value={customTheme.accentText}
            onChange={(e) => onChange({...customTheme, accentText: e.target.value})}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg transition-all opacity-60 hover:opacity-100"
          style={{
            color: customTheme.text,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: customTheme.accent
          }}
        >
          cancel
        </button>
        <button
          onClick={onApply}
          className="flex-1 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          }}
        >
          apply theme
        </button>
      </div>
    </div>
  )
}
