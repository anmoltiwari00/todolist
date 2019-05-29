import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import styleSheet from '../../containers/app/appstyle';
import '../../containers/app/app.css';

import trash from '../../assets/trash.png';
import add from '../../assets/add.png';

class HomeButton extends Component {
  render() {
    const p = this.props;
    const {
      onClick,
      dragging,
    } = p;
    return(
      <div style={styleSheet.buttonCont} id="action">
        {
          <Button variant="contained" className="add" onClick={onClick} id="actionBut">
            {
              dragging ? <img src={trash} alt="Trash" style={styleSheet.trashIcon} />
            : <img src={add} style={styleSheet.addIcon} alt="" />
            }
          </Button>
        }
      </div>
    )
  }
}

export default HomeButton;
