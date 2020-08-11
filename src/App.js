import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Main from './screens/main';


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={(props) => (
      localStorage.getItem('access_token') ? <Component {...props} /> : <Redirect to="/login"/>
    )} 
  />
)

class App extends Component {
  render() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Switch>
                      <Route path='/' component={Main}/>
                    </Switch>
                  </Router>
              </Provider>
          </div>
      );
    }
}
export default App;
