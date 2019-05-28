import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import getDate from '../../date';
import Picker from '../../components/calender/calender';
import './card.css';
import styleSheet from './cardStyle';

import close from '../../assets/close.png';
import calender from '../../assets/calendar.png';
import checked from '../../assets/checked.png';
import add from '../../assets/add.png';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      open: false,
      editing: false,
      showDate: false,
      editedDate: ""
    }
    this.handleClose = this.handleClose.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.showCalender = this.showCalender.bind(this);
    this.editDate = this.editDate.bind(this);
  }
  
  componentDidMount() {
    const p = this.props;
    if(p.open)
      this.setState({open: true});
    if(p.cardClicked) {
      this.setState({content: p.cardClicked.content, editing: true})
    }
  }
  
  handleClose() {
    document.getElementById('dialog').classList.add('fadeOutDialog');
    setTimeout(() => {
      this.setState({open: false, editing: false, content: ""}, () => this.props.close());
    }, 200);
  }
  
  handleChange(e) {
    this.setState({content: e.target.value})
  }
  
  addItemToList() {
    const p = this.props;
    if(this.state.editing) {
      if(this.state.editedDate)
        p.add(this.state.editing, p.cardClicked, {content: this.state.content, date: this.state.editedDate}, this.handleClose);
      else {
        p.add(this.state.editing, p.cardClicked, {content: this.state.content}, this.handleClose);
      }
    } else {
      const date = this.state.editedDate ? this.state.editedDate : getDate(null);
      p.add(this.state.editing, null, {id: p.items.length+1, content: this.state.content, date: date }, this.handleClose);
    }
  }
  
  showCalender() {
    this.setState({showDate: true});
  }
  
  editDate(date) {
    this.setState({editedDate: date});
  }

  render() {
    return(
      <Dialog fullScreen open={this.state.open} onClose={this.handleClose} id="dialog">
        <div className="left20 top20">
          <img src={close} alt="close" onClick={this.handleClose} className="close reverseRot"/>
        </div>
        <div>
          {
            this.state.showDate ? <Picker editDate={this.editDate} /> : null
          }
        </div>
        <TextField
            id="standard-multiline-flexible"
            placeholder="What would you like to add ?"
            multiline
            rows="15"
            value={this.state.content}
            onChange={(e) => this.handleChange(e)}
            margin="normal"
            style={styleSheet.input}
          />
        <div style={styleSheet.pickerCont}>
          <img src={calender} alt="Calender" style={styleSheet.cal} onClick={this.showCalender} />
        </div>
        
        <Button 
          variant="outlined" 
          style={styleSheet.button} 
          onClick={this.addItemToList} 
          className="cardActionBut"
          disabled={!this.state.content}
        >
          <span>
            {
              this.state.editing ? <img src={checked} /> : <img src={add} className="dialogAdd"/>
            }
          </span>
        </Button>
      </Dialog>
    )
  }
}

export default Card;
