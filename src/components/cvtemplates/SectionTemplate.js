import React from "react";
import { Classes } from "@blueprintjs/core";

import { RenderIcon } from "../../components/Icons/RenderIcon";
//import RenderBlock from "./BlockContainer";
const SectionBase = props => {
  const { isDraging, blocks, title, id } = props;

  const Style = {
    container: {
      // transform: `scale( 1 )`,
      //transition: "all .2s ease-in-out",
      //border: "1px solid #eee",
      background: "#fff",
      borderRadius: "3px",
      boxShadow:
        "0 0 0 1px rgba(16,22,26,.1),0 1px 1px rgba(16,22,26,.2),0 2px 6px rgba(16,22,26,.2)",
      width: "calc(100% + 10px)",
      transitionTimingFunction: "ease-in-out"
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

  return (
    <div>
      <div>
        <div
          style={{
            display: "inline-block",

            background: "transparent"
          }}
        >
          <div
            style={{
              background: "transparent"
            }}
          >
            <div
              className={Classes.DIALOG_HEADER}
              style={{ background: "transparent", paddingLeft: "0" }}
            >
              <div className={Classes.ICON}>{RenderIcon(props.type)}</div>
              <h4 className="bp3-heading">{title}</h4>
            </div>
            <div>I will render block</div>
          </div>
        </div>
      </div>
    </div>
  );
};
// <Blocks {...props} lists={blocks} />
export default SectionBase;
/**
 *         <RenderBlock {...props} lists={blocks} />
 */
