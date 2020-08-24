import React from "react";
import { ContextWrapper, Contextulize } from "./Context";
import Main from "./components/main";
import { DragDropContext } from "react-beautiful-dnd";
import Drawer from "./components/Drawer";
import "./slide.css";
import { Card } from "@blueprintjs/core";
//import PDFconverter from "./PDFconvert";
import G_Dialog from "./Context/Global_Dialog";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.sideRef = React.createRef();
  }

  render() {
    return (
      <>
        <ContextWrapper>
          <Contextulize.Consumer>
            {(store) => (
              <DragDropContext
                //   onDragStart={store.onDragStart.bind(this)}
                onDragEnd={store.onDragEnd.bind(this)}
              >
                <>
                  <G_Dialog {...store} />
                  <Main {...store} />
                  <div style={{ overflow: "hidden" }}>
                    <Card
                      className={
                        store.state.sidedrawer.isOpen === true
                          ? "slide"
                          : "closed"
                      }
                      style={{
                        top: "0",
                        zIndex: 10,
                        background: "rgb(51,255,255,0.1)",
                        backdropFilter: "blur(7px) ",
                        WebkitBackdropFilter: "blur(7px)",
                        height: "100vh",
                        overflowY: "auto",
                        padding: 0,
                        boxShadow:
                          "0 0 0 1px rgba(16,22,26,.1),0 1px 1px rgba(16,22,26,.2),0 2px 6px rgba(16,22,26,.2)",
                      }}
                    >
                      <Drawer {...store} />
                    </Card>
                  </div>
                </>
              </DragDropContext>
            )}
          </Contextulize.Consumer>
        </ContextWrapper>
      </>
    );
  }
}

export default App;
