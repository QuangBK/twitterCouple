import AddCoupleMutation from '../mutations/AddCoupleMutation';
//import DeleteUserMutation from '../mutations/DeleteUserMutation';
import React from 'react';
import Relay from 'react-relay';
import CoupleTextInput from './CoupleTextInput';

import CoupleList from './CoupleList';
//import AddUser from './AddUser';

class CoupleApp extends React.Component {

  _handleLike = () => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    var data = {nameA: "A", nameB: "B", tweet: "C", createdBy: "D"};
    Relay.Store.update(
      new AddCoupleMutation({nameA: data.nameA, nameB: data.nameB, tweet: data.tweet, 
        createdBy: data.createdBy, viewer: this.props.viewer})
    );
  }

  render() {
    const viewer = this.props.viewer;
    const couples = viewer.couples;
    return (
      <div>
        <div>
        <button onClick={this._handleLike}>Add</button>
        <CoupleList couples={couples}
          viewer={viewer} />
      </div>
    );
  }
}

module.exports = Relay.createContainer(CoupleApp, {

  prepareVariables() {
    return {
      limit: 10
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
        couples(first: $limit) {
          edges {
            node {
              id
            }
          }
          ${CoupleList.getFragment('couples')}
        }
        ${CoupleList.getFragment('viewer')}
        ${AddCoupleMutation.getFragment('viewer')}
      }
    `
  }
});
