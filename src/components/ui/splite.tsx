'use client'

import { Suspense, lazy, Component, ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('Spline 3D failed to load:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function SplineFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-lg">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          <Sparkles className="w-16 h-16 text-primary/50" />
        </div>
        <Sparkles className="w-16 h-16 text-primary" />
      </div>
      <p className="mt-4 text-muted-foreground text-sm text-center px-4">
        3D Experience
      </p>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
