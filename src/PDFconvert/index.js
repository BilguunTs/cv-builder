import React from "react";
import { connect } from "../Context";
import { Preview, print } from "react-html2pdf";
import {
  Divider,
  Overlay,
  Classes,
  Button,
  ButtonGroup,
  Card,
  Dialog,
  Tooltip
} from "@blueprintjs/core";

import { RenderIcon } from "../components/Icons/RenderIcon";

import WorkHistory from "../components/CV/mainblocks/Workhistory";
import Education from "../components/CV/mainblocks/Education";
import Skill from "../components/CV/mainblocks/Skill";
import Contact from "../components/CV/mainblocks/Contact";
import { block_types } from "../Context/config";
import Pdf from "react-to-pdf";
import DowloadButton from "./PrintButton";
const PDFconvert = props => {
  const { leftCollumn, rightCollumn, isPreviewOpen } = props.context.state;
  const { closePreview } = props.context;

  return (
    <>
      {" "}
      <Dialog
        isOpen={isPreviewOpen}
        onClose={closePreview.bind(this)}
        autoFocus
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        enforceFocus={true}
        hasBackdrop={true}
        usePortal={true}
        useTallContent={true}
        style={{
          width: "auto",
          padding: "10px",
          height: "auto",
          margin: "150px 0 30px 0",
          //transform: "scale(1.2)",

          //  background: "#8EC5FC;",
          backgroundImage: "linear-gradient( 135deg, #FFA6B7 10%, #80cad9 100%)"
          /**
           * background-image: linear-gradient( 135deg, #FFA6B7 10%, #1E2AD2 100%);
           */
        }}
      >
        <div
          style={{
            display: "flex",
            flex: "0 0 auto",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "50px 50px 0 50px"
          }}
        >
          <h2 className={Classes.HEADING} style={{ marginBottom: 0 }}>
            ✨Your CV ✨ 👏👏 😁
          </h2>
          <Button
            className={Classes.DIALOG_CLOSE_BUTTON}
            icon="cross"
            large
            onClick={closePreview.bind(this)}
            minimal
          />
        </div>

        <Template
          {...props}
          leftCollumn={leftCollumn}
          rightCollumn={rightCollumn}
        />
      </Dialog>
    </>
  );
};
export default connect(PDFconvert);
/**
 * passing args is mandatory
 */
const Template = props => {
  const { leftCollumn, rightCollumn } = props;
  const { globalColor } = props.context.state.snippets;
  const RenderBlockType = (Type, args, status) => {
    switch (Type) {
      case block_types.main.Work_History:
        return <WorkHistory {...args} {...status} />;
      case block_types.main.Skills:
        return <Skill {...args} {...status} />;
      case block_types.main.Education:
        return <Education {...args} {...status} />;
      case block_types.main.Contact:
        return <Contact {...args} {...status} />;
      case block_types.additional.language:
        return (
          <div
            style={{
              display: "grid",

              gridTemplateColumns: " 1fr 2fr",
              padding: "8px 0px 0px 6px",
              textAlign: "start"
            }}
          >
            I am Language{" "}
          </div>
        );
      case block_types.additional.Accomplishments:
        return <div>I am accomplishment</div>;
      default:
        return <div>no one knows me hahahahahah </div>;
    }
  };
  const design = {
    default: {},
    body: {
      //padding: " 0 35px 0 35px"
    },
    DIALOG_HEADER: {
      display: "flex",
      alignItems: "center",
      borderRadius: "6px 6px 0 0",
      minHeight: "40px",
      paddingRight: "5px",
      flex: "0 0 auto"
      // boxShadow: "0 1px 0 rgba(16, 22, 26, 0.15)"
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
  const PDFref = React.createRef();
  return (
    <>
      <div className={Classes.CARD} style={{ margin: "50px" }}>
        <div
          key={`${leftCollumn.id}-${rightCollumn}`}
          id="singlepdf"
          ref={PDFref}
          style={{
            padding: "25px",
            paddingTop: "0",
            width: "210mm",
            height: "297mm"
          }}
        >
          <h1
            className="bp3-heading"
            style={{
              color: globalColor,
              fontSize: "39px",
              lineHeight: "44px",
              fontFamily: "Century Gothic",
              wordWrap: "break-word"
            }}
          >
            {" "}
            {props.context.state.heading || "No name ? 🧐"}
          </h1>
          <div style={{ wordWrap: "break-word" }}>
            <h4
              className="bp3-heading"
              style={{
                color: globalColor,
                fontFamily: "Century Gothic"
              }}
            >
              {props.context.state.summary || ""}
            </h4>
          </div>

          <div
            style={{
              display: "grid",
              //   gridTemplateColumns: " repeat( auto-fit, minmax(250px, 1fr) )",
              gridTemplateColumns: "2fr 1fr",
              gridGap: "10px"
            }}
          >
            <div style={{ minHeight: "200px" }}>
              {leftCollumn.sections.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px 0 5px 0",
                    width: "100%"
                  }}
                >
                  <div style={{ ...design.DIALOG_HEADER }}>
                    <div style={{ flex: "0 0 auto", marginRight: "10px" }}>
                      {RenderIcon(item.type, null, globalColor)}
                    </div>
                    <h4 className="bp3-heading" style={{ marginBottom: 0 }}>
                      {item.title}
                    </h4>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  {item.blocks.map((o, i) => {
                    return (
                      <div key={`block${i}`}>
                        <div style={{ display: "flex" }}>
                          <div>
                            {RenderBlockType(item.type, o, {
                              status: {
                                column: "L",
                                blockIndex: i,
                                sectionIndex: index,
                                id: o.id
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{ minHeight: "200px" }}>
              {rightCollumn.sections.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px 0 5px 0",
                    width: "100%"
                  }}
                >
                  <div
                    style={{
                      ...design.DIALOG_HEADER
                    }}
                  >
                    <div style={{ flex: "0 0 auto", marginRight: "10px" }}>
                      {RenderIcon(item.type, null, globalColor)}
                    </div>
                    <div>
                      <h4 className="bp3-heading" style={{ marginBottom: 0 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  {item.blocks.map((o, i) => {
                    return (
                      <div key={`block${i}`}>
                        <div style={{ display: "flex" }}>
                          <div>
                            {RenderBlockType(item.type, o, {
                              status: {
                                column: "R",
                                blockIndex: i,
                                sectionIndex: index,
                                id: o.id
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={Classes.DIALOG_FOOTER}
        style={{ margin: "0 50px 50px 50px" }}
      >
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <DowloadButton id="singlepdf" label="download" />
        </div>
      </div>
    </>
  );
};
/**
 *   <Section
                  {...item}
                  {...props}
                  isLeft={true}
                  isRight={false}
                  sectionindex={index}
                />
                 <div
        className={Classes.DIALOG_FOOTER}
        style={{ margin: "0 50px 50px 50px" }}
      >
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => (
              <Button icon="download" intent="success" onClick={toPdf}>
                {" "}
                Dowload
              </Button>
            )}
          </Pdf>
        </div>
      </div>
 */
