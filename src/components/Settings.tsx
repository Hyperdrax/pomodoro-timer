import { Theme } from '../data/themes'
import ThemeGrid from './ThemeGrid'
import CustomThemeCreator from './CustomThemeCreator'
import { CustomTheme } from '../hooks/useThemeSettings'
import { TimerFont, HideMode } from '../hooks/useTimerSettings'
import { SoundType } from '../utils/soundPlayer'
import { ChangeEvent } from 'react'

type TabType = 'themes' | 'time' | 'sound' | 'timer'

interface SettingsProps {
  show: boolean
  tab: TabType
  onTabChange: (tab: TabType) => void
  theme: Theme | 'custom'
  customTheme: CustomTheme
  onThemeChange: (themeName: string) => void
  onCustomThemeChange: (theme: CustomTheme) => void
  workTime: number
  breakTime: number
  onTimeChange: (workTime: number, breakTime: number) => void
  showCustomTheme: boolean
  onToggleCustomTheme: () => void
  volume: number
  onVolumeChange: (volume: number) => void
  soundType: SoundType
  onSoundTypeChange: (type: SoundType) => void
  customSoundUrl: string
  onCustomSoundUrlChange: (url: string) => void
  onTestSound: () => void
  onStopSound: () => void
  hasCustomTheme: boolean
  onHasCustomThemeChange: (has: boolean) => void
  timerSize: number
  onTimerSizeChange: (size: number) => void
  timerFont: TimerFont
  onTimerFontChange: (font: TimerFont) => void
  timerSpacing: number
  onTimerSpacingChange: (spacing: number) => void
  hideMode: HideMode
  onHideModeChange: (mode: HideMode) => void
}

