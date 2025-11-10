import { useLocalStorage } from './useLocalStorage'

export function useTimerSettings() {
  const [workTime, setWorkTime] = useLocalStorage('workTime', 25)
  const [breakTime, setBreakTime] = useLocalStorage('breakTime', 5)
  const [timerSize, setTimerSize] = useLocalStorage('timerSize', 144)
  const [timerFont, setTimerFont] = useLocalStorage('timerFont', 'mono')
  const [timerSpacing, setTimerSpacing] = useLocalStorage('timerSpacing', 0)
  const [hideMode, setHideMode] = useLocalStorage('hideMode', 'all')

  return {
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    timerSize,
    setTimerSize,
    timerFont,
    setTimerFont,
    timerSpacing,
    setTimerSpacing,
    hideMode,
    setHideMode
  }
}
