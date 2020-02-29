import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Reorder,
  getItemStyle,
  getQuestionListStyle,
  array_move,
  TwoTargets
} from "./utils";
import Answers from "./answer";
import { Icon, Card, Classes } from "@blueprintjs/core";
import update from "immutability-helper";
// fake data generator

class DnDContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          id: `qre`,
          content: `question 0`,
          answers: [
            {
              id: "answer-1",
              content: {
                id: "content-1",
                source: ["qrweewq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            },
            {
              id: "answer-2",
              content: {
                id: "content-2",
                source: ["qrweewq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            },
            {
              id: "answer-3",
              content: {
                id: "content-3",
                source: ["qrq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            }
          ]
        },
        {
          id: `1gdsagsd`,
          content: `question 1`,
          answers: [
            {
              id: "answer-1",
              content: {
                id: "content-1",
                source: ["qrweewq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            },
            {
              id: "answer-2",
              content: {
                id: "content-2",
                source: ["qrweewq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            },
            {
              id: "answer-3",
              content: {
                id: "content-3",
                source: ["qrq", "agddagsdsg", "agdasgsagd", "agsgdsa"]
              }
            }
          ]
        }
      ]
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  MoveOneToAnother = (
    targetrootIndex,
    targetIndex,
    droprootIndex,
    dropIndex
  ) => {
    if (this.state.questions[targetrootIndex] === undefined) {
      return;
    }
    const pickedItem = this.state.questions[targetrootIndex].answers[
      targetIndex
    ];
    this.setState({
      ...this.state,
      questions: update(this.state.questions, {
        [targetrootIndex]: { answers: { $splice: [[targetIndex, 1]] } },
        [droprootIndex]: { answers: { $splice: [[dropIndex, 0, pickedItem]] } }
      })
    });
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }
    if (result.type === "HTML_DOMEditable_Component") {
      return;
    }
    if (result.type === "QUESTIONS") {
      const questions = array_move(
        this.state.questions,
        result.source.index,
        result.destination.index
      );

      this.setState({
        questions
      });
    } else {
      console.log(result);
      let rootindex = this.state.questions.findIndex(
        q => q.id === result.source.droppableId
      );
      if (result.source.droppableId === result.destination.droppableId) {
        const answers = Reorder(
          this.state.questions[parseInt(rootindex, 10)].answers,
          result.source.index,
          result.destination.index
        );

        const questions = JSON.parse(JSON.stringify(this.state.questions));

        questions[rootindex].answers = answers;

        this.setState({
          questions
        });
      } else {
        let targetSI = this.state.questions.findIndex(
          a => a.id === result.destination.droppableId
        );
        this.MoveOneToAnother(
          rootindex,
          result.source.index,
          targetSI,
          result.destination.index
        );
      }
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="droppable"
          direction="horizontal"
          type="QUESTIONS"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getQuestionListStyle(snapshot.isDraggingOver)}
            >
              {this.state.questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                  isDragDisabled
                >
                  {(provided, snapshot) => (
                    <div
                      style={{
                        border: snapshot.isDragging
                          ? "1px dashed lightgreen"
                          : null
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Answers questionNum={index} question={question} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DnDContent;