export default function Settings({ 
  show, 
  tab, 
  onTabChange, 
  theme, 
  customTheme, 
  onThemeChange,
  onCustomThemeChange,
  workTime,
  breakTime,
  onTimeChange,
  showCustomTheme,
  onToggleCustomTheme,
  volume,
  onVolumeChange,
  soundType,
  onSoundTypeChange,
  customSoundUrl,
  onCustomSoundUrlChange,
  onTestSound,
  onStopSound,
  hasCustomTheme,
  onHasCustomThemeChange,
  timerSize,
  onTimerSizeChange,
  timerFont,
  onTimerFontChange,
  timerSpacing,
  onTimerSpacingChange,
  hideMode,
  onHideModeChange
}: SettingsProps) {
  if (!show) return null

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onCustomSoundUrlChange(url)
      onSoundTypeChange('custom')
    }
  }

  return (
    <div 
      className={`mt-8 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl mx-auto border-2 ${
        theme !== 'custom' ? theme.secondary + ' ' + theme.border : ''
      }`}
      style={theme === 'custom' ? {
        backgroundColor: customTheme.bg + '80',
        borderColor: customTheme.accent,
        color: customTheme.text,
        minHeight: '500px'
      } : {
        minHeight: '500px'
      }}
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => onTabChange('themes')}
          className={`px-6 py-2 rounded-lg transition-all ${
            tab === 'themes'
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={tab === 'themes' && theme === 'custom' ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          themes
        </button>
        <button
          onClick={() => onTabChange('time')}
          className={`px-6 py-2 rounded-lg transition-all ${
            tab === 'time'
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={tab === 'time' && theme === 'custom' ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          time
        </button>
        <button
          onClick={() => onTabChange('sound')}
          className={`px-6 py-2 rounded-lg transition-all ${
            tab === 'sound'
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={tab === 'sound' && theme === 'custom' ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          sound
        </button>
        <button
          onClick={() => onTabChange('timer')}
          className={`px-6 py-2 rounded-lg transition-all ${
            tab === 'timer'
              ? (theme !== 'custom' ? theme.accent : '')
              : `opacity-60 hover:opacity-100`
          }`}
          style={tab === 'timer' && theme === 'custom' ? {
            backgroundColor: customTheme.accent,
            color: customTheme.accentText
          } : theme === 'custom' ? { color: customTheme.text } : {}}
        >
          timer
        </button>
      </div>

      {/* Themes Tab */}
      {tab === 'themes' && (
        <div>
          {!showCustomTheme ? (
            <>
              <ThemeGrid 
                currentTheme={typeof theme === 'string' ? theme : 'dark'}
                onThemeChange={onThemeChange}
                customTheme={customTheme}
                hasCustomTheme={hasCustomTheme}
              />
              <button
                onClick={onToggleCustomTheme}
                className={`w-full py-3 rounded-lg border-2 border-dashed transition-all ${
                  theme !== 'custom' ? theme.border + ' ' + theme.text : ''
                } opacity-60 hover:opacity-100`}
                style={theme === 'custom' ? {
                  borderColor: customTheme.accent,
                  color: customTheme.text
                } : {}}
              >
                {hasCustomTheme ? '✏️ edit custom theme' : '+ create custom theme'}
              </button>
            </>
          ) : (
            <CustomThemeCreator
              customTheme={customTheme}
              onChange={onCustomThemeChange}
              onCancel={onToggleCustomTheme}
              onApply={() => {
                onHasCustomThemeChange(true)
                onThemeChange('custom')
                onToggleCustomTheme()
              }}
              theme={customTheme}
            />
          )}
        </div>
      )}

      {/* Time Tab */}
      {tab === 'time' && (
        <div className="space-y-6">
          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              timer duration
            </h3>
            <div className="flex gap-3 justify-center items-center">
              <input
                type="number"
                min="1"
                max="999"
                value={workTime}
                onChange={(e) => onTimeChange(parseInt(e.target.value), breakTime)}
                className={`rounded px-3 py-2 text-center border-2 font-mono ${
                  theme !== 'custom' ? theme.accent + ' ' + theme.border : ''
                }`}
                style={theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText,
                  borderColor: customTheme.accent,
                  width: '6rem',
                  minWidth: '6rem'
                } : {
                  width: '6rem',
                  minWidth: '6rem'
                }}
              />
              <span 
                className={`opacity-50 text-sm ${theme !== 'custom' ? theme.text : ''}`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                /
              </span>
              <input
                type="number"
                min="1"
                max="999"
                value={breakTime}
                onChange={(e) => onTimeChange(workTime, parseInt(e.target.value))}
                className={`rounded px-3 py-2 text-center border-2 font-mono ${
                  theme !== 'custom' ? theme.accent + ' ' + theme.border : ''
                }`}
                style={theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText,
                  borderColor: customTheme.accent,
                  width: '6rem',
                  minWidth: '6rem'
                } : {
                  width: '6rem',
                  minWidth: '6rem'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sound Tab */}
      {tab === 'sound' && (
        <div className="space-y-6">
          {/* Sound Type Selection */}
          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              notification sound
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(['bell', 'chime', 'digital', 'soft'] as SoundType[]).map((sound) => (
                <button
                  key={sound}
                  onClick={() => onSoundTypeChange(sound)}
                  className={`py-2 px-4 rounded-lg transition-all capitalize ${
                    soundType === sound
                      ? (theme !== 'custom' ? theme.accent : '')
                      : `opacity-60 hover:opacity-100`
                  }`}
                  style={soundType === sound && theme === 'custom' ? {
                    backgroundColor: customTheme.accent,
                    color: customTheme.accentText
                  } : theme === 'custom' ? { 
                    color: customTheme.text,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: customTheme.accent + '40'
                  } : {}}
                >
                  {sound}
                </button>
              ))}
            </div>

            {/* Custom Sound Upload */}
            <div 
              className="p-4 rounded-lg border-2 border-dashed mb-4"
              style={theme === 'custom' ? {
                borderColor: customTheme.accent + '60',
                backgroundColor: customTheme.bg + '20'
              } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <label 
                  className={`text-sm font-semibold opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
                  style={theme === 'custom' ? { color: customTheme.text } : {}}
                >
                  custom sound
                </label>
                {soundType === 'custom' && (
                  <span className="text-xs px-2 py-1 rounded" style={theme === 'custom' ? {
                    backgroundColor: customTheme.accent,
                    color: customTheme.accentText
                  } : {}}>
                    active
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter sound URL or drag & drop file..."
                value={customSoundUrl}
                onChange={(e) => {
                  onCustomSoundUrlChange(e.target.value)
                  if (e.target.value) onSoundTypeChange('custom')
                }}
                className={`w-full px-3 py-2 rounded text-sm ${
                  theme !== 'custom' ? theme.accent : ''
                }`}
                style={theme === 'custom' ? {
                  backgroundColor: customTheme.accent + '20',
                  color: customTheme.text,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: customTheme.accent
                } : {}}
              />
              <div className="mt-2">
                <label 
                  className={`text-xs opacity-60 cursor-pointer hover:opacity-100 ${theme !== 'custom' ? theme.text : ''}`}
                  style={theme === 'custom' ? { color: customTheme.text } : {}}
                >
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  📁 or upload local file
                </label>
              </div>
            </div>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 
                className={`text-sm font-semibold opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                volume
              </h3>
              <span 
                className={`text-sm font-mono ${theme !== 'custom' ? theme.text : ''}`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                {volume === 0 ? 'muted' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              {/* Mute/Unmute Button */}
              <button
                onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
                className={`p-2 rounded transition-all ${theme !== 'custom' ? theme.text : ''} opacity-60 hover:opacity-100`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                {volume === 0 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>
                  </svg>
                )}
              </button>
              
              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                style={theme === 'custom' ? {
                  background: `linear-gradient(to right, ${customTheme.accent} 0%, ${customTheme.accent} ${volume * 100}%, ${customTheme.bg}80 ${volume * 100}%, ${customTheme.bg}80 100%)`
                } : {}}
              />
            </div>

            {/* Test Sound Button */}
            <div className="flex gap-2">
              <button
                onClick={onTestSound}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  theme !== 'custom' ? theme.accent : ''
                }`}
                style={theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : {}}
              >
                ▶ test sound
              </button>
              <button
                onClick={onStopSound}
                className={`w-12 h-10 rounded-lg transition-all flex items-center justify-center ${
                  theme !== 'custom' ? theme.secondary + ' ' + theme.border : ''
                } border-2 opacity-60 hover:opacity-100`}
                style={theme === 'custom' ? {
                  backgroundColor: customTheme.bg + '80',
                  borderColor: customTheme.accent,
                  color: customTheme.text
                } : {}}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timer Tab */}
      {tab === 'timer' && (
        <div className="space-y-6">
          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              font size
            </h3>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="48"
                max="288"
                step="12"
                value={timerSize}
                onChange={(e) => onTimerSizeChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <span 
                className={`font-mono text-sm ${theme !== 'custom' ? theme.text : ''}`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                {timerSize}px
              </span>
            </div>
          </div>

          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              font family
            </h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => onTimerFontChange('mono')}
                className={`px-6 py-2 rounded-lg font-mono transition-all ${
                  timerFont === 'mono'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={timerFont === 'mono' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                mono
              </button>
              <button
                onClick={() => onTimerFontChange('sans')}
                className={`px-6 py-2 rounded-lg font-sans transition-all ${
                  timerFont === 'sans'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={timerFont === 'sans' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                sans
              </button>
              <button
                onClick={() => onTimerFontChange('serif')}
                className={`px-6 py-2 rounded-lg font-serif transition-all ${
                  timerFont === 'serif'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={timerFont === 'serif' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                serif
              </button>
            </div>
          </div>

          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              letter spacing
            </h3>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="-10"
                max="30"
                step="1"
                value={timerSpacing}
                onChange={(e) => onTimerSpacingChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <span 
                className={`font-mono text-sm ${theme !== 'custom' ? theme.text : ''}`}
                style={theme === 'custom' ? { color: customTheme.text } : {}}
              >
                {timerSpacing}px
              </span>
            </div>
          </div>

          <div>
            <h3 
              className={`text-sm font-semibold mb-3 opacity-70 ${theme !== 'custom' ? theme.text : ''}`}
              style={theme === 'custom' ? { color: customTheme.text } : {}}
            >
              click to hide
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onHideModeChange('all')}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  hideMode === 'all'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={hideMode === 'all' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                everything
              </button>
              <button
                onClick={() => onHideModeChange('controls')}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  hideMode === 'controls'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={hideMode === 'controls' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                controls only
              </button>
              <button
                onClick={() => onHideModeChange('mode')}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  hideMode === 'mode'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={hideMode === 'mode' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                mode only
              </button>
              <button
                onClick={() => onHideModeChange('none')}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  hideMode === 'none'
                    ? (theme !== 'custom' ? theme.accent : '')
                    : `opacity-60 hover:opacity-100`
                }`}
                style={hideMode === 'none' && theme === 'custom' ? {
                  backgroundColor: customTheme.accent,
                  color: customTheme.accentText
                } : theme === 'custom' ? { color: customTheme.text } : {}}
              >
                nothing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
