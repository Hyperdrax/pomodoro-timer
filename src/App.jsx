import { useState, useEffect, useRef } from 'react'
import './styles.css'
import { themes } from './data/themes'
import Timer from './components/Timer'
import ModeToggle from './components/ModeToggle'
import Controls from './components/Controls'
import Settings from './components/Settings'
import { useTimerSettings } from './hooks/useTimerSettings'
import { useThemeSettings } from './hooks/useThemeSettings'
import { useSoundSettings } from './hooks/useSoundSettings'
import { SoundPlayer } from './utils/soundPlayer'

function App() {
  // Custom hooks for settings
  const timerSettings = useTimerSettings()
  const themeSettings = useThemeSettings()
  const soundSettings = useSoundSettings()

  // Timer state
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWorkMode, setIsWorkMode] = useState(true)
  
  // UI state
  const [showSettings, setShowSettings] = useState(false)
  const [settingsTab, setSettingsTab] = useState('themes')
  const [showCustomTheme, setShowCustomTheme] = useState(false)
  const [hideControls, setHideControls] = useState(false)

  // Sound player ref
  const soundPlayerRef = useRef(null)

  const theme = themeSettings.themeName === 'custom' ? 'custom' : themes[themeSettings.themeName]

  // Create sound player on mount
  useEffect(() => {
    soundPlayerRef.current = new SoundPlayer()
  }, [])

  // Initialize timer based on saved work time
  useEffect(() => {
    setMinutes(isWorkMode ? timerSettings.workTime : timerSettings.breakTime)
  }, [])

  const stopNotificationSound = () => {
    soundPlayerRef.current?.stop()
  }

  const playNotificationSound = () => {
    soundPlayerRef.current?.play(
      soundSettings.soundType,
      soundSettings.volume,
      soundSettings.customSoundUrl
    )
  }

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished!
            setIsActive(false)
            
            // Play sound
            playNotificationSound()
            
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Pomodoro Timer', {
                body: isWorkMode ? 'Work session complete! Time for a break.' : 'Break is over! Back to work.',
                icon: '/vite.svg'
              })
            }
            
            // Auto-switch mode (but don't start)
            const nextMode = !isWorkMode
            setIsWorkMode(nextMode)
            setMinutes(nextMode ? timerSettings.workTime : timerSettings.breakTime)
            setSeconds(0)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, isWorkMode, timerSettings.workTime, timerSettings.breakTime])

  const toggleTimer = () => {
    // Request notification permission on first user interaction
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setIsActive(!isActive)
  }
  
  const resetTimer = () => {
    setIsActive(false)
    setMinutes(isWorkMode ? timerSettings.workTime : timerSettings.breakTime)
    setSeconds(0)
  }

  const switchMode = () => {
    setIsActive(false)
    setIsWorkMode(!isWorkMode)
    setMinutes(!isWorkMode ? timerSettings.workTime : timerSettings.breakTime)
    setSeconds(0)
  }

  const applySettings = (newWorkTime, newBreakTime) => {
    // Handle NaN or empty values by defaulting to current values
    const validWorkTime = isNaN(newWorkTime) || newWorkTime === '' ? timerSettings.workTime : newWorkTime
    const validBreakTime = isNaN(newBreakTime) || newBreakTime === '' ? timerSettings.breakTime : newBreakTime
    
    // Clamp values between 1 and 999
    const clampedWorkTime = Math.max(1, Math.min(999, validWorkTime))
    const clampedBreakTime = Math.max(1, Math.min(999, validBreakTime))
    
    timerSettings.setWorkTime(clampedWorkTime)
    timerSettings.setBreakTime(clampedBreakTime)
    setMinutes(isWorkMode ? clampedWorkTime : clampedBreakTime)
    setSeconds(0)
  }

  return (
    <div 
      className={`min-h-screen ${themeSettings.themeName !== 'custom' ? theme.bg : ''} flex items-center justify-center transition-colors duration-500`}
      style={themeSettings.themeName === 'custom' ? { 
        background: themeSettings.customTheme.bgImage 
          ? `url(${themeSettings.customTheme.bgImage}) center/cover, ${themeSettings.customTheme.bg}`
          : themeSettings.customTheme.bg 
      } : {}}
    >
      <div className="text-center">
        <ModeToggle 
          isWorkMode={isWorkMode}
          workTime={timerSettings.workTime}
          breakTime={timerSettings.breakTime}
          onSwitch={switchMode}
          theme={theme}
          customTheme={themeSettings.customTheme}
          hide={hideControls && (timerSettings.hideMode === 'all' || timerSettings.hideMode === 'mode')}
        />

        <Timer 
          minutes={minutes}
          seconds={seconds}
          theme={theme}
          customTheme={themeSettings.customTheme}
          onClick={() => setHideControls(!hideControls)}
          size={timerSettings.timerSize}
          font={timerSettings.timerFont}
          spacing={timerSettings.timerSpacing}
        />

        {!(hideControls && (timerSettings.hideMode === 'all' || timerSettings.hideMode === 'controls')) && (
          <Controls
            isActive={isActive}
            onToggle={toggleTimer}
            onReset={resetTimer}
            onSettings={() => setShowSettings(!showSettings)}
            theme={theme}
            customTheme={themeSettings.customTheme}
          />
        )}

        <Settings
          show={showSettings}
          tab={settingsTab}
          onTabChange={setSettingsTab}
          theme={theme}
          customTheme={themeSettings.customTheme}
          onThemeChange={themeSettings.setThemeName}
          onCustomThemeChange={themeSettings.setCustomTheme}
          workTime={timerSettings.workTime}
          breakTime={timerSettings.breakTime}
          onTimeChange={applySettings}
          showCustomTheme={showCustomTheme}
          onToggleCustomTheme={() => setShowCustomTheme(!showCustomTheme)}
          volume={soundSettings.volume}
          onVolumeChange={soundSettings.setVolume}
          soundType={soundSettings.soundType}
          onSoundTypeChange={soundSettings.setSoundType}
          customSoundUrl={soundSettings.customSoundUrl}
          onCustomSoundUrlChange={soundSettings.setCustomSoundUrl}
          onTestSound={playNotificationSound}
          onStopSound={stopNotificationSound}
          hasCustomTheme={themeSettings.hasCustomTheme}
          onHasCustomThemeChange={themeSettings.setHasCustomTheme}
          timerSize={timerSettings.timerSize}
          onTimerSizeChange={timerSettings.setTimerSize}
          timerFont={timerSettings.timerFont}
          onTimerFontChange={timerSettings.setTimerFont}
          timerSpacing={timerSettings.timerSpacing}
          onTimerSpacingChange={timerSettings.setTimerSpacing}
          hideMode={timerSettings.hideMode}
          onHideModeChange={timerSettings.setHideMode}
        />
      </div>
    </div>
  )
}

export default App