import React from "react";
import { Classes, InputGroup, Slider } from "@blueprintjs/core";
import { connect } from "../../../Context";
import StarRating from "../Status/component/star-rating";
const LanguageForm = props => {
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
          What <b style={{ color: "green" }}>language</b> do you speak?
        </h3>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <div style={{ marginBottom: "10px" }}>
          <InputGroup
            large
            onChange={handleChange}
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            defaultValue={props.name || null}
            placeholder="your skill"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Elementary</div>
          <StarRating
            rating={value || 0}
            starRatedColor="gold"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
            starDimension="20px"
          />
          <div>Native</div>
        </div>
      </div>
    </div>
  ) : null;
};
export default connect(LanguageForm);
