import React from "react";
import { Card } from "@blueprintjs/core";

import CVheader from "./components/Header";
import Summary from "./components/Summary";
import MainDraggables from "./components/MainDraggables";
import PDFconvertWrapper from "../../PDFconvert";
export default function CV(props) {
  /**height: "297mm",  width: "210mm"*/
  console.log(props);
  return (
    <>
      <Card
        style={{ margin: "auto", width: "210mm", minHeight: "297mm" }}
        elevation={1}
      >
        <CVheader {...props} />
        <Summary {...props} />
        <MainDraggables {...props} />
      </Card>
    </>
  );
}
