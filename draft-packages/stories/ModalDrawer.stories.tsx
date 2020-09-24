import * as React from "react"

import { ModalDrawer } from "@kaizen/draft-modal-drawer"

export default {
  title: "ModalDrawer (React)",
  component: ModalDrawer,
  parameters: {
    info: {
      text: `
        import { ModalDrawer } from "@kaizen/draft-modal-drawer";
      `,
    },
  },
}

export const DefaultStory = () => (
  <ModalDrawer
    isOpen={true}
    type="positive"
    title="hello modal drawer"
    onDismiss={() => null}
  >
    hello world!
  </ModalDrawer>
)

DefaultStory.story = {
  name: "Default (Kaizen Site Demo)",
}
