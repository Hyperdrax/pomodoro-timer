import { useLocalStorage } from './useLocalStorage'
import { Dispatch, SetStateAction } from 'react'

export type TimerFont = 'mono' | 'sans' | 'serif'
export type HideMode = 'all' | 'controls' | 'mode' | 'none'

export interface TimerSettings {
  workTime: number
  setWorkTime: Dispatch<SetStateAction<number>>
  breakTime: number
  setBreakTime: Dispatch<SetStateAction<number>>
  timerSize: number
  setTimerSize: Dispatch<SetStateAction<number>>
  timerFont: TimerFont
  setTimerFont: Dispatch<SetStateAction<TimerFont>>
  timerSpacing: number
  setTimerSpacing: Dispatch<SetStateAction<number>>
  hideMode: HideMode
  setHideMode: Dispatch<SetStateAction<HideMode>>
}

export function useTimerSettings(): TimerSettings {
  const [workTime, setWorkTime] = useLocalStorage<number>('workTime', 25)
  const [breakTime, setBreakTime] = useLocalStorage<number>('breakTime', 5)
  const [timerSize, setTimerSize] = useLocalStorage<number>('timerSize', 144)
  const [timerFont, setTimerFont] = useLocalStorage<TimerFont>('timerFont', 'mono')
  const [timerSpacing, setTimerSpacing] = useLocalStorage<number>('timerSpacing', 0)
  const [hideMode, setHideMode] = useLocalStorage<HideMode>('hideMode', 'all')

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
