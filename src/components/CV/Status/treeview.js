import React from "react";
import {
  Menu,
  MenuItem,
  MenuDivider,
  Tooltip,
  Button,
  ButtonGroup,
  Divider,
  Popover,
  //Icon,
  PopoverInteractionKind,
  Classes,
  InputGroup,
  FormGroup,
} from "@blueprintjs/core";
import { connect } from "../../../Context";
import { RenderIcon } from "../../Icons/RenderIcon";
import { SampleSectionButtons as SSB } from "../../../Context/config";
//import { Transition } from "react-transition-group";
const Status = (props) => {
  const {
    leftCollumn,
    rightCollumn,
    // existing_section_types
  } = props.context.state;
  const { createSection } = props.context;
  const { openPreview } = props.context;
  const [currentS, setCurrentS] = React.useState({ type: null, title: null });
  const titleRef = React.useRef({ value: "" });
  const popRef = React.useRef();
  const [popoverProps, setPopover] = React.useState({
    boundary: "viewport",
    canEscapeKeyClose: true,
    exampleIndex: 0,
    hasBackdrop: false,
    inheritDarkTheme: true,
    interactionKind: PopoverInteractionKind.CLICK,
    isOpen: false,
    minimal: false,
    modifiers: {
      arrow: { enabled: true },
      flip: { enabled: true },
      keepTogether: { enabled: true },
      preventOverflow: { enabled: true },
    },
    position: "auto",
    sliderValue: 5,
    usePortal: true,
  });

  const handleAddSection = () => {
    createSection(currentS.type, currentS.title, "R");
    handleCancel();
  };
  const toggleCurrent = (type, title) => {
    setCurrentS({ type, title });
  };
  const renderSectionForm = () => {
    let instance;
    switch (currentS) {
      case "CUSTOM":
        instance = (
          <InputGroup
            inputRef={titleRef}
            id="state"
            placeholder="E.g Hobbies"
          />
        );
      default:
        instance = (
          <InputGroup
            defaultValue={currentS.title}
            id="state"
            placeholder="E.g Hobbies"
          />
        );
    }
    return (
      <div key={currentS.type}>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="section title" labelFor="text-input">
            {instance}
          </FormGroup>
        </div>
      </div>
    );
  };
  const handleCancel = () => {
    toggleCurrent(null, null);
    setPopover({ isOpen: false });
  };
  const getContents = () => {
    return (
      <div
        style={{
          minWidth: "250px",
          height: "420px",
          background: "lemonchiffon",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyContent: "center",
          }}
        >
          {SSB.map((b, i) => {
            return SSB.length - 1 === i ? null : (
              <Button
                onClick={() => toggleCurrent(b.type, b.text)}
                key={i}
                fill
                icon={b.icon}
                text={b.text}
                minimal
              />
            );
          })}
        </div>
        <div>
          <div>
            <Button
              onClick={() => toggleCurrent("CUSTOM", null)}
              fill
              text="Custom"
              icon="add-to-artifact"
              minimal
            ></Button>
          </div>
        </div>
        <Divider />

        <div>
          {currentS.type !== null ? (
            <div>
              {renderSectionForm()}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  padding: "10px",
                }}
              >
                <Button onClick={handleCancel} minimal>
                  Cancel
                </Button>
                <Button onClick={handleAddSection} minimal intent="success">
                  Add
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <div style={{ margin: "auto" }}>
      <Menu style={{ padding: "10px" }}>
        <h3>Resume Sections </h3>
        <MenuDivider />
        {leftCollumn.sections.map((s) => (
          <MenuItem
            icon={RenderIcon(s.type, 18, "#5C7080")}
            key={s.id}
            text={s.title}
          />
        ))}
        {rightCollumn.sections.map((s) => (
          <MenuItem
            icon={RenderIcon(s.type, 18, "#5C7080")}
            key={s.id}
            text={s.title}
          />
        ))}
        <MenuDivider />
        <div style={{ padding: "10px 0 10px 0" }}>
          <Popover
            ref={popRef}
            portalClassName="foo"
            {...popoverProps}
            position="right"
            isOpen={popoverProps.isOpen ? true : undefined}
          >
            <Button
              fill
              icon="plus"
              minimal
              rightIcon="caret-right"
              text="Add a section"
            ></Button>
            {getContents()}
          </Popover>
        </div>
        <MenuDivider />
        <ButtonGroup>
          <Tooltip content="Preview" position="bottom">
            <Button
              icon="eye-open"
              intent="warning"
              minimal
              onClick={openPreview.bind(this)}
            ></Button>
          </Tooltip>
          <Divider />
          <Button
            icon="download"
            intent="success"
            minimal
            onClick={openPreview.bind(this)}
          >
            Dowload
          </Button>
        </ButtonGroup>
      </Menu>
    </div>
  );
};
export default connect(Status);
