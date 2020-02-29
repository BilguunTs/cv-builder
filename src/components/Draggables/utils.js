export const Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export function array_move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}
export const getIndexByID = (array, id) => {
  if ((!Array.isArray(array) && id === null) || id === undefined) {
    throw Error(
      "Arguments must meet pre-condition: type of array for first argument"
    );
  }
  const statement = el => el.id === id;
  return array.findIndex(statement);
};
export function TwoTargets(targetArray, dropArray, targetIndex, dropIndex) {
  const resultArray = [];
  const pickedItem = targetArray.splice(targetIndex, 1)[0];
  const result = dropArray.splice(dropIndex, 0, pickedItem);
  resultArray[0] = targetArray;
  resultArray[1] = result;
  return resultArray;
}
const grid = 6;
export const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer

    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "left",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : null,

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getQuestionListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : null,
  display: "grid",
  gridTemplateColumns: " repeat( auto-fit, minmax(250px, 1fr) )"
});

export const getAnswerListStyle = isDraggingOver => ({
  border: isDraggingOver ? "3px dashed lightblue" : "3px dashed lightgrey",
  padding: 4,
  margin: "3px",
  width: "auto",
  minHeight: 400
});
