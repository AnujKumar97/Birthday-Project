import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import Particles from './components/Particles.jsx'
import Balloons from './components/Balloons.jsx'

const photos = [
  { src: '/images/1.jpg', quote: 'Your smile brightens my world 🌸' },
  { src: '/images/2.jpg', quote: 'Every day with you is a gift 🎁' },
  { src: '/images/3.jpg', quote: 'You make my heart dance 💃' },
  { src: '/images/4.jpg', quote: 'Forever my sunshine ☀️' },
  { src: '/images/5.jpg', quote: 'My partner in laughter 😂❤️' },
  { src: '/images/6.jpg', quote: 'Adventure is better with you 🌍' },
  { src: '/images/7.jpg', quote: 'You are my favorite story ✨' },
  { src: '/images/8.jpg', quote: 'You’re my happy place 🌹' },
  { src: '/images/9.jpg', quote: 'With you, everything feels right 💘' },
  { src: '/images/10.jpg', quote: 'Here’s to us, always 🥂' },
]

export default function App() {
  const [stage, setStage] = useState('landing') // landing | gallery
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let timer
    if (stage === 'gallery' && auto) {
      timer = setInterval(() => setIdx(i => (i + 1) % photos.length), 3000)
    }
    return () => timer && clearInterval(timer)
  }, [stage, auto])

  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play(); setPlaying(true) }
  }

  const next = () => setIdx(i => (i + 1) % photos.length)
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length)

  return (
    <div className="app-root">
      <Particles />
      <audio ref={audioRef} src="/song.mp3" loop />

      <div className="music-toggle" onClick={toggleMusic} title={playing ? 'Pause music' : 'Play music'}>
        {playing ? '⏸️' : '▶️'}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'landing' ? (
          <motion.section
            key="landing"
            className="landing center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <Balloons />
            <h1 className="title glow">Happy Birthday, My Love 💖</h1>
            <p className="tagline">Made with love — just for you.</p>

            <motion.button
              className="primary-btn"
              onClick={() => { setStage('gallery'); toggleMusic() }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Gift 🎁
            </motion.button>

            <Confetti numberOfPieces={180} recycle={false} />
          </motion.section>
        ) : (
          <motion.section
            key="gallery"
            className="gallery center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="polaroid">
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={photos[idx].src}
                  alt="memory"
                  className="photo"
                  initial={{ opacity: 0, x: 60, rotate: 6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -60, rotate: -6 }}
                  transition={{ duration: 0.7 }}
                  draggable={false}
                />
              </AnimatePresence>
              <div className="quote">{photos[idx].quote}</div>
              <div className="tape t1" />
              <div className="tape t2" />
            </div>

            <div className="controls">
              <button className="ghost" onClick={prev}>← Prev</button>
              <button className="ghost" onClick={next}>Next →</button>
              <label className="toggle">
                <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} />
                <span>Auto-play</span>
              </label>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
