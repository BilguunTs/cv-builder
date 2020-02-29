import React from "react";
import { Classes, InputGroup, Slider } from "@blueprintjs/core";
import { connect } from "../../../Context";
import StarRating from "../Status/component/star-rating";
const WorkHistoryForm = props => {
  const { name, value } = props;
  const { onEditBlock } = props.context;
  const [rate, setRating] = React.useState(value);
  const handleChange = e => {
    e.preventDefault();
    let newtext = e.target.value;
    onEditBlock("name", newtext);
  };
  const changeRating = value => {
    onEditBlock("value", value);
  };

  return props !== null ? (
    <div key={`${props.id}-input-type`}>
      <div
        className={Classes.DIALOG_HEADER}
        style={{ background: "transparent" }}
      >
        <h3 className="bp3-text-large bp3-running-text bp3-text-muted">
          What <b style={{ color: "green" }}>skills</b> do you want to
          highlight? Use our expert recommendations below to get started
        </h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <div style={{ marginBottom: "10px" }}>
          <InputGroup
            large
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            onChange={handleChange}
            defaultValue={props.name || null}
            placeholder="your skill"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Basic</div>
          <StarRating
            rating={value}
            starRatedColor="gold"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
          />
          <div>Excellent</div>
        </div>
      </div>
    </div>
  ) : null;
};
export default connect(WorkHistoryForm);
