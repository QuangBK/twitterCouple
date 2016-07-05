import AddCoupleMutation from '../../mutations/AddCoupleMutation';
//import DeleteUserMutation from '../mutations/DeleteUserMutation';
import React from 'react';
import Relay from 'react-relay';
import CoupleTextInput from './CoupleTextInput';

import CoupleList from './CoupleList';
//import AddUser from './AddUser';

class CoupleApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {alert: 'Status', type : 'alert alert-info'};
  }

  _handleLike = (data) => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    //var data = {nameA: "A", nameB: "B", tweet: "C", createdBy: "D"};
    var onSuccess = () => {
      //console.log('Mutation successful!');
      this.setState({alert: 'Success', type : 'alert alert-success'});
      //this.props.onAddSuccess();
    };
    var onFailure = (transaction) => {
      //console.log(transaction);
      var error = transaction.getError() || new Error('Mutation failed.');
      //console.error(error);
      //this.props.onAddFailure(error.statusText);
      this.setState({alert: error.statusText, type : 'alert alert-danger'});
    };

    Relay.Store.update(
      new AddCoupleMutation({nameA: data.nameA, nameB: data.nameB, tweet: data.tweet, 
        createdBy: data.createdBy, viewer: this.props.viewer})
    , {onFailure, onSuccess});
  }

  render() {
    const viewer = this.props.viewer;
    const couples = viewer.couples;
    const amount = couples.count;
    return (
      <div>
        <div className={this.state.type}>
          {this.state.alert}
        </div>
        <div className="container">
          <div className="row">
          <CoupleTextInput className="form-control"
                         placeholder="What needs to be done?"
                         autoFocus={true}
                         onSave={this._handleLike}
          />
          </div>
          <div className="row">
          <p>
            Note: Month<br></br>
            Quang: 7, 5, 4,...<br></br>
            Thai: 6, 4, 2,...
          </p>
          <h3>Last 10 record</h3>
          <p><strong>Total: {amount}</strong></p>
          <CoupleList couples={couples}
            viewer={viewer} />        
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Relay.createContainer(CoupleApp, {

  prepareVariables() {
    return {
      limit: 3
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        couples(first: 10, orderBy: CREATEDAT_DESC) {
          edges {
            node {
              id
            }
          }
          count
          ${CoupleList.getFragment('couples')}          
        }
        ${CoupleList.getFragment('viewer')}
        ${AddCoupleMutation.getFragment('viewer')}    
      }
    `
  }
});
