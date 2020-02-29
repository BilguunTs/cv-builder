import React from "react";

import {
  FormGroup,
  InputGroup,
  Classes,
  Dialog,
  TextArea
} from "@blueprintjs/core";
import Editor from "../../DocumentEditor/ClassicEditor";
import { connect } from "../../../Context";
import DatePicker from "../components/DatePicker";

const WorkHistoryForm = props => {
  const { sectionIndex, blockIndex, column } = props;
  const { onEditBlock } = props.context;

  const handleChange = e => {
    e.preventDefault();
    let newtext = e.target.value;
    let type = e.target.id;
    switch (type) {
      case "jobtitle":
        return onEditBlock("jobtitle", newtext);
      case "employer":
        return onEditBlock("employer", newtext);
      case "city":
        return onEditBlock("city", newtext);
      case "state":
        return onEditBlock("state", newtext);
      case "startDate":
        return onEditBlock("startDate", newtext);
      case "endDate":
        return onEditBlock("endDate", newtext);

      default:
        return onEditBlock(type, newtext);
    }
  };
  const handleChangeonDate = (type, date) => {
    return onEditBlock(type, date);
  };
  return props !== null ? (
    <div key={`${props.id}-input-type`}>
      <div
        className={Classes.DIALOG_HEADER}
        style={{ background: "transparent" }}
      >
        <h3>Job review </h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Job title"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            onChange={handleChange}
            large
            id="jobtitle"
            defaultValue={props.jobtitle || null}
            placeholder="work title etc"
          />
        </FormGroup>
        <FormGroup label="Employer" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            large
            onChange={handleChange}
            id="employer"
            defaultValue={props.employer || null}
            placeholder="name "
          />
        </FormGroup>
        <FormGroup label="City" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="city"
            onChange={handleChange}
            defaultValue={props.city || null}
          />
        </FormGroup>
        <FormGroup label="State" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="state"
            onChange={handleChange}
            defaultValue={props.state || null}
            placeholder="contry etc"
          />
        </FormGroup>
        <FormGroup label="Start date" labelFor="text-input">
          <DatePicker submitType="startDate" changer={handleChangeonDate} />
        </FormGroup>
        <FormGroup label="End date" labelFor="text-input">
          <DatePicker submitType="endDate" changer={handleChangeonDate} />
        </FormGroup>
      </div>
      <div className={Classes.DRAWER_HEADER}>
        <h3>Job detail</h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <TextArea
          style={{ backdropFilter: "blur(8px)", background: "transparent" }}
          maxLength={350}
          fill
          large
          growVertically
          id="workdetail"
          onChange={handleChange}
        />
      </div>
    </div>
  ) : null;
};
//<Editor />
export default connect(WorkHistoryForm);
