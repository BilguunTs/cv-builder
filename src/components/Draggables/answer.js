import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "./utils";
import { Icon, Card, Classes, EditableText } from "@blueprintjs/core";
import DND from "./Dropbase";
const Answers = props => {
  const { question, questionNum } = props;
  return (
    <Droppable droppableId={`${question.id}`} type="ANSWER">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {question.answers.map((answer, index) => {
            return (
              <Draggable
                key={`${questionNum}${index}`}
                draggableId={`justrandom${questionNum}${index}guys`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    rootIndex={questionNum}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Card
                      style={{
                        background: snapshot.isDragging ? "lightgreen" : null
                      }}
                    >
                      <div className={Classes.HEADING}>
                        <span {...provided.dragHandleProps}>
                          <Icon icon="drag-handle-vertical" />
                        </span>
                        {answer.id}
                      </div>
                      <EditableText>
                        alskdjflsdkjsdlkjsd;lksdjlkfsdajslkdjsd
                        aglskdjsdagljgsdalkgdj;lkgsajsdg
                      </EditableText>
                      <DND
                        id={`something${answer.id}`}
                        lists={answer.content.source}
                      />
                    </Card>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Answers;
