import React, { PropTypes } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dash from './pages/Dash';


export default class Root extends React.Component {

  constructor(props) {
    super(props);

    // bind
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    // state
    this.state = { 
      auth: false, 
      stage: 'home'
    };
  }


  componentDidUpdate() {
    console.log('update');
    // if (this.state.stage == 'dash') {
    //   <Redirect push to='/dashboard' />;
    // }
  }


//============= AUTH HELPERS
  handleLogin(e) {
    e.preventDefault();
    axios.post( '/api/auth/login', {
        username: e.target.username.value,
        password: e.target.password.value
    }).then((res) => {
      this.setState({auth: res.data.auth, user: res.data.user, stage: 'dash'});
      console.log(res.data);
    })
      .catch((err) => {console.log(err)});
    e.target.reset();
  }

  handleRegister(e) {
    e.preventDefault();
    axios.post('/api/auth/register', {
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        state: e.target.state.value,
        district: e.target.district.value
      }).then((res) => {
        console.log(res.data);
        if (res.data.auth) {
          this.setState({auth: res.data.auth, user: res.data.user, stage: 'dash'});
        }
      })
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
              <Route exact 
                path='/' 
                render={(props) => <Home 
                  name={this.props.name}
              />} />
              <Route 
                path='/login' 
                render={() => ( this.state.auth ? <Redirect push to='/dashboard' /> : <Auth 
                  stage='login' 
                  handleLogin={this.handleLogin} 
                  handleRegister={this.handleRegister} 
              />) } />
              <Route 
                path='/register' 
                render={() => ( this.state.auth ? <Redirect push to='/dashboard' /> : <Auth 
                  stage='register' 
                  handleLogin={this.handleLogin} 
                  handleRegister={this.handleRegister} 
              />)} />
              <Route 
                path='/dashboard' 
                render={() => <Dash 
                  user={this.state.user} 
                  auth={this.state.auth} 
                  stage='loggedin' 
              />} />
            </Switch>
          </div>
        </Router>
    );
  }
}
