import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dash from './pages/Dash';
import Search from './pages/Search';
import Bills from './pages/Bills';

import Nav from './app-partials/Nav';


export default class Root extends React.Component {

  constructor(props) {
    super(props);

    // bind
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.showModal = this.showModal.bind(this);
    this.addToWatched = this.addToWatched.bind(this);

    // state
    this.state = { 
      auth: false, 
      stage: 'home',
      user: {},
      modal: {
        show: false,
        id: '',
        type: ''
      }
    };
  }

  //
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
          this.setState({
            auth: res.data.auth, 
            user: res.data.user, 
            stage: 'dash'
          });
        }
      })
      .catch((err) => console.log(err));
    e.target.reset();
  }

  //======================= MODAL HELPERS

  showModal(type, id) {
    axios.get(`/api/ext/mod/${type}/${id}`)
      .then((res) => {
        console.log(res);
        const modal = {...this.state.modal};
        modal.show = true;
        modal.id = id;
        modal.type = type;
        modal.info = res.data.modalInfo;
        this.setState({ modal })
      })
      .catch((err) => console.log(err));
  }


  //======================= ADD TO WATCHED

  addToWatched(type, id) {
    axios.get(`/api/dash/add/${type}/${id}`)
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)});
  }

  removeFromWatched(type, id) {
    axios.delete(`/api/dash/delete/${type}/${id}`)
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)});
  }

  //======================= RENDER

  render() {
    return (
        <Router>
          <div className='wrapper'>
              <Nav auth={this.state.auth} />
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
                render={() => ( this.state.auth ? <Dash 
                  user={this.state.user} 
                  auth={this.state.auth} 
                  stage='loggedin' 
                  modal={this.state.modal}
                  showModal={this.showModal}
              /> : <Redirect push to='/login' /> ) } />

              <Route
                path='/search'
                render={() => <Search
                  auth={this.state.auth}
                  addToWatched={this.addToWatched}
                 />}
              />

              <Route
                path='/bills'
                render={() => <Bills
                  auth={this.state.auth} 
                />}
              />
            </Switch>
          </div>
        </Router>
    );
  }
}
