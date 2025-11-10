import { Theme } from '../data/themes'
import { CustomTheme } from '../hooks/useThemeSettings'

interface ModeToggleProps {
  isWorkMode: boolean
  workTime: number
  breakTime: number
  onSwitch: () => void
  theme: Theme | 'custom'
  customTheme: CustomTheme
  hide: boolean
}

export default function ModeToggle({ isWorkMode, workTime, breakTime, onSwitch, theme, customTheme, hide }: ModeToggleProps) {
  if (hide) return null
  
  return (
    <div className="mb-8">
      <div 
        className={`inline-flex gap-2 backdrop-blur-sm rounded-full p-1 border-2 ${theme !== 'custom' ? theme.secondary + ' ' + theme.border : ''}`}
        style={theme === 'custom' ? { 
          backgroundColor: customTheme.bg + '80',
          borderColor: customTheme.accent,
          color: customTheme.text
        } : {}}
      >
        <button
          onClick={() => !isWorkMode && onSwitch()}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            isWorkMode 
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={theme === 'custom' && isWorkMode ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          {workTime}
        </button>
        <button
          onClick={() => isWorkMode && onSwitch()}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            !isWorkMode 
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={theme === 'custom' && !isWorkMode ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          {breakTime}
        </button>
      </div>
    </div>
  )
}
