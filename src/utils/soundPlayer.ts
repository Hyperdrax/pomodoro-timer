export type SoundType = 'bell' | 'chime' | 'digital' | 'soft' | 'custom'

export class SoundPlayer {
  private audioContext: AudioContext | null = null
  private customAudio: HTMLAudioElement | null = null
  private activeOscillators: OscillatorNode[] = []

  private _ensureAudioContext(): void {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  stop(): void {
    // Stop custom audio
    if (this.customAudio) {
      this.customAudio.pause()
      this.customAudio.currentTime = 0
    }
    
    // Stop all oscillators
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Already stopped
      }
    })
    this.activeOscillators = []
  }

  play(soundType: SoundType, volume: number, customSoundUrl?: string): void {
    if (volume === 0) return // Muted
    
    // Ensure AudioContext is created (requires user gesture)
    this._ensureAudioContext()
    
    // Stop any currently playing sound
    this.stop()
    
    // Custom sound from URL/file
    if (soundType === 'custom' && customSoundUrl) {
      this.customAudio = new Audio(customSoundUrl)
      this.customAudio.volume = volume
      this.customAudio.play().catch(err => console.error('Error playing custom sound:', err))
      return
    }

    // Web Audio API sounds
    if (!this.audioContext) return
    const now = this.audioContext.currentTime
    
    if (soundType === 'bell') {
      this._playBell(now, volume)
    } else if (soundType === 'chime') {
      this._playChime(now, volume)
    } else if (soundType === 'digital') {
      this._playDigital(now, volume)
    } else if (soundType === 'soft') {
      this._playSoft(now, volume)
    }
  }

  private _playBell(now: number, volume: number): void {
    if (!this.audioContext) return
    
    const frequencies = [523.25, 659.25, 783.99] // C, E, G
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)
      
      oscillator.frequency.value = freq
      oscillator.type = 'sine'
      
      const startTime = now + index * 0.1
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, startTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 1)
      this.activeOscillators.push(oscillator)
    })
  }

  private _playChime(now: number, volume: number): void {
    if (!this.audioContext) return
    
    const frequencies = [440, 554.37, 659.25, 880]
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)
      
      oscillator.frequency.value = freq
      oscillator.type = 'triangle'
      
      const startTime = now + index * 0.15
      gainNode.gain.setValueAtTime(volume * 0.2, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 2)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 2)
      this.activeOscillators.push(oscillator)
    })
  }

  private _playDigital(now: number, volume: number): void {
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'square'
    
    gainNode.gain.setValueAtTime(volume * 0.2, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
    
    oscillator.start(now)
    oscillator.stop(now + 0.2)
    this.activeOscillators.push(oscillator)
  }

  private _playSoft(now: number, volume: number): void {
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()
    
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = 432
    oscillator.type = 'sine'
    filter.type = 'lowpass'
    filter.frequency.value = 1000
    
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(volume * 0.25, now + 0.3)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2)
    
    oscillator.start(now)
    oscillator.stop(now + 2)
    this.activeOscillators.push(oscillator)
  }
}
