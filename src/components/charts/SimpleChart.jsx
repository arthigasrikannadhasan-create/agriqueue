import { useEffect, useRef } from 'react'

export default function SimpleChart({ data, type = 'bar', height = 200, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const h = canvas.height

    // Clear
    ctx.clearRect(0, 0, width, h)

    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = h - padding.top - padding.bottom

    const values = data.map(d => d.value)
    const maxValue = Math.max(...values, 1)
    const minValue = 0

    const getY = (value) => {
      return padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
    }

    const getX = (index) => {
      return padding.left + (index / (data.length - 1 || 1)) * chartWidth
    }

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // Labels
      ctx.fillStyle = '#9ca3af'
      ctx.font = '10px Inter, sans-serif'
      ctx.textAlign = 'right'
      const value = maxValue - (i / 4) * (maxValue - minValue)
      ctx.fillText(Math.round(value), padding.left - 8, y + 3)
    }

    if (type === 'bar') {
      const barWidth = chartWidth / data.length * 0.6
      const gap = (chartWidth / data.length) * 0.4

      data.forEach((item, index) => {
        const x = padding.left + (index / data.length) * chartWidth + gap / 2
        const barHeight = ((item.value - minValue) / (maxValue - minValue)) * chartHeight
        const y = padding.top + chartHeight - barHeight

        // Bar
        const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartHeight)
        gradient.addColorStop(0, '#2d6a4f')
        gradient.addColorStop(1, '#52b788')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
        ctx.fill()

        // Label
        ctx.fillStyle = '#6b7280'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(item.label, x + barWidth / 2, padding.top + chartHeight + 18)
      })
    } else {
      // Line chart
      ctx.beginPath()
      ctx.strokeStyle = '#2d6a4f'
      ctx.lineWidth = 2
      data.forEach((item, index) => {
        const x = getX(index)
        const y = getY(item.value)
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Points
      data.forEach((item, index) => {
        const x = getX(index)
        const y = getY(item.value)
        
        ctx.fillStyle = '#2d6a4f'
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Labels
        ctx.fillStyle = '#6b7280'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(item.label, x, padding.top + chartHeight + 18)
      })
    }

    // X axis
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight)
    ctx.lineTo(width - padding.right, padding.top + chartHeight)
    ctx.stroke()

    // Y axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.stroke()

  }, [data, type])

  return (
    <div className={`w-full ${className}`}>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={height * 2}
        className="w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  )
}

// Polyfill for roundRect if needed
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radii) {
    const r = Array.isArray(radii) ? radii : [radii, radii, radii, radii]
    const [tl, tr, br, bl] = r.map(v => Math.min(v || 0, Math.min(w, h) / 2))
    this.moveTo(x + tl, y)
    this.arcTo(x + w, y, x + w, y + h, tr)
    this.arcTo(x + w, y + h, x, y + h, br)
    this.arcTo(x, y + h, x, y, bl)
    this.arcTo(x, y, x + w, y, tl)
    this.closePath()
    return this
  }
}