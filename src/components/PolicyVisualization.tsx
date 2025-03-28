import { useEffect, useRef } from 'react';
import { PolicyImpact } from '@/types/policy';

interface PolicyVisualizationProps {
  impact: PolicyImpact;
  width?: number;
  height?: number;
}

export default function PolicyVisualization({ 
  impact, 
  width = 400, 
  height = 300 
}: PolicyVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px Inter';
    ctx.fillText(impact.category, 20, 30);

    // Draw metrics
    const metrics = impact.metrics;
    const barWidth = (width - 40) / metrics.length;
    const maxValue = Math.max(...metrics.map(m => m.value));

    metrics.forEach((metric, index) => {
      const x = 20 + index * barWidth;
      const barHeight = (metric.value / maxValue) * (height - 100);
      const y = height - 40 - barHeight;

      // Draw bar
      ctx.fillStyle = getMetricColor(metric.trend);
      ctx.fillRect(x, y, barWidth - 4, barHeight);

      // Draw value
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Inter';
      ctx.fillText(`${metric.value} ${metric.unit}`, x + 4, y - 5);
    });
  }, [impact, width, height]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto"
      />
      <p className="mt-2 text-sm text-gray-600">{impact.description}</p>
    </div>
  );
}

function getMetricColor(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return '#22c55e'; // green-500
    case 'down':
      return '#ef4444'; // red-500
    case 'stable':
      return '#3b82f6'; // blue-500
    default:
      return '#64748b'; // gray-500
  }
} 