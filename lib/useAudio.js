'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

export function useAudio() {
  const [playingText, setPlayingText] = useState(null)
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const synthRef = useRef(null)
  const playAllRef = useRef(false)
  // ループ・速度は再生シーケンスの途中でも反映させたいので ref にも持つ
  const isLoopRef = useRef(false)
  const speedRef = useRef(1.0)
  const voiceRef = useRef(null)

  useEffect(() => { isLoopRef.current = isLoop }, [isLoop])
  useEffect(() => { speedRef.current = speed }, [speed])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const s = window.speechSynthesis
    synthRef.current = s
    if (!s) return
    // 端末デフォルトが日本語音声のことがあるため en-US を明示的に選ぶ
    const pickVoice = () => {
      const voices = s.getVoices()
      const preferred = ['Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Samantha']
      voiceRef.current =
        voices.find(v => preferred.some(name => v.name.includes(name))) ||
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang?.startsWith('en')) ||
        null
    }
    pickVoice()
    // Chrome では getVoices() が最初は空で、voiceschanged 後に取得できる
    s.addEventListener?.('voiceschanged', pickVoice)
    return () => s.removeEventListener?.('voiceschanged', pickVoice)
  }, [])

  const speak = useCallback((text, onend) => {
    const s = synthRef.current
    if (!s) return
    s.cancel()
    setPlayingText(text)
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    if (voiceRef.current) u.voice = voiceRef.current
    u.rate = speedRef.current
    u.onend = onend
    s.speak(u)
  }, [])

  const play = useCallback((text) => {
    // 全再生中に単発再生したら全再生は止める
    playAllRef.current = false
    setIsPlayingAll(false)
    speak(text, () => setPlayingText(null))
  }, [speak])

  const stop = useCallback(() => {
    playAllRef.current = false
    synthRef.current?.cancel()
    setPlayingText(null)
    setIsPlayingAll(false)
  }, [])

  const playAll = useCallback((phrases) => {
    if (playAllRef.current) { stop(); return }
    if (!phrases.length) return
    setIsPlayingAll(true)
    playAllRef.current = true

    const playSeq = (list, idx) => {
      if (!playAllRef.current) return
      if (idx >= list.length) {
        if (isLoopRef.current) { playSeq(list, 0); return }
        playAllRef.current = false
        setIsPlayingAll(false)
        setPlayingText(null)
        return
      }
      speak(list[idx], () => setTimeout(() => playSeq(list, idx + 1), 300))
    }
    playSeq(phrases, 0)
  }, [speak, stop])

  return { playingText, isPlayingAll, isLoop, speed, play, stop, playAll, setIsLoop, setSpeed }
}
