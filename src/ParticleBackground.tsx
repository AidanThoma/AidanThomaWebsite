import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const maxParticles = 180
const linkDistance = 150

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      console.error('Unable to initialize the homelab particle background canvas.')
      return
    }

    const interactionTarget: HTMLElement = canvas.closest('.homelab-hero') ?? canvas
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: 0, y: 0, active: false }
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let particleLimit = 0
    let animationFrame = 0
    let reducedMotion = motionPreference.matches

    const createParticle = (origin?: { x: number; y: number }): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.15 + Math.random() * 0.55

      return {
        x: origin ? origin.x + (Math.random() - 0.5) * 24 : Math.random() * width,
        y: origin ? origin.y + (Math.random() - 0.5) * 24 : Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.25 + Math.random() * 1.5,
        color: Math.random() < 0.25 ? 'rgba(59, 122, 185, 0.72)' : 'rgba(143, 194, 245, 0.92)',
      }
    }

    const renderFrame = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy

          if (pointer.active) {
            const dx = particle.x - pointer.x
            const dy = particle.y - pointer.y
            const distance = Math.hypot(dx, dy)

            if (distance > 0 && distance < 100) {
              const force = ((100 - distance) / 100) * 1.2
              particle.x += (dx / distance) * force
              particle.y += (dy / distance) * force
            }
          }

          if (particle.x < -particle.radius) particle.x = width + particle.radius
          if (particle.x > width + particle.radius) particle.x = -particle.radius
          if (particle.y < -particle.radius) particle.y = height + particle.radius
          if (particle.y > height + particle.radius) particle.y = -particle.radius
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)

          if (distance < linkDistance) {
            context.beginPath()
            context.strokeStyle = `rgba(59, 122, 185, ${(1 - distance / linkDistance) * 0.24})`
            context.lineWidth = 1
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }

        context.beginPath()
        context.fillStyle = particle.color
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(renderFrame)
      }
    }

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height

      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      particleLimit = Math.min(maxParticles, Math.max(24, Math.round((width * height * maxParticles) / 800000)))
      particles = particles.slice(0, particleLimit)
      while (particles.length < particleLimit) {
        particles.push(createParticle())
      }

      window.cancelAnimationFrame(animationFrame)
      renderFrame()
    }

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height
    }

    const clearPointer = () => {
      pointer.active = false
    }

    const pushParticles = (event: PointerEvent) => {
      updatePointer(event)

      if (!pointer.active) return

      for (let i = 0; i < 4 && particles.length < particleLimit; i += 1) {
        particles.push(createParticle(pointer))
      }

      if (reducedMotion) renderFrame()
    }

    const updateMotionPreference = () => {
      reducedMotion = motionPreference.matches
      window.cancelAnimationFrame(animationFrame)
      renderFrame()
    }

    interactionTarget.addEventListener('pointermove', updatePointer)
    interactionTarget.addEventListener('pointerleave', clearPointer)
    interactionTarget.addEventListener('pointerdown', pushParticles)
    motionPreference.addEventListener('change', updateMotionPreference)
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
      motionPreference.removeEventListener('change', updateMotionPreference)
      interactionTarget.removeEventListener('pointermove', updatePointer)
      interactionTarget.removeEventListener('pointerleave', clearPointer)
      interactionTarget.removeEventListener('pointerdown', pushParticles)
    }
  }, [])

  return (
    <div className="homelab-particle-field" aria-hidden="true">
      <canvas className="homelab-particle-canvas" ref={canvasRef} />
    </div>
  )
}

export default ParticleBackground
