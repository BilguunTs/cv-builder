import React from "react";
import { Classes, Divider } from "@blueprintjs/core";
/**id: "_33xg",
            title: "Contact",
            type: block_types.main.Contact,
            first_name: "Bill",
            last_name: "kill",
            profession: "assassin",
            street_address: "b-33",
            city: "las-vegas",
            state_province: "somewhere",
            zipcode: "12304",
            phone: "99424149",
            email_address: "BillKill@example.com",
            social_links: "" */
const Contact = props => {
  return (
    <div
      style={{
        wordWrap: "break-word",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: "5px",
        marginTop: "10px"
      }}
    >
      <h6
        style={{ marginBottom: 0 }}
        className={
          props.street_address === "" &&
          props.city === "" &&
          props.state_province === ""
            ? "bp3-heading bp3-text-disabled"
            : "bp3-heading"
        }
      >
        🏠 Address
      </h6>
      <div>
        <div
          className={props.street_address === "" ? "bp3-text-disabled" : null}
        >
          {props.street_address || "no street"}
        </div>
        <div className={props.city === "" ? "bp3-text-disabled" : null}>
          {props.city || "no city"}
        </div>
        <div
          className={props.state_province === "" ? "bp3-text-disabled" : null}
        >
          {props.state_province || "no province & state"}
        </div>
        <div className={props.zipcode === "" ? "bp3-text-disabled" : null}>
          {props.zipcode || ""}
        </div>
      </div>
      <Divider />
      <h6
        style={{ marginBottom: 0 }}
        className={
          props.phone === "" ? "bp3-heading bp3-text-disabled" : "bp3-heading"
        }
      >
        📱 Phone number
      </h6>
      <div className={props.phone === "" ? "bp3-text-disabled" : null}>
        {props.phone || "no phone"}
      </div>
      <Divider />
      <h6
        style={{ marginBottom: 0 }}
        className={
          props.email === "" ? "bp3-heading bp3-text-disabled" : "bp3-heading"
        }
      >
        📧 E-mail
      </h6>{" "}
      <div className={props.email === "" ? "bp3-text-disabled" : null}>
        {props.email || "no email"}
      </div>
    </div>
  );
};
export default Contact;
