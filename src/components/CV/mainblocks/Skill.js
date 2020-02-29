import React from "react";
import { RatingBar } from "../Status/Ratings";
import { connect } from "../../../Context";
const Skill = props => {
  const renderWord = () => {
    switch (props.value) {
      case 1:
        return "Basic";
      case 2:
        return "Average";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
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
          props.name === null ? "bp3-heading bp3-text-disabled" : "bp3-heading"
        }
      >
        {props.name || "Your skill"}{" "}
      </h6>
      <RatingBar
        color={globalColor}
        max={5}
        minimal={column === "R" ? true : false}
        value={props.value}
      />
      <p> {renderWord()}</p>
    </div>
  );
};
export default connect(Skill);
