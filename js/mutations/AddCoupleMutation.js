import Relay from 'react-relay';

export default class AddCoupleMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer {
      id
      couples {        
        count
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{addCouple}`;
  }

  getVariables() {
    return {
      nameA: this.props.nameA,
      nameB: this.props.nameB,
      tweet: this.props.tweet,
      createdBy: this.props.createdBy
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on addCouplePayload {
        changedCoupleEdge{
          node {
            id
            nameA
            nameB
            tweet
            createdBy
            createdAt
          }
        }
        viewer {
          id
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
    return [
    {
      type: 'FIELDS_CHANGE',
      // Correlate the `updatedDocument` field in the response
      // with the DataID of the record we would like updated.
      fieldIDs: {viewer: this.props.viewer.id},
    }
    ];
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
*/  
  getOptimisticResponse() {
    return {
      changedTodoEdge: {
        node: {
          nameA: this.props.nameA,
          nameB: this.props.nameB,
          tweet: this.props.tweet,
          createdBy: this.props.createdBy
        }
      },
      viewer: {
        id: this.props.viewer.id,
        couples: {
          count: this.props.viewer.couples.count + 1
        }
      }
    };
  }
}
