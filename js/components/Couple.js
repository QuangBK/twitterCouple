import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import DeleteCoupleMutation from '../mutations/DeleteCoupleMutation';

class Couple extends React.Component {

  handleDestroyClick = () => {
    Relay.Store.update(
      new DeleteUserMutation({
        id: this.props.couple.id,
        viewer: this.props.viewer
      }),
    );
  }

  render() {
    // Access the resolved data for the `user` fragment.
    var couple = this.props.couple;
    // Access the current `variables` that were used to fetch the `user`.
    
    return (
      <div>
        <span>A: {couple.nameA}, B: {couple.nameB}</span>
        <button onClick={this.handleDestroyClick}>Delete</button>
      </div>
    );
  }
}




//module.exports = User
module.exports = Relay.createContainer(Couple, {

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${DeleteCoupleMutation.getFragment('viewer')}
      }
    `,
    couple: () => Relay.QL`
      fragment on Couple {
        id
        nameA
        nameB
        tweet
        createdBy
        createdAt
      }
    `,
  },
});