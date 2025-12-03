import { useState, useRef, useEffect } from 'react'
import RealTimeMonitoring from './components/RealTimeMonitoring'
import LogSearch from './components/LogSearch'
import DataAnalytics from './components/DataAnalytics'
import Alerting from './components/Alerting'
import Dashboard from './components/Dashboard'

type Feature = 'monitoring' | 'search' | 'analytics' | 'alerting' | 'dashboard'

const features: { id: Feature; name: string; component: React.ComponentType }[] = [
  { id: 'monitoring', name: 'Real-Time Monitoring', component: RealTimeMonitoring },
  { id: 'search', name: 'Log Search', component: LogSearch },
  { id: 'analytics', name: 'Data Analytics', component: DataAnalytics },
  { id: 'alerting', name: 'Alerting', component: Alerting },
  { id: 'dashboard', name: 'Dashboard', component: Dashboard },
]

function App() {
  const [activeFeature, setActiveFeature] = useState<Feature>('monitoring')
  const [showLeftBlur, setShowLeftBlur] = useState(false)
  const [showRightBlur, setShowRightBlur] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const ActiveComponent = features.find(f => f.id === activeFeature)?.component || RealTimeMonitoring

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftBlur(scrollLeft > 0)
      setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      // Check on resize as well
      window.addEventListener('resize', checkScrollPosition)
      return () => {
        container.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            LogEase
          </h1>
          <p className="text-gray-400 text-lg">Enterprise Log Management & Analytics Platform</p>
        </div>

        {/* Navigation Buttons with Scroll */}
        <div className="flex items-center gap-2 mb-8 max-w-6xl mx-auto relative overflow-hidden">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center z-10"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Container with Blur Overlays */}
          <div className="flex-1 relative min-w-0 overflow-hidden">
            {/* Left Blur Overlay */}
            {showLeftBlur && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-gray-900 to-transparent backdrop-blur-sm pointer-events-none z-10" />
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeFeature === feature.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-105'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:text-cyan-400 hover:border-cyan-500/50'
                  }`}
                >
                  {feature.name}
                </button>
              ))}
            </div>

            {/* Right Blur Overlay */}
            {showRightBlur && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-gray-900 to-transparent backdrop-blur-sm pointer-events-none z-10" />
            )}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center z-10"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Feature Card Container */}
        <div className="max-w-6xl mx-auto">
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}

export default App
