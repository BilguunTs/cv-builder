import React, { Component } from "react";
import {
  Drawer,
  Classes,
  Position,
  Button,
  Icon,
  PanelStack,
} from "@blueprintjs/core";
import { block_types } from "../../Context/config";
import WorkHistoryForm from "../CV/BlockForms/workhistoryform";
import EducationForm from "../CV/BlockForms/educationform";
import SkillForm from "../CV/BlockForms/skillform";
import LanguageForm from "../CV/BlockForms/languageform";
import ContactForm from "../CV/BlockForms/contactform";
import { RenderIcon } from "../Icons/RenderIcon";
import "../../slide.css";
class SideDrawer extends Component {
  RenderInputform = (args) => {
    if (args === null) return;
    switch (args.blockType) {
      case block_types.main.Work_History:
        return <WorkHistoryForm {...args} />;
      case block_types.main.Education:
        return <EducationForm {...args} />;
      case block_types.main.Skills:
        return <SkillForm {...args} />;
      case block_types.main.Contact:
        return <ContactForm {...args} />;
      case block_types.additional.language:
        return <LanguageForm {...args} />;
      default:
        return <div>I am other</div>;
    }
  };

  render() {
    const { targetBlock, sidedrawer, snippets } = this.props.state;

    return (
      <div>
        <div className={Classes.DRAWER_HEADER} style={{ minHeight: "50px" }}>
          <div className={Classes.ICON}>
            {targetBlock !== null
              ? RenderIcon(targetBlock.blockType, 25, snippets.globalColor)
              : null}
          </div>
          <div className={Classes.HEADING}>
            {targetBlock !== null ? targetBlock.sectiontitle : "section title"}
          </div>
          <Button
            icon="cross"
            minimal
            onClick={this.props.closeSideDrawer.bind(this)}
          ></Button>
        </div>
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            {this.RenderInputform(targetBlock)}

            {/*   <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                {targetBlock === null ? null : <button>save</button>}
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}
export default SideDrawer;
/**
 *
 */
