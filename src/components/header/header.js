import React, { Component } from 'react';

import styleSheet from '../../containers/app/appstyle';

import iron from '../../assets/iron.jpg';

class Header extends Component {
  render() {
    const p = this.props;
    const name = "Floyd Mullins";
    const {
      items
    } = p;
    return(
      <div style={styleSheet.header}>
        <div style={styleSheet.headerMsg}>
          <p style={styleSheet.greeting}>Hello {name}</p>
          <p style={styleSheet.taskNo}>You have {items.length} {items.length > 1 ? " tasks" : "task"}</p>
        </div>
        <div style={styleSheet.imageCont}>
          <img src={iron} style={styleSheet.avatar} alt="Avatar"/>
        </div>
      </div>
    )
  }
}

export default Header;
