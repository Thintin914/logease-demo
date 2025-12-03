const Dashboard = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/20 p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
        Custom Dashboards
      </h2>
      <p className="text-gray-400 mb-6">
        Create custom dashboards with widgets, charts, and metrics tailored to your needs.
      </p>
      <div className="bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-lg p-6 border border-teal-500/30 backdrop-blur-sm">
        <p className="text-lg text-cyan-300">Feature content will go here...</p>
      </div>
    </div>
  )
}

export default Dashboard

