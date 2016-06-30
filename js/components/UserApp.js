import AddUserMutation from '../mutations/AddUserMutation';
//import DeleteUserMutation from '../mutations/DeleteUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TodoTextInput from './TodoTextInput';

import UserList from './UserList';
//import AddUser from './AddUser';

class UserApp extends React.Component {

  _handleLike = (text) => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    Relay.Store.update(
      new AddUserMutation({name: text, age: 23, viewer: this.props.viewer})
    );
  }

  render() {
    const viewer = this.props.viewer;
    const users = viewer.users;
    return (
      <div>
        <div>
        <TodoTextInput className="new-todo"
                       placeholder="What needs to be done?"
                       autoFocus={true}
                       onSave={this._handleLike}
        />
        </div>
        <UserList users={users}
          viewer={viewer} />
      </div>
    );
  }
}

module.exports = Relay.createContainer(UserApp, {

  prepareVariables() {
    return {
      limit: 10
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
        users(last: $limit) {
          edges {
            node {
              id
              name
            }
          }
          ${UserList.getFragment('users')}
        }
        ${UserList.getFragment('viewer')}
        ${AddUserMutation.getFragment('viewer')}
      }
    `
  }
});