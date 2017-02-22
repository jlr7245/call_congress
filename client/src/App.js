import React, { PropTypes } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dash from './pages/Dash';


export default class Root extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    // bind
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    //this.componentDidUpdate = this.componentDidUpdate.bind(this);
    // state
    this.state = { 
      name: this.props.name, 
    };
  }


//============= AUTH HELPERS
  handleLogin(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/login',
      headers: {
        'X-CSRF-TOKEN': this.props.token,
      },
      data: {
        username: e.target.username.value,
        password: e.target.password.value
      }
    }).then((res) => {
   //   if (auth)
    console.log(res);
    })
      .catch((err) => {console.log(err)});
    e.target.reset();
  }

  handleRegister(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/users',
      headers: {
        'X-CSRF-TOKEN': this.props.token,
      },
      data: {
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }
    }).then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    e.target.reset();
  }


  //======================= RENDER

  render() {
    return (
        <Router>
          <div className='wrapper'>
            <nav>
              <Link to='/login'>Log In</Link>
              <Link to='/register'>Register</Link>
            </nav>
            <Switch>
              <Route exact path='/' render={(props) => <Home name={this.props.name}/> }/>
              <Route path='/login' render={() => <Auth stage='login' handleLogin={this.handleLogin} handleRegister={this.handleRegister} />} />
              <Route path='/register' render={() => <Auth stage='register' handleLogin={this.handleLogin} handleRegister={this.handleRegister} />} />
              <Route path='/dashboard' render={() => <Dash user={this.state.user} auth={this.state.auth} stage='loggedin' />} />
            </Switch>
          </div>
        </Router>
    );
  }
}
