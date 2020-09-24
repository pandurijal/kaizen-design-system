// React
import {
  GenericModal,
  ModalAccessibleLabel,
  ModalBody,
} from "@kaizen/draft-modal"
import { IconButton } from "@kaizen/component-library"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
// import ReactTooltip from "react-tooltip"
import classNames from "classnames"
import closeIcon from "@kaizen/component-library/icons/close.icon.svg"

const styles = require("./ModalDrawer.scss")

interface Props {
  readonly isOpen: boolean
  readonly type: "positive" | "negative"
  readonly title: string
  readonly onDismiss: () => void
  readonly children: React.ReactNode
  readonly footer?: React.ReactNode
}

function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined
  )
  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowHeight
}

type ModalDrawer = React.FunctionComponent<Props>

export const ModalDrawer: ModalDrawer = ({
  isOpen,
  title,
  onDismiss,
  children,
  footer,
}: Props) => {
  return (
    <GenericModal
      isOpen={isOpen}
      focusLockDisabled
      onEscapeKeyup={onDismiss}
      onOutsideModalClick={onDismiss}
    >
      <Content footer={footer} onDismiss={onDismiss} title={title}>
        {children}
      </Content>
    </GenericModal>
  )
}

interface ContentProps {
  readonly title: string
  readonly onDismiss: () => void
  readonly children: React.ReactNode
  readonly footer?: React.ReactNode
}

type Content = React.FunctionComponent<ContentProps>

const Content: Content = ({ children, footer, onDismiss, title }) => {
  const windowHeight = useWindowHeight()
  const [modalIsOverflowing, setModalIsOverflowing] = useState<boolean>(false)
  const overflowWrapper = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (footer && overflowWrapper.current) {
      const {
        height: overflowWrapperHeight,
      } = overflowWrapper.current.getBoundingClientRect()
      setModalIsOverflowing(
        overflowWrapper.current.scrollHeight > overflowWrapperHeight
      )
    }
  }, [footer, windowHeight, overflowWrapper])

  // <ReactTooltip place={"left"} effect={"solid"} />
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.overflowWrapper} ref={overflowWrapper}>
          <div className={styles.topContent}>
            <div className={styles.closeButton}>
              <IconButton
                icon={closeIcon}
                label="close"
                automationId="close-helper-center-button"
                onClick={onDismiss}
                reversed
                disableTabFocusAndIUnderstandTheAccessibilityImplications
              />
            </div>
            <div className={styles.header}>
              <h2 className={styles.title}>
                <ModalAccessibleLabel>{title}</ModalAccessibleLabel>
              </h2>
            </div>
          </div>
          <ModalBody unpadded>
            <div className={styles.middleContent}>{children}</div>
          </ModalBody>
        </div>
        {footer && (
          <div
            className={classNames({ [styles.boxShadow]: modalIsOverflowing })}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
