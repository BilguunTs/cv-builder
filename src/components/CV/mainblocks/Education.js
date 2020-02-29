import React from "react";

import { Blockquote, Icon, Classes } from "@blueprintjs/core";
const Education = props => {
  return (
    <div
      key={props.fieldofstudy}
      style={{
        display: "grid",
        gridTemplateColumns: " 1fr 2fr",
        padding: "8px 0px 0px 6px",
        textAlign: "start"
      }}
    >
      <div style={{ minWidth: "100px" }}>
        <h6
          className={
            props.startDate === "" || props.endDate === null
              ? "bp3-running-text bp3-text-disabled"
              : "bp3-running-text"
          }
        >
          {props.startDate || "start-date"}-
          <br />
          {props.endDate || "end-date"}
        </h6>
      </div>
      <div
        style={{
          textAlign: "start",
          minWidth: "150px",
          maxWidth: props.status.column === "R" ? "150px" : "250px",
          whiteSpace: "pre-wrap"
        }}
      >
        <h5
          className={
            props.degree !== "" && props.fieldofstudy !== ""
              ? "bp3-heading"
              : "bp3-heading bp3-text-disabled"
          }
        >
          {props.degree || "Degree"}: {props.fieldofstudy || "Field of study"}
          <div
            className={
              props.school !== "" || props.schoollocation !== ""
                ? "bp3-text-small"
                : "bp3-text-small bp3-text-disabled "
            }
          >
            {props.school || "school"}-{props.schoollocation || "location"}
          </div>
        </h5>

        <div
          style={{ wordWrap: "break-word" }}
          className={
            props.description === ""
              ? "bp3-text-small bp3-text-disabled"
              : "bp3-text-small bp3-text-muted"
          }
        >
          <h4>{props.description || null}</h4>
        </div>
      </div>
    </div>
  );
};
export default Education;
