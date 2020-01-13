// import { loadElmStories } from "@cultureamp/elm-storybook"
import { Text } from "@cultureamp/kaizen-component-library"
import { TextField } from "@cultureamp/kaizen-component-library/draft"
import { Well } from "@cultureamp/kaizen-component-library/draft"
import * as React from "react"

import { withKnobs, radios } from "@storybook/addon-knobs"

const ExampleContent = () => (
  <div style={{ padding: "1em 2em", maxWidth: "400px" }}>
    <Text tag="h3">Heading</Text>
    <Text tag="p">
      This is just a sentence to fill the content area so that you have
      something to look at.
    </Text>
    <TextField
      id="blerg"
      labelText="Example text field"
      inputValue=""
      onChange={() => {}}
    />
  </div>
)

export default {
  title: "Well",
  decorators: [withKnobs],
  component: Well,
}

const variantValue = radios(
  "variant",
  {
    default: "default",
    positive: "positive",
    negative: "negative",
    informative: "informative",
    cautionary: "cautionary",
  },

  "default",
  "GROUP-ID-VARIANT"
)

export const knobsStory = () => (
  <Well variant={variantValue}>
    <ExampleContent />
  </Well>
)

// export const defaultWithSolidBorder = () => (
//   <Well>
//     <ExampleContent />
//   </Well>
// )

knobsStory.story = {
  name: "knobs",
}

// storiesOf("Well", module)
//   .add("Default with solid border", () => (
//     <Well>
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Default with dashed border", () => (
//     <Well borderStyle="dashed">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Default without border", () => (
//     <Well borderStyle="none">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Default with no margin", () => (
//     <Well noMargin>
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Positive", () => (
//     <Well variant="positive">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Negative", () => (
//     <Well variant="negative">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Informative", () => (
//     <Well variant="informative">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Cautionary", () => (
//     <Well variant="cautionary">
//       <ExampleContent />
//     </Well>
//   ))
//   .add("Informative with dashed border", () => (
//     <Well variant="informative" borderStyle="dashed">
//       <ExampleContent />
//     </Well>
//   ))

// loadElmStories("Well(Elm)", module, require("../stories/Well.stories.elm"), [
// "Default with solid border",
// "Default with dashed border",
// "Default without border",
// "Default with no margin",
// "Positive",
// "Negative",
// "Informative",
// "Cautionary",
// "Informative with dashed border",
// ])
