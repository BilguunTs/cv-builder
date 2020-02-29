import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
const Dropbase = props => {
  return (
    <Droppable droppableId={`${props.id}`} type="HTML_DOMEditable_Component">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {props.lists.map((o, i) => {
            return (
              <Draggable key={`${i}`} draggableId={`random${i}guys`} index={i}>
                {(provided, snapshot) => (
                  <div
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {o}
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
export default Dropbase;
