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
import { Materials } from "../../../Context/config";
import "../css/dropdown.css";
import "../css/InputStyle.css";
const EducationForm = props => {
  const { sectionIndex, blockIndex, column } = props;
  const { onEditBlock } = props.context;
  const [customValue, setCustomValue] = React.useState(false);
  const handleChange = e => {
    e.preventDefault();
    let newtext = e.target.value;
    let type = e.target.id;
    switch (type) {
      case "school":
        return onEditBlock("school", newtext);
      case "schoollocation":
        return onEditBlock("schoollocation", newtext);
      case "degree":
        return onEditBlock("degree", newtext);
      case "fieldofstudy":
        return onEditBlock("fieldofstudy", newtext);
      case "startDate":
        return onEditBlock("startDate", newtext);
      case "endDate":
        return onEditBlock("endDate", newtext);

      default:
        return onEditBlock(type, newtext);
    }
  };
  const onDegreeChange = e => {
    if (e.target.value === "Other") {
      setCustomValue(true);
    } else {
      setCustomValue(false);
      onEditBlock("degree", e.target.value);
    }
  };
  return props !== null ? (
    <div key={`${props.id}-input-type`}>
      <div
        className={Classes.DIALOG_HEADER}
        style={{ background: "transparent" }}
      >
        <h3>Education review </h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="School name"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup
            onChange={handleChange}
            large
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="school"
            defaultValue={props.school || null}
            placeholder="work title etc"
          />
        </FormGroup>
        <FormGroup label="School location" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            onChange={handleChange}
            id="schoollocation"
            defaultValue={props.schoollocation || null}
            placeholder="work title etc"
          />
        </FormGroup>
        <FormGroup label="Degree" labelFor="text-input">
          <select
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            className={Classes.BUTTON}
            onChange={onDegreeChange}
            id="degree"
          >
            {Materials.degrees.map((d, i) => (
              <option className={Classes.MENU_ITEM} value={d} key={i}>
                {d}
              </option>
            ))}
          </select>
          {customValue ? (
            <InputGroup
              onChange={handleChange}
              id="degree"
              defaultValue={props.degree || null}
              style={{ backdropFilter: "blur(8px)", background: "transparent" }}
              placeholder="MBA, Ph.d etc"
            />
          ) : null}
        </FormGroup>
        <FormGroup label="Field of study" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="fieldofstudy"
            onChange={handleChange}
            defaultValue={props.fieldofstudy || null}
            placeholder="work title etc"
          />
        </FormGroup>
        <FormGroup label="Graduation start date" labelFor="text-input">
          <DatePicker
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            submitType="startDate"
            changer={onEditBlock}
          />
        </FormGroup>
        <FormGroup label="Graduation end date" labelFor="text-input">
          <DatePicker
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            submitType="endDate"
            changer={onEditBlock}
          />
        </FormGroup>
      </div>
      <div className={Classes.DRAWER_HEADER}>
        <h3>add description</h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <TextArea
          style={{ backdropFilter: "blur(8px)", background: "transparent" }}
          maxLength={350}
          fill
          large
          growVertically
          id="description"
          onChange={handleChange}
        />
      </div>
    </div>
  ) : null;
};
export default connect(EducationForm);
