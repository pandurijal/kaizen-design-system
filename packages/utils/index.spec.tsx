import "@testing-library/jest-dom/extend-expect"

import { cleanup, render, screen } from "@testing-library/react"
import * as React from "react"
import { withDeprecatedWarning } from "./index"

const logger = global.console

afterEach(cleanup)

interface MockAppProps {
  test?: string
}
const MockApp = (props: MockAppProps) => <p>Props: {props.test}</p>

describe("<withDeprecatedWarning />", () => {
  it("should passthrough a component's props", () => {
    const MockWithHOC = withDeprecatedWarning(MockApp, {
      message: "this is deprecated",
    })
    render(<MockWithHOC test="hello" />)

    expect(screen.getByText(/^Props: /).textContent).toBe("Props: hello")
  })

  it("should log a warning to the console", () => {
    const spy = jest.spyOn(logger, "warn")
    const MockWithHOC = withDeprecatedWarning(MockApp, {
      message: "this is deprecated",
    })
    render(<MockWithHOC test="hello" />)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith("KAIZEN WARNING: this is deprecated")
    spy.mockRestore()
  })

  it("should not log more than once for a component of the same type", () => {
    const spy = jest.spyOn(logger, "warn")
    const MockWithHOC = withDeprecatedWarning(MockApp, {
      message: "this is deprecated",
    })
    render(
      <>
        <MockWithHOC test="hello" />
        <MockWithHOC />
      </>
    )
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
