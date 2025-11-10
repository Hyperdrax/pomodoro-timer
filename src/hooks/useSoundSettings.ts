import { useLocalStorage } from './useLocalStorage'
import { Dispatch, SetStateAction } from 'react'
import { SoundType } from '../utils/soundPlayer'

export interface SoundSettings {
  volume: number
  setVolume: Dispatch<SetStateAction<number>>
  soundType: SoundType
  setSoundType: Dispatch<SetStateAction<SoundType>>
  customSoundUrl: string
  setCustomSoundUrl: Dispatch<SetStateAction<string>>
}

export function useSoundSettings(): SoundSettings {
  const [volume, setVolume] = useLocalStorage<number>('volume', 0.1)
  const [soundType, setSoundType] = useLocalStorage<SoundType>('soundType', 'bell')
  const [customSoundUrl, setCustomSoundUrl] = useLocalStorage<string>('customSoundUrl', '')

  return {
    volume,
    setVolume,
    soundType,
    setSoundType,
    customSoundUrl,
    setCustomSoundUrl
  }
}
