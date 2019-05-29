import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from '../card/card';
import TodoInner from '../../components/todoinner/todoinner';
import HomeButton from '../../components/homebutton/homebutton';
import Header from '../../components/header/header';

import './app.css';
import styleSheet from './appstyle';
import globals from './globals';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showDialog: false,
      dragging: false,
      editing: false,
      cardClicked: {},
      actionButtonLoc: 0
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleClasses = this.toggleClasses.bind(this);
    this.toggleZIndex = this.toggleZIndex.bind(this);
    this.toggleBackground = this.toggleBackground.bind(this);
  }
  
  componentDidMount() {
    const bottom = document.getElementById('actionBut').getBoundingClientRect().bottom;
    this.setState({actionButtonLoc: bottom});
  }
  
  onDragStart(result) { // called at the start of a drag
    this.setState({dragging: true}, () => {
      this.toggleClasses('actionBut', 'delete', 'add');
      const nodeList = document.querySelectorAll('.draggables');
      for(var i = 0; i < nodeList.length; i++) {
        const item = nodeList[i];
        if(item.id != result.draggableId) {
          item.classList.add('notDragging');
        }
      }
      var action = document.getElementById('action');
      action.style.zIndex = '10';
      var dragger = document.getElementById(result.draggableId);
      dragger.style.zIndex = '1000';
    })
  }
  
  onDragEnd(result) { // called at the end of a drag
    // dropped outside the list
    if (!result.destination) {
      this.setState({dragging: false});
      return;
    }
    const items = globals.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
  }
  
  toggleClasses(elem, add, remove) { // pure function for toggling and adding and removing classes
    var x = document.getElementById(elem);
    x.classList.add(add);
    x.classList.remove(remove);
  }
  
  toggleBackground(id) { //change background color of elements not being dragged
    const nodeList = document.querySelectorAll('.draggables');
    for(var i = 0; i < nodeList.length; i++) {
      const item = nodeList[i];
      if(item.id != id)
        item.classList.remove('notDragging');
    }
  }
  
  toggleZIndex(id) { //change z index of elements
    var action = document.getElementById('action');
    action.style.zIndex = '100000';
    var dragger = document.getElementById(id);
    dragger.style.zIndex = '';
  }
  
  onTouchEnd(e, item, drag) { // called at the end of a touch on touch devices
    if(drag) {
      e.preventDefault();
      this.setState({dragging: false}, () => {
        this.checkIfDroppedOnTrash(item.id);
      });
    }
  }
  
  checkIfDroppedOnTrash(id) { //checks if draggable is dropped on trash icon
    const y = this.state.actionButtonLoc;
    const draggable = document.getElementById(id);
    const draggablePos = draggable.getBoundingClientRect().bottom;
    if((draggablePos > y) && (draggablePos - y < 100)) {
        this.deleteDraggable(id);
    } else if((draggablePos < y) && (y - draggablePos < 100)){
      this.deleteDraggable(id);
    } else {
      this.toggleZIndex(id);
      this.toggleBackground(id);
      this.toggleClasses('actionBut', 'add', 'delete');
    }
  }
  
  deleteDraggable(id) { //deletes the div being dragged
    const filteredArray = this.state.items.filter(item => item.id != id);
    const newArray = [];
    if(filteredArray.length > 0) {
      filteredArray.forEach((item, index) => {
        newArray.push({id: index+1, date: item.date, content: item.content});
      });
      this.toggleZIndex(id);
      this.toggleBackground(id);
    }
    if(newArray.length == 0) {
      this.setState({items: [], dragging: false}, () => {
        this.toggleClasses('actionBut', 'add', 'delete');
        setTimeout(() => window.location.reload())
      });
    }
    else {
      this.setState({items: newArray, dragging: false}, () => this.toggleClasses('actionBut', 'add', 'delete'));
    }
  }
  
  openDialog() { //open content dialog box for creating card
    this.setState({showDialog: true, editing: false, cardClicked: {}})
  }
  
  closeDialog() {
    this.setState({showDialog: false})
  }
  
  addItem(editing, editingItem, newItem, callback) { //passed as prop to card.js for adding todo item
    if(editing) {
      var itemArrayWhenEditing = this.state.items;
      itemArrayWhenEditing.forEach(item => {
        if(item.id == editingItem.id) {
          item.content = newItem.content
          if(newItem.date)
            item.date = newItem.date
        }
      })
      this.setState({items: itemArrayWhenEditing, editing: false, cardClicked: {}}, () => callback())
    } else {
      var itemArray = this.state.items;
      itemArray.push(newItem);
      this.setState({items: itemArray}, () => callback());
    }
  }
  
  openDialogForEditing(item) { // called when updating a todo item
    this.setState({showDialog: true, editing: true, cardClicked: item})
  }

  render() {
    return(
      <div style={styleSheet.contStyle}>
        <div style={styleSheet.wrapper}>
          <Header items={this.state.items} />
          <div>
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={globals.getListStyle(snapshot.isDraggingOver)}
                    id="dragcont"
                  >
                    {this.state.items && this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index} >
                        {(provided, snapshot) => (
                          <TodoInner
                            item={item}
                            onClick={(e) => this.openDialogForEditing(item)}
                            onTouchEnd={(e) => this.onTouchEnd(e, item, snapshot.isDragging)}
                            snapshot={snapshot}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        {
          !this.state.showDialog ? 
            <HomeButton 
              onClick={this.openDialog}
              dragging={this.state.dragging}
            /> : null
        }
        {
          this.state.showDialog ?
           <Card 
             open
             close={this.closeDialog} 
             add={this.addItem} 
             items={this.state.items}
             cardClicked={this.state.editing ? this.state.cardClicked : null}
            /> 
           : null
        }
      </div>
    )
  }
}

export default App;
