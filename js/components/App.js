import React from 'react';
import ReactDOM from 'react-dom';
//import User from './UserCom';
import Relay from 'react-relay';
import AppRoute from '../routes/AppRoute';

import UserApp from './UserApp';
import CoupleApp from './couple/CoupleApp';

/*class ProfileRoute extends Relay.Route {
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


var profileRoute = new ProfileRoute({userID: 'VXNlcjo1NzZiZjhmZTQ0NTJlOWIyMTBiZDAxMjg='});*/

/*        onReadyStateChange={function(data, readyState){
          var isRefreshing = readyState.ready;
          var text = isRefreshing ? "OK" : "Waitting...";
          return (
            <div>
              <h1>{text}</h1>
              <CoupleApp {...data} />
            </div>
          );          
        }}
        renderFetched={function(data, readyState) {
          var isRefreshing = readyState.stale;
          return (
            <ScrollView>
              <Spinner style={{display: isRefreshing ? 'block' : 'none' }}
              <ProfilePicture {...data} />
            </ScrollView>
          );
        }}*/

export default class App extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={CoupleApp}
        route={new AppRoute}
        renderLoading={function() {
          return <h2>Loading...</h2>;
        }}
        onReadyStateChange={function(state){
          //console.log("App changed");
          //console.log(state);
/*          var isRefreshing = readyState.ready;
          var text = isRefreshing ? "OK" : "Waitting...";
          return (
            <div>
              <h1>{text}</h1>
            </div>
          ); */
        }}
      />
    );
  }
}
