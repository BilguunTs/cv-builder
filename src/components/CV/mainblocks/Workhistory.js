import React from "react";

import { Blockquote, Icon, Classes } from "@blueprintjs/core";
const WorkHistory = props => {
  return (
    <div
      key={props.jobtitle}
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
            props.startDate === "" || props.endDate === ""
              ? "bp3-text-disabled bp3-running-text"
              : "bp3-running-text"
          }
        >
          {props.startDate || "start-date"}-<br />
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
            props.jobtitle !== ""
              ? "bp3-heading"
              : "bp3-text-disabled bp3-heading"
          }
        >
          {props.jobtitle || "Your job title"}
          <div
            className={
              props.employer === ""
                ? "bp3-text-disabled bp3-text-small"
                : "bp3-text-small"
            }
          >
            {props.employer || "Employer"}
          </div>
          <div
            className={
              props.city === "" || props.state === ""
                ? "bp3-text-disabled bp3-text-small"
                : "bp3-text-small"
            }
          >
            {props.city || "city"},{props.state || "state"}
          </div>
        </h5>

        <div
          style={{ wordWrap: "break-word" }}
          className={
            props.workdetail === "" ? "bp3-text-disabled" : "bp3-text-muted"
          }
        >
          <h4 className="bp3-text-small">{props.workdetail || null}</h4>
        </div>
      </div>
    </div>
  );
};
export default WorkHistory;
