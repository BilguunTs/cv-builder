import React from "react";
import {
  Card,
  Popover,
  EditableText,
  Icon,
  Classes,
  Button,
  Tooltip,
  InputGroup
} from "@blueprintjs/core";
import { dialog_types } from "../../../Context/config";
import { RenderIcon } from "../../Icons/RenderIcon";
import RenderBlock from "./BlockContainer";
import "../css/transitions.css";
const SectionBase = props => {
  const [active, setActive] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const { isDraging, blocks, title, id, type, state } = props;
  const handlemouseover = () => {
    setActive(true);
  };
  const handlemouseOut = () => {
    setActive(false);
  };
  React.useEffect(() => {
    if (active === false) {
      setEditable(false);
    }
  }, [active]);
  const Style = {
    container: {
      //transform: `scale( 1 )`,
      //transition: "all .2s ease-in-out",
      //border: "1px solid #eee",
      background: "#fff",
      padding: "3px",
      borderRadius: "3px",
      boxShadow:
        "0 0 0 1px rgba(16,22,26,.1),0 1px 1px rgba(16,22,26,.2),0 2px 6px rgba(16,22,26,.2)",
      //width: "calc(100% + 20px)",
      transitionTimingFunction: "ease-in-out",
      zIndex: 5
    },
    defaultcontainer: {
      padding: "3px",
      zIndex: 0
      //width: "calc(100% + 20px)"
    },
    showIcon: {
      opacity: 1,
      visibility: "visible"
    },
    hideIcon: {
      opacity: 0,
      visibility: "hidden"
    }
  };
  const handleAddBlock = (column, sectionIndex, sectionType) => {
    props.openDialog({
      header: "Add block",
      type: dialog_types.ADD,
      body: "somethnig",
      targetEl: {
        column,
        sectionIndex,
        sectionType,
        type: "block"
      }
    });
  };
  const handleDeleteSection = (column, sectionIndex) => {
    props.openDialog({
      type: dialog_types.DELETE,
      body: "☝️ this can not be undone 🤔",
      header: "😮 Are you sure you want to delete this section?",
      targetEl: {
        column,
        sectionIndex,
        type: "section"
      }
    });
  };
  const columnis = props.isRight && !props.isLeft ? "R" : "L";

  const handleOnEditSectionTitle = e => {
    props.changeSectionTitle(columnis, props.sectionindex, e.target.value);
  };
  const toggleEditMode = b => {
    setEditable(b || false);
  };
  return (
    <div>
      <div
        onMouseOver={handlemouseover}
        onMouseOut={handlemouseOut}
        onMouseDown={handlemouseover}
        //style={isDraging || active ? Style.container : null}
      >
        <div
          /*   style={{
            display: "inline-block",
            background: isDraging || active ? "#fff" : "transparent"
          }}*/
          // className={`fade ${!props.state.snippets.effect.isOn ? "in" : "out"}`}
          style={isDraging || active ? Style.container : Style.defaultcontainer}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Tooltip content="Add a block" intent="success" position="left">
                <Button
                  onClick={() =>
                    handleAddBlock(columnis, props.sectionindex, type)
                  }
                  style={isDraging || active ? Style.showIcon : Style.hideIcon}
                  minimal
                  icon={<Icon icon="plus" color="#2bcaea" />}
                ></Button>
              </Tooltip>
            </div>
            <div
              {...props.draghandler}
              style={{
                background: "transparent",
                padding: 0,
                margin: 0
              }}
            >
              <Icon
                style={isDraging || active ? Style.showIcon : Style.hideIcon}
                icon="drag-handle-horizontal"
              />
            </div>
            <div style={isDraging || active ? Style.showIcon : Style.hideIcon}>
              <Tooltip
                content="delete this section"
                position="right"
                intent="danger"
              >
                <Button
                  onClick={() =>
                    handleDeleteSection(columnis, props.sectionindex)
                  }
                  minimal
                  icon={<Icon icon="trash" color="red" />}
                ></Button>
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              background: isDraging || active ? "#fff" : "transparent"
            }}
          >
            <div
              className={Classes.DIALOG_HEADER}
              style={{ background: "transparent", paddingLeft: "0" }}
            >
              <div className={Classes.ICON}>
                {RenderIcon(props.type, null, state.snippets.globalColor)}
              </div>
              {editable ? (
                <>
                  <InputGroup
                    defaultValue={title}
                    placeholder="👋 title please.."
                    onChange={handleOnEditSectionTitle}
                    autoFocus
                  ></InputGroup>
                  <div
                    className={Classes.ICON}
                    style={
                      isDraging || active ? Style.showIcon : Style.hideIcon
                    }
                  >
                    <Tooltip content="Cancel" position="right">
                      <Button
                        onClick={() => toggleEditMode(false)}
                        icon="remove"
                        minimal
                      ></Button>
                    </Tooltip>
                  </div>{" "}
                </>
              ) : (
                <h4
                  className="bp3-heading"
                  style={{
                    color: props.state.snippets.globalColor,
                    fontFamily: props.state.snippets.gfond
                  }}
                >
                  {title}
                  <div
                    className={Classes.ICON}
                    style={
                      isDraging || active ? Style.showIcon : Style.hideIcon
                    }
                  >
                    <Tooltip content="Rename" position="right" intent="warning">
                      <Button
                        onClick={() => toggleEditMode(true)}
                        icon="edit"
                        minimal
                      ></Button>
                    </Tooltip>
                  </div>
                </h4>
              )}
            </div>
            <div>
              <div>
                <RenderBlock {...props} lists={blocks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// <Blocks {...props} lists={blocks} />
export default SectionBase;
/** filter: isDraging || active ? "blur(2px)" : null */
