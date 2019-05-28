import React, { Component } from 'react';

import globals from '../../containers/app/globals';
import styleSheet from '../../containers/app/appstyle';

import alarm from '../../assets/alarm.svg';

class TodoInner extends Component {
  render() {
    const p = this.props;
    const { 
      provided,
      snapshot, 
      onClick,
      onTouchMove,
      onTouchEnd,
      item 
    } = p;
    return(
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={globals.getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
        className="draggables apart"
        id={item.id}
        onClick={onClick}
        onTouchEnd={onTouchEnd}
      >
        <div>
          <p style={styleSheet.content}>{item.content}</p>
          <p style={styleSheet.date}>Due {item.date}</p>
        </div>
        <div style={styleSheet.alarmCont}>
          <img src={alarm} alt="Alarm"/>
        </div>
      </div>
    )
  }
}

export default TodoInner;
