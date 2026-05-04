'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

export function useAudio() {
  const [playingText, setPlayingText] = useState(null)
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const synthRef = useRef(null)
  const playAllRef = useRef(false)

  useEffect(() => {
    synthRef.current = typeof window !== 'undefined' ? window.speechSynthesis : null
  }, [])

  const play = useCallback((text) => {
    const s = synthRef.current
    if (!s) return
    s.cancel()
    setPlayingText(text)
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = speed
    u.onend = () => setPlayingText(null)
    s.speak(u)
  }, [speed])

  const stop = useCallback(() => {
    synthRef.current?.cancel()
    setPlayingText(null)
    setIsPlayingAll(false)
    playAllRef.current = false
  }, [])

  const playAll = useCallback((phrases) => {
    if (isPlayingAll) { stop(); return }
    if (!phrases.length) return
    setIsPlayingAll(true)
    playAllRef.current = true

    const playSeq = (list, idx) => {
      if (!playAllRef.current) return
      if (idx >= list.length) {
        if (isLoop) { playSeq(list, 0); return }
        setIsPlayingAll(false); setPlayingText(null); return
      }
      const text = list[idx]
      setPlayingText(text)
      const s = synthRef.current
      if (!s) return
      s.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'; u.rate = speed
      u.onend = () => setTimeout(() => playSeq(list, idx + 1), 300)
      s.speak(u)
    }
    playSeq(phrases, 0)
  }, [isPlayingAll, isLoop, speed, stop])

  return { playingText, isPlayingAll, isLoop, speed, play, stop, playAll, setIsLoop, setSpeed }
}
