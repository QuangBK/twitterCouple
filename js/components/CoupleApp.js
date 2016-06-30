import AddCoupleMutation from '../mutations/AddCoupleMutation';
import AddUserMutation from '../mutations/AddUserMutation';
//import DeleteUserMutation from '../mutations/DeleteUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TodoTextInput from './TodoTextInput';

import CoupleList from './CoupleList';
import UserList from './UserList';
//import AddUser from './AddUser';

class CoupleApp extends React.Component {

  _handleLike = (text) => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    Relay.Store.update(
      new AddUserMutation({name: text, age: 23, viewer: this.props.viewer})
    );
  }

  render() {
    const viewer = this.props.viewer;
    const couples = viewer.couples;
    return (
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
