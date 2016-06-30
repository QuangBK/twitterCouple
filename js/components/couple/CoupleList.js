import React from 'react';
import Relay from 'react-relay';

//import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';

import Couple from './Couple';

class CoupleList extends React.Component {
/*  getFilteredTodos() {
    const edges = this.props.todos.edges;
    if (this.props.filter === 'active') {
      return edges.filter((todo) => !todo.node.complete);
    } else if (this.props.filter === 'completed') {
      return edges.filter((todo) => todo.node.complete);
    }
    return edges;
  }

  handleToggleAllChange = () => {
    const todoCount = this.props.todos.count;
    const edges = this.props.todos.edges;
    const done = edges.filter((edge) => edge.node.complete);
    const setTo = todoCount === done ? false : true;

    edges
      .filter((edge) => edge.node.complete !== setTo)
      .forEach((edge) => Relay.Store.update(
        new ChangeTodoStatusMutation({
          id: edge.node.id,
          complete: setTo
        })
      ));
  }
*/
  makeTodo = (edge) => {
    return (
      <Couple key={edge.node.id}
            couple={edge.node}
            viewer={this.props.viewer} />
    );
  }

  render() {
/*    const todoCount = this.props.todos.count;
    const edges = this.props.todos.edges;
    const done = edges.filter((edge) => edge.node.complete);
    const todos = this.getFilteredTodos();*/
    const couples = this.props.couples.edges
    const coupleList = couples.map(this.makeTodo);
    return (
      <section className="main">
      <table className="table">
        <thead>
          <tr>
            <th>NameA</th>
            <th>NameB</th>
            <th>Tweet</th>
            <th>CreatedBy</th>
            <th>CreateAt</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {coupleList}
        </tbody>
      </table>
      </section>
    );
  }
}

export default Relay.createContainer(CoupleList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${Couple.getFragment('viewer')}
      }
    `,
    couples: () => Relay.QL`
      fragment on CoupleConnection {
        count
        edges {
          node {
            id
            ${Couple.getFragment('couple')}
          }
        }
      }
    `
  }
});
