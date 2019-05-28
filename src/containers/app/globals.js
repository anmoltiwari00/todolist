const globals = {
  reorder: (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  },
  getItemStyle: (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '0 0 15px 0',

    // change background colour if dragging
    background: '#ffffff',
    boxShadow: '0 1px 7px #a9a6a6',

    // styles we need to apply on draggables
    ...draggableStyle
  }),
  getListStyle: isDraggingOver => ({
    background: "#f8f8f9",
    width: '100%',
    height: '70vh'
  })
}

export default globals;
