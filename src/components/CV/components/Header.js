import React from "react";
import { Card, EditableText } from "@blueprintjs/core";
const SimpleTemp = props => {
  /**height: "297mm", */
  const { globalColor, gfond } = props.state.snippets;
  const { editHeader } = props;
  const handleChange = value => {
    editHeader(value);
  };
  return (
    <h1
      className="bp3-heading"
      style={{
        color: globalColor,
        fontSize: "39px",
        lineHeight: "44px",
        fontFamily: gfond
      }}
    >
      <EditableText
        alwaysRenderInput
        maxLength={39}
        defaultValue={props.state.heading || ""}
        placeholder="👋 Bilguun.Ts"
        onChange={handleChange}
      ></EditableText>
    </h1>
  );
};
export default SimpleTemp;
/* <h1
     className="bp3-heading"
     style={{ color: globalColor, fontSize: "39px", lineHeight: "44px" }}
   >
     My name is ...
   </h1>*/
