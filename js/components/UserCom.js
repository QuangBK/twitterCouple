import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import DeleteUserMutation from '../mutations/DeleteUserMutation';

class User extends React.Component {

  handleDestroyClick = () => {
    Relay.Store.update(
      new DeleteUserMutation({
        id: this.props.user.id,
        viewer: this.props.viewer
      }),
    );
  }

  render() {
    // Access the resolved data for the `user` fragment.
    var user = this.props.user;
    // Access the current `variables` that were used to fetch the `user`.
    
    return (
      <div>
        <span>Name: {user.name}, Age: {user.age}</span>
        <button onClick={this.handleDestroyClick}>Delete</button>
      </div>
    );
  }
}




//module.exports = User
module.exports = Relay.createContainer(User, {

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${DeleteUserMutation.getFragment('viewer')}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id
        name
        age
      }
    `,
  },
});