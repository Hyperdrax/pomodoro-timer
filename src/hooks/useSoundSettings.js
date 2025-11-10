import { useLocalStorage } from './useLocalStorage'

export function useSoundSettings() {
  const [volume, setVolume] = useLocalStorage('volume', 0.1)
  const [soundType, setSoundType] = useLocalStorage('soundType', 'bell')
  const [customSoundUrl, setCustomSoundUrl] = useLocalStorage('customSoundUrl', '')

  return {
    volume,
    setVolume,
    soundType,
    setSoundType,
    customSoundUrl,
    setCustomSoundUrl
  }
}
