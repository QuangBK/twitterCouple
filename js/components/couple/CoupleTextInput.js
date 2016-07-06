import React from 'react';
import ReactDom from 'react-dom';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

export default class TodoTextInput extends React.Component {
  static defaultProps = {
    commitOnBlur: false
  }

  state = {
    isEditing: false,
    text: {}
  }

  componentDidMount() {
    ReactDom.findDOMNode(this).focus();
  }

  handleBlur = () => {
    if (this.props.saveOnBlur) {
      this.save();
    }
  }

  handleChangeA = (e) => {
    var text = this.state.text;
    text.nameA = e.target.value;
    this.setState({ text : text});
  }

  handleChangeB = (e) => {
    var text = this.state.text;
    text.nameB = e.target.value;
    this.setState({ text : text});
  }

  handleChangeTweet = (e) => {
    var text = this.state.text;
    text.tweet = e.target.value;
    this.setState({ text : text});
  }

  handleChangeCreatedBy = (e) => {
    var text = this.state.text;
    text.createdBy = e.target.value;
    this.setState({ text : text});
  }
/*
  handleKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === ESC_KEY_CODE) {
      this.props.onCancel();
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
  }

  save() {
    const text = this.state.text.trim();
    if (this.props.onDelete && text === '') {
      this.props.onDelete();
    } else if (this.props.onCancel && text === this.props.initialValue) {
      this.props.onCancel();
    } else if (text !== '') {
      this.props.onSave(text);
      this.setState({ text: {} });
    }
  }
*/
  addCouple = () => {
    const text = this.state.text;
    this.props.onSave(text);
    var newText = {};
    newText.createdBy = text.createdBy;
    newText.tweet = text.tweet;
    this.setState({ text: newText });
  }
  submitForm = (e) => {
    e.preventDefault(); 
  }
/*
<div class="container">
  <h2>Vertical (basic) form</h2>
  <form role="form">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" placeholder="Enter password">
    </div>
    <div class="checkbox">
      <label><input type="checkbox"> Remember me</label>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
</div>
*/
  render() {
    return (
      <div>
      <form role="form" onSubmit={this.submitForm}>
        <div className="form-group">
          <input className={this.props.className || ''}
                 placeholder="User A"
                 value={this.state.text.nameA}
                 onChange={this.handleChangeA}
                 />
        </div>
        <div className="form-group">
        <input className={this.props.className || ''}
               placeholder="User B"
               value={this.state.text.nameB}
               onChange={this.handleChangeB}
               />
        </div>
        <div className="form-group">
        <input className={this.props.className || ''}
               placeholder="Search query, e.g: 'i love you my honey lang:en since:2016-06-26 until:2016-07-02'"
               value={this.state.text.tweet}
               onChange={this.handleChangeTweet}
               />
        </div>
        <div className="form-group">
        <input className={this.props.className || ''}
               placeholder="CreatedBy"
               value={this.state.text.createdBy}
               onChange={this.handleChangeCreatedBy}
               />
        </div>
        <button className="btn btn-primary" onClick={this.addCouple}>Add</button>
      </form>
      </div>
    );
  }
}
