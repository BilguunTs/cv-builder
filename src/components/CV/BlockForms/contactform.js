import React from "react";
import { FormGroup, InputGroup, Classes, Dialog } from "@blueprintjs/core";
import Editor from "../../DocumentEditor/ClassicEditor";
import { connect } from "../../../Context";

const ContactWorkForm = props => {
  const { sectionIndex, blockIndex, column } = props;
  const { onEditBlock } = props.context;
  /**
 * 
 * @param { id: "rand_ex3",
 first_name: "Bill",
 last_name: "kill",
 profession: "assassin",
 street_address: "b-33",
 city: "las-vegas",
 state_province: "somewhere",
 zipcode: "12304",
 phone: "99424149",
 email: "BillKill@example.com",
 social_links: ""}  
 */
  const handleChange = e => {
    e.preventDefault();
    let newtext = e.target.value;
    let type = e.target.id;

    return onEditBlock(type, newtext);
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
          label="First name"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            onChange={handleChange}
            large
            id="first_name"
            defaultValue={props.first_name || null}
            placeholder="No name ? 🧐"
          />
        </FormGroup>
        <FormGroup label="Last name" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            large
            onChange={handleChange}
            id="last_name"
            defaultValue={props.last_name || null}
            placeholder="name "
          />
        </FormGroup>
        <FormGroup label="Profession" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="profession"
            onChange={handleChange}
            defaultValue={props.profession || null}
            placeholder="🎓"
          />
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <FormGroup label="Street address" labelFor="text-input">
              <InputGroup
                style={{
                  backdropFilter: "blur(8px)",
                  background: "transparent"
                }}
                id="street_address"
                onChange={handleChange}
                defaultValue={props.street_address || null}
                placeholder="🏢"
              />
            </FormGroup>
            <FormGroup label="City" labelFor="text-input">
              <InputGroup
                style={{
                  backdropFilter: "blur(8px)",
                  background: "transparent"
                }}
                id="city"
                onChange={handleChange}
                defaultValue={props.city || null}
                placeholder="🌆"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup label="State & Province" labelFor="text-input">
              <InputGroup
                style={{
                  backdropFilter: "blur(8px)",
                  background: "transparent"
                }}
                id="state_province"
                onChange={handleChange}
                defaultValue={props.state_province || null}
                placeholder="🏴󠁧󠁢󠁳󠁣󠁴󠁿"
              />
            </FormGroup>
            <FormGroup label="Zipcode" labelFor="text-input">
              <InputGroup
                style={{
                  backdropFilter: "blur(8px)",
                  background: "transparent"
                }}
                id="zipcode"
                onChange={handleChange}
                defaultValue={props.zipcode || null}
                placeholder="📮 zip"
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup label="Phone number" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="phone"
            onChange={handleChange}
            defaultValue={props.zipcode || null}
            placeholder="📱"
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id="email"
            onChange={handleChange}
            defaultValue={props.email || null}
            placeholder="📧@example.com etc"
          />
        </FormGroup>
        <FormGroup label="Social links" labelFor="text-input">
          <InputGroup
            style={{ backdropFilter: "blur(8px)", background: "transparent" }}
            id=" social_links"
            onChange={handleChange}
            defaultValue={props.social_links || null}
            placeholder="linked in, fb, instagram etc"
          />
        </FormGroup>
      </div>
    </div>
  ) : null;
};
export default connect(ContactWorkForm);
