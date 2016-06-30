import React from 'react';
import Relay from 'react-relay';

//import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';

import UserCom from './UserCom';

class UserList extends React.Component {
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
      <UserCom key={edge.node.id}
            user={edge.node}
            viewer={this.props.viewer} />
    );
  }

  render() {
/*    const todoCount = this.props.todos.count;
    const edges = this.props.todos.edges;
    const done = edges.filter((edge) => edge.node.complete);
    const todos = this.getFilteredTodos();*/
    const users = this.props.users.edges
    const userList = users.map(this.makeTodo);
    return (
      <section className="main">
        <ul className="todo-list">
          {userList}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(UserList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${UserCom.getFragment('viewer')}
      }
    `,
    users: () => Relay.QL`
      fragment on UserConnection {
        count
        edges {
          node {
            id
            ${UserCom.getFragment('user')}
          }
        }
      }
    `
  }
});
