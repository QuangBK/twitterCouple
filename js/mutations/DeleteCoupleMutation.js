import Relay from 'react-relay';

export default class DeleteCoupleMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer {
      id
      couples {
        count
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{deleteCouple}`;
  }

  getVariables() {
    return {
      id: this.props.id
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on deleteCouplePayload {
        id
        viewer {
          couples (first: 3) {
            edges{
              node{
                id
                nameA
                nameB
                tweet
                createdBy
                createdAt
              }
            }
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'couples',
      deletedIDFieldName: 'id'
    },
    {
      type: 'FIELDS_CHANGE',
      // Correlate the `updatedDocument` field in the response
      // with the DataID of the record we would like updated.
      fieldIDs: {viewer: this.props.viewer.id},
    }
    ];
  }
/*
  getOptimisticResponse() {
    return {
      id: this.props.id,
      viewer: {
        id: this.props.viewer.id
      }
    };
  }*/
}
