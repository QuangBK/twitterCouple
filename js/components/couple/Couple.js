import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import DeleteCoupleMutation from '../../mutations/DeleteCoupleMutation';

class Couple extends React.Component {

  handleDestroyClick = () => {
    Relay.Store.update(
      new DeleteCoupleMutation({
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
      <tr>
        <td>{couple.nameA}</td>
        <td>{couple.nameB}</td>
        <td>{couple.tweet}</td>
        <td>{couple.createdBy}</td>
        <td>{couple.createdAt}</td>
        <td><button onClick={this.handleDestroyClick} className="btn btn-danger">Delete</button></td>
      </tr>
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