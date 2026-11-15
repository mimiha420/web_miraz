import { StrictMode, useState, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import TV from './TV/TV.jsx'
import SceneSkeleton from './SceneSkeleton.jsx'

// Funkcje importujące trzymamy osobno, żeby móc je też użyć do prefetchu
const loadApp = () => import('./App.jsx')
const loadAppClean = () => import('./AppClean.jsx') // dostosuj ścieżkę

const App = lazy(loadApp)
const AppClean = lazy(loadAppClean)

function RootController() {
  const [appMode, setAppMode] = useState(null) // null = TV | true = App | false = AppClean

  if (appMode === null) {
    return (
      <TV
        onComplete={(result) => setAppMode(result)}
        // opcjonalnie: wywołaj w TV np. onMouseEnter przycisków
        onPrefetch={(result) => (result ? loadApp() : loadAppClean())}
      />
    )
  }

  return (
    <Suspense fallback={<SceneSkeleton />}>
      {appMode ? <App /> : <AppClean />}
    </Suspense>
  )
}

// Prefetch w tle po załadowaniu strony (gdy przeglądarka ma wolną chwilę)
const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
idle(() => {
  loadApp()
  loadAppClean()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootController />
  </StrictMode>,
)