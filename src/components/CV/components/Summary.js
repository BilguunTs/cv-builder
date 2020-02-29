import React from "react";
import { Card, EditableText, Popover } from "@blueprintjs/core";
const SimpleTemp = props => {
  /**height: "297mm", */
  const { globalColor, gfond } = props.state.snippets;
  const { editSummary } = props;
  const handleChange = value => {
    editSummary(value);
  };
  return (
    <h4
      className="bp3-heading"
      style={{ color: globalColor, fontFamily: gfond }}
    >
      <EditableText
        alwaysRenderInput
        maxLength={250}
        multiline={true}
        maxLines={10}
        minLines={2}
        placeholder={
          props.state.summary === null || props.state.summary.trim() === ""
            ? "✍️ any summary? 🙋🏿‍♀️🙋‍♀️🙋🏿‍♂️🙋‍♂️      ┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴"
            : props.state.heading
        }
        onChange={handleChange}
      ></EditableText>
    </h4>
  );
};
export default SimpleTemp;
/* <h3 className="bp3-heading" style={{ color: globalColor }}>
     I am ...
   </h3>*/
