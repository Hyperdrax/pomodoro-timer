import { useLocalStorage } from './useLocalStorage'
import { Dispatch, SetStateAction } from 'react'

export interface CustomTheme {
  name: string
  bg: string
  text: string
  accent: string
  accentText: string
  bgImage: string
}

export interface ThemeSettings {
  themeName: string
  setThemeName: Dispatch<SetStateAction<string>>
  hasCustomTheme: boolean
  setHasCustomTheme: Dispatch<SetStateAction<boolean>>
  customTheme: CustomTheme
  setCustomTheme: Dispatch<SetStateAction<CustomTheme>>
}

export function useThemeSettings(): ThemeSettings {
  const [themeName, setThemeName] = useLocalStorage<string>('themeName', 'dark')
  const [hasCustomTheme, setHasCustomTheme] = useLocalStorage<boolean>('hasCustomTheme', false)
  const [customTheme, setCustomTheme] = useLocalStorage<CustomTheme>('customTheme', {
    name: 'custom',
    bg: '#000000',
    text: '#ffffff',
    accent: '#ffffff',
    accentText: '#000000',
    bgImage: ''
  })

  return {
    themeName,
    setThemeName,
    hasCustomTheme,
    setHasCustomTheme,
    customTheme,
    setCustomTheme
  }
}
