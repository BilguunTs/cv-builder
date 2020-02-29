import React from "react";
import { Card } from "@blueprintjs/core";
import { connect } from "../../Context";
import Section from "./SectionTemplate";
const TestTemplate = props => {
  const { leftCollumn, rightCollumn } = props.context.state;
  return (
    <Card
      style={{ width: "612px", margin: "auto", Height: "792px" }}
      elevation={1}
    >
      <h1>My name is ...</h1>
      <h3>I am ...</h3>

      <div
        style={{
          display: "grid",
          //   gridTemplateColumns: " repeat( auto-fit, minmax(250px, 1fr) )",
          gridTemplateColumns: "2fr 1fr",
          gridGap: "10px"
        }}
      >
        <div
          style={{
            minHeight: "600px"
          }}
        >
          {leftCollumn.sections.map((item, index) => (
            <Section
              {...item}
              {...props}
              isLeft={true}
              isRight={false}
              sectionindex={index}
            />
          ))}
        </div>

        <div
          style={{
            minHeight: "600px"
          }}
        >
          {rightCollumn.sections.map((item, index) => (
            <Section
              {...item}
              {...props}
              isLeft={false}
              isRight={true}
              sectionindex={index}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
export default connect(TestTemplate);
