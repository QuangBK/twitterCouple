import Relay from 'react-relay';

export default class AddUserMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer {
      id
      users {
        count
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{addUser}`;
  }

  getVariables() {
    return {
      name: this.props.name,
      age: this.props.age
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on addUserPayload {
        changedUserEdge
        viewer {
          users {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      edgeName: 'changedUserEdge',
      rangeBehaviors: {
        '': 'prepend'
      }
    }];
  }
/*
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: "1"
      }
    }];
  }

*/  getOptimisticResponse() {
    return {
      changedUserEdge: {
        node: {
          name: "Goku",
          age: 27
        }
      },
      viewer: {
        id: this.props.viewer.id
      }
    };
  }
}
