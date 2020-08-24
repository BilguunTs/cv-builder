import React, { Component } from "react";
import Header from "./layout/header";
import Body from "./layout/body";
import Footer from "./layout/footer";
import { AppToaster } from "./utils/Toaster";
import Status from "./CV/Status/treeview";
import Document from "./CV";
import Review from "../PDFconvert";
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
    };
  }
  componentDidUpdate() {
    const { toast } = this.props.state.snippets;

    if (toast.isOpen) {
      AppToaster.show({ message: toast.content, intent: toast.type });
    }
  }
  // create toasts in response to interactions.
  // in most cases, it's enough to simply create and forget (thanks to timeout).

  styles = {
    root: { display: "flex", flexDirection: "row", margin: "100px" },
  };
  render() {
    return (
      <div
        style={{
          backgroundImage: " linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
        }}
      >
        <Header />
        <Body>
          <div style={{ ...this.styles.root }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ position: "fixed", top: "140px" }}>
                <Status />
              </div>
            </div>
            <div style={{ flexGrow: 3 }}>
              <Document {...this.props} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <Review />
            </div>
          </div>
        </Body>
        <Footer>
          <div style={{ justifyItems: "center" }}>2020</div>
        </Footer>
      </div>
    );
  }
}
export default Page;
/**
 *     <PaperWrapper>
                <h1>Name</h1>
                <div>summaryy</div>
                <Draggable />
              </PaperWrapper>
 */
