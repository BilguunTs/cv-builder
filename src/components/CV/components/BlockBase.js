import React from "react";

import { Icon, Button, Popover } from "@blueprintjs/core";
import { block_types } from "../../../Context/config";
import WorkHistory from "../mainblocks/Workhistory";
import Education from "../mainblocks/Education";
import Contact from "../mainblocks/Contact";
import Skill from "../mainblocks/Skill";
import Language from "../mainblocks/Language";
import { connect } from "../../../Context";
import { dialog_types } from "../../../Context/config";
class BlockBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      grabbed: false
    };
    const { targetBlock } = this.props.context.state;

    this.design = {
      container: {
        //  border: "1px solid #eee",
        /* boxShadow:
          "0 0 0 1px rgba(16,22,26,.1),0 1px 1px rgba(16,22,26,.2),0 2px 6px rgba(16,22,26,.2)",
        */ boxShadow:
          "0 0 0 1px rgba(16,22,26,.1),0 2px 4px rgba(16,22,26,.2),0 8px 24px rgba(16,22,26,.2)",
        //  transformOrigin: "650px 0%",
        borderRadius: "3px",
        // padding: "0 20px 0 20px",
        cursor: "pointer",
        //  width: "100%",
        width: "calc(100% + 100px)",
        transform: "translateX(-10%)",
        height: "auto",
        transition: "all .2s ease-in-out",
        //transform: `scale( 1.1 )`,
        zIndex: 8,
        //  display: "inline-block",
        position: "relative",
        background: "#fff"
      },
      default: {
        //  width: "100%",
        width: "calc(100% + 100px)",
        transform: "translateX(-10%)",
        // display: "inline-block",
        //   position: "relative",
        zIndex: 0
      },

      body: {
        //padding: " 0 35px 0 35px"
      },
      flex1: {
        flexGrow: 1
      },
      flex3: { flexGrow: 3 },
      showIcon: {
        opacity: 1,
        visibility: "visible",
        zIndex: -2
      },
      hideIcon: {
        opacity: 0,
        visibility: "hidden",
        zIndex: 1
      }
    };
    this.handlemouseover = this.handlemouseover.bind(this);
    this.handlemouseOut = this.handlemouseOut.bind(this);
    this.handleDeleteBlock = this.handleDeleteBlock.bind(this);
  }
  componentDidMount() {
    /* if (
      this.props.id !== null &&
      this.props.context.state.snippets.globalDrag.isOn !== false
    ) {
      if (this.props.id === this.props.context.state.snippets.globalDrag.id) {
        this.setState({ grabbed: true });
      }
    }*/
  }
  /*componentWillUnmount() {
    this.setState({ grabbed: false });
  }*/
  handlemouseover = () => {
    this.setState({ active: true });
  };
  handlemouseOut = () => {
    this.setState({ active: false });
    // this.props.context.state.snippets.isglobalDragOn = false;
  };
  handlemouseClick = obj => {
    this.props.context.setTargetBlock(obj);
    this.props.context.openSideDrawer();
  };
  RenderBlockType = () => {
    switch (this.props.type) {
      case block_types.main.Work_History:
        return <WorkHistory {...this.props} />;
      case block_types.main.Skills:
        return <Skill {...this.props} />;
      case block_types.main.Contact:
        return <Contact {...this.props} />;
      case block_types.main.Education:
        return <Education {...this.props} />;
      case block_types.additional.language:
        return <Language {...this.props} />;
      case block_types.additional.Accomplishments:
        return <div>I am accomplishment</div>;
      default:
        return <div>no one knows me hahahahahah </div>;
    }
  };
  handleDeleteBlock = () => {
    this.props.context.openDialog({
      type: dialog_types.DELETE,
      body: "☝️ this can not be undone 🤔",
      header: "😮 Are you sure you want to delete this section?",
      targetEl: {
        type: "block",
        column: this.props.status.column,
        sectionIndex: this.props.status.sectionIndex,
        blockIndex: this.props.status.blockIndex
      }
    });
  };
  render() {
    const { isDragging, dragHandler, id } = this.props;
    const { active } = this.state;
    const { globalDrag } = this.props.context.state.snippets;

    const blockstatus = {
      ...this.props.status,
      blockType: this.props.type
    };
    return (
      <div
        style={
          active || isDragging ? this.design.container : this.design.default
        }
      >
        <div
          // style={{ position: "relative", width: active ? "10px" : null }}
          onMouseOver={this.handlemouseover}
          onMouseOut={this.handlemouseOut}
          onMouseDown={this.handlemouseover}
        >
          <div style={active || isDragging ? this.designbody : null}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  flexGrow: 1
                }}
              >
                <div
                  style={
                    active || isDragging
                      ? this.design.showIcon
                      : this.design.hideIcon
                  }
                  {...dragHandler}
                >
                  <Icon icon="drag-handle-vertical" />
                </div>
              </div>

              <div
                onClick={() => this.handlemouseClick(blockstatus)}
                style={{
                  flexGrow: 3
                }}
              >
                {this.RenderBlockType()}
              </div>

              <div
                style={{
                  flexGrow: 1
                }}
              >
                <div
                  style={
                    active || isDragging
                      ? this.design.showIcon
                      : this.design.hideIcon
                  }
                >
                  <Button
                    onClick={this.handleDeleteBlock}
                    minimal
                    icon={<Icon icon="trash" color="red" />}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(BlockBase);
/**
 * <Popover
                        popoverClassName={exampleIndex <= 2 ? Classes.POPOVER_CONTENT_SIZING : ""}
                        portalClassName="foo"
                        {...popoverProps}
                        enforceFocus={false}
                        isOpen={}
                        >
                        <Button intent={Intent.PRIMARY} text="Popover target" />
                        {this.getContents(exampleIndex)}
                    </Popover>
 */
