import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import User from './components/User/User';
import RegistrationForm from './components/Landing/RegistrationForm';
import KanbanTable from './components/User/KanbanTable';
import CardPage from './components/User/CardPage';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <CookiesProvider>
        <Switch>
          <Route path="/card" component={CardPage}/>
          <Route path="/kanban" component={KanbanTable}/>
          <Route path="/signup" component={RegistrationForm}/>
          <Route path="/user" render={(props) => <User {...props} />}/>
          <Route path="/" render={(props) => <Home onLogin={this.handleLogin} {...props} />} />
        </Switch>
      </CookiesProvider>
    )
  }
}

export default withRouter(App);
