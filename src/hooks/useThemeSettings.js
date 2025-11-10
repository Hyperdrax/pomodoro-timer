import { useLocalStorage } from './useLocalStorage'

export function useThemeSettings() {
  const [themeName, setThemeName] = useLocalStorage('themeName', 'dark')
  const [hasCustomTheme, setHasCustomTheme] = useLocalStorage('hasCustomTheme', false)
  const [customTheme, setCustomTheme] = useLocalStorage('customTheme', {
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
