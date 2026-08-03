import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  message: string
  action: string
}

type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error(error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="feedback-page" id="main-content" tabIndex={-1}>
        <p className="eyebrow">Error</p>
        <h1>{this.props.title}</h1>
        <p>{this.props.message}</p>
        <button className="button primary" type="button" onClick={() => window.location.reload()}>
          {this.props.action}
        </button>
      </main>
    )
  }
}
