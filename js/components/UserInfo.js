import React from 'react';
import ReactDOM from 'react-dom';
import User from './UserCom';
import Relay from 'react-relay';

class ProfileRoute extends Relay.Route {
  static queries = {
    user: () => Relay.QL`
      query { user(id: $userID) }
    `,
  };
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    userID: {required: true},
  };
  static routeName = 'ProfileRoute';
}


var profileRoute = new ProfileRoute({userID: 'VXNlcjo1NzZiNTU1Y2EwZGM2NWQyMTBlZjU4NGY='});
ReactDOM.render(
  <Relay.RootContainer
    Component={User}
    route={profileRoute}
  />,
  document.getElementById('root')
);