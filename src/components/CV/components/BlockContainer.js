import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Icon, Classes } from "@blueprintjs/core";
import BlockBase from "./BlockBase";
const BlockContainer = props => {
  return (
    <Droppable droppableId={`${props.id}`} type={props.type}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {props.lists.map((o, i) => {
            return (
              <Draggable key={o.id} draggableId={o.id} index={i}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <BlockBase
                      status={{
                        column: props.isRight && !props.isLeft ? "R" : "L",
                        blockIndex: i,
                        sectionIndex: props.sectionindex,
                        id: o.id,
                        sectiontitle: props.title
                      }}
                      {...o}
                      type={props.type}
                      value={o.value}
                      key={o.id}
                      dragHandler={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
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
export default BlockContainer;
