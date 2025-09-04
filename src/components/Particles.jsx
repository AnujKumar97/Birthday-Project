import { useEffect, useRef } from 'react'

export default function Particles({ running = true }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const hearts = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const spawn = () => {
      const x = Math.random() * w
      const size = 8 + Math.random() * 10
      const speed = 0.6 + Math.random() * 1.2
      hearts.current.push({ x, y: h + size, size, speed, alpha: 0.5 + Math.random() * 0.5 })
      if (hearts.current.length > 80) hearts.current.shift()
    }

    let last = 0
    const loop = (t) => {
      if (!running) return
      const dt = t - last; last = t
      ctx.clearRect(0,0,w,h)
      if (Math.random() < 0.4) spawn()
      hearts.current.forEach(hh => {
        hh.y -= hh.speed * (dt/16)
        ctx.globalAlpha = hh.alpha
        drawHeart(ctx, hh.x, hh.y, hh.size)
      })
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [running])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

function drawHeart(ctx, x, y, size) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(-Math.PI/4)
  const s = size
  ctx.fillStyle = '#ff4d6d'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(0, -s, -s, -s, -s, 0)
  ctx.bezierCurveTo(-s, s, 0, s*1.3, 0, s*1.6)
  ctx.bezierCurveTo(0, s*1.3, s, s, s, 0)
  ctx.bezierCurveTo(s, -s, 0, -s, 0, 0)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}
