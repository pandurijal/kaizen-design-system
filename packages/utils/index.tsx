import * as React from "react"

interface withDeprecatedWarning {
  message: string
}

export const withDeprecatedWarning = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { message }: withDeprecatedWarning
): React.ComponentType<P> =>
  class extends React.Component<P> {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      if (process?.env?.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`KAIZEN WARNING: ${message}`)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
