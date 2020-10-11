import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import RegistrationForm from './components/Landing/RegistrationForm';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <CookiesProvider>
        <Switch>
              <Route path="/signup" component={RegistrationForm}/>
              <Route path="/" render={(props) => <Home onLogin={this.handleLogin} {...props} />} />
            </Switch>
      </CookiesProvider>
    )
  }
}

export default withRouter(App);