import { Theme } from '../data/themes'
import { CustomTheme } from '../hooks/useThemeSettings'
import { TimerFont } from '../hooks/useTimerSettings'

interface TimerProps {
  minutes: number
  seconds: number
  theme: Theme | 'custom'
  customTheme: CustomTheme
  onClick: () => void
  size: number
  font: TimerFont
  spacing: number
}

export default function Timer({ minutes, seconds, theme, customTheme, onClick, size, font, spacing }: TimerProps) {
  const fontFamily = font === 'mono' ? 'font-mono' : font === 'sans' ? 'font-sans' : 'font-serif'
  
  return (
    <div className="mb-12 flex justify-center">
      <div 
        onClick={onClick}
        className={`font-light tracking-tight cursor-pointer transition-opacity hover:opacity-80 text-center ${fontFamily} ${theme !== 'custom' ? theme.text : ''}`}
        style={theme === 'custom' ? { 
          color: customTheme.text,
          fontSize: `${size}px`,
          letterSpacing: `${spacing}px`,
          minWidth: '10ch'
        } : { 
          fontSize: `${size}px`,
          letterSpacing: `${spacing}px`,
          minWidth: '10ch'
        }}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  )
}
