import React from "react";
import { RatingBar } from "../Status/Ratings";
import { connect } from "../../../Context";
const Language = props => {
  const renderWord = () => {
    switch (props.value) {
      case 1:
        return "Elementary";
      case 2:
        return "Pre-intermediate";
      case 3:
        return "Intermediate";
      case 4:
        return "Upper-intermediate";
      case 5:
        return "Advanced";
      case 6:
        return "Native";
      default:
        return null;
    }
  };
  const { column } = props.status;
  const { globalColor } = props.context.state.snippets;
  return (
    <div key={props.name} style={{ columns: 1, padding: "5px" }}>
      <h6
        className={
          props.name === "" ? "bp3-heading bp3-text-disabled" : "bp3-heading"
        }
      >
        {props.name || "Your language"}{" "}
      </h6>
      <RatingBar
        max={6}
        color={globalColor}
        minimal={column === "R" ? true : false}
        value={props.value}
      />
      <p> {renderWord()}</p>
    </div>
  );
};
export default connect(Language);
