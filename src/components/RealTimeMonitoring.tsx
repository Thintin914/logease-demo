import { useRive } from 'rive-react'
// import { useStateMachineInput } from 'rive-react' // Uncomment when you need to control state machine inputs

const RealTimeMonitoring = () => {
  // Rive animation setup
  // Replace 'your-animation.riv' with your actual Rive animation file path
  // Place your .riv files in the public folder or src/assets folder
  const { RiveComponent } = useRive({
    src: '/animations/realtime-monitoring.riv', // Update this path to your animation file
    autoplay: true,
    stateMachines: 'State Machine 1', // Update with your state machine name
  })

  // Example: Control state machine inputs (uncomment and customize as needed)
  // const { rive } = useRive({ ... })
  // const onHover = useStateMachineInput(rive, 'State Machine 1', 'hover', true)
  // const onClick = useStateMachineInput(rive, 'State Machine 1', 'click', false)

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/20 p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
        Real-Time Monitoring
      </h2>
      <p className="text-gray-400 mb-6">
        Monitor your logs and system metrics in real-time with instant updates and alerts.
      </p>
      
      {/* Rive Animation Container */}
      <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-cyan-500/30 overflow-hidden backdrop-blur-sm">
        <div className="h-64 w-full flex items-center justify-center">
          {RiveComponent && (
            <div className="w-full h-full">
              <RiveComponent />
            </div>
          )}
          {/* Fallback message when animation file is not found */}
          {!RiveComponent && (
            <div className="text-center">
              <p className="text-lg mb-2 text-cyan-300">Rive Animation Placeholder</p>
              <p className="text-sm text-gray-400">
                Add your .riv file to <code className="bg-gray-800/50 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30">public/animations/realtime-monitoring.riv</code>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Or update the path in RealTimeMonitoring.tsx
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RealTimeMonitoring

