import './SceneSkeleton.css'

export default function SceneSkeleton({ isReady }) {
  return (
    <div className={`scene-loader-overlay ${isReady ? 'fade-out' : ''}`}>
      <div className="fog-layer fog-1"></div>
      <div className="fog-layer fog-2"></div>
    </div>
  )
}