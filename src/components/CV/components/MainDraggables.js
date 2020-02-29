import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Section from "./Section";

const mainDraggable = props => {
  const { leftCollumn, rightCollumn, focusedElement } = props.state;

  return (
    <div
      style={{
        display: "grid",
        //   gridTemplateColumns: " repeat( auto-fit, minmax(250px, 1fr) )",
        gridTemplateColumns: "2fr 1fr",
        gridGap: "10px"
      }}
    >
      <div>
        <Droppable droppableId={leftCollumn.id} type="section_container">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                border: snapshot.isDraggingOver ? "2px dashed lightblue" : null,
                minHeight: "600px"
              }}
            >
              {leftCollumn.sections.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Section
                        {...item}
                        {...props}
                        isLeft={true}
                        isRight={false}
                        draghandler={provided.dragHandleProps}
                        sectionindex={index}
                        isDraging={snapshot.isDragging}
                        isActive={focusedElement === item.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div>
        <Droppable droppableId={rightCollumn.id} type="section_container">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                border: snapshot.isDraggingOver ? "2px dashed lightblue" : null,

                minHeight: "600px"
              }}
            >
              {rightCollumn.sections.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Section
                        draghandler={provided.dragHandleProps}
                        isDraging={snapshot.isDragging}
                        {...props}
                        isRight={true}
                        isLeft={false}
                        sectionindex={index}
                        {...item}
                        isActive={focusedElement === item.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
export default mainDraggable;
/**
 *  <Answers questionNum={index} question={question} />
 */
