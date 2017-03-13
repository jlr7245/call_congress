import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './styles/reset.css';
import './App.css';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dash from './pages/Dash';
import Search from './pages/Search';
import Bills from './pages/Bills';
import About from './pages/About';

import Nav from './app-partials/Nav';
import Footer from './app-partials/Footer';


export default class Root extends React.Component {

  constructor() {
    super();

    // bind
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.locationFinder = this.locationFinder.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    this.setStateWithDist = this.setStateWithDist.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.showModal = this.showModal.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.learnLaw = this.learnLaw.bind(this); // fold into showModal
    this.watchLaw = this.watchLaw.bind(this); // fold into addToWatched

    // state
    this.state = { 
      auth: false, 
      stage: 'home',
      registration: {
        st: '',
        dst: '',
        resultpicker: false,
        resArray: [],
      },
      user: {},
      modal: {
        show: false,
        id: '',
        type: ''
      }
    };

  }

  // ========= LIFECYCLE METHODS
  componentDidUpdate() {
    console.log('update');
  }

  componentDidMount() {
    this.locationFinder();
  }


//============= AUTH HELPERS
  handleLogin(e) {
    e.preventDefault();
    axios.post( '/api/auth/login', {
        username: e.target.username.value,
        password: e.target.password.value
    }).then((res) => {
      this.setState({auth: res.data.auth, user: res.data.user, stage: 'dash'});
    })
      .catch((err) => {console.log(err)});
    e.target.reset();
  }

  handleRegister(e, st, dst) {
    e.preventDefault();
    axios.post('/api/auth/register', {
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        state: st,
        district: dst
      }).then((res) => {
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

  //======================= REGISTRATION

  locationFinder() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getDistrict, this.handleLocationError); 
    } else {
      console.log('no location');
    }
  }

   // this error handler is from https://www.w3schools.com/HTML/html5_geolocation.asp

  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.setState({message: 'You denied the request for location'});
        break;
      case error.POSITION_UNAVAILABLE:
        this.setState({message: 'Location information is unavailable'});
        break;
      case error.TIMEOUT:
        this.setState({message: 'the request to get your information timed out.'});
        break;
      case error.UNKNOWN_ERROR:
        this.setState({message: 'An unknown error occurred.'});
        break;
      default:
        this.setState({message: "whoops"});
        break;
    }
  }

  getDistrict(position) {
    axios.post('/api/ext/geo', {
      latlng: `${position.coords.latitude},${position.coords.longitude}`
    }).then((res) => {
      const registration = {...this.state.registration};
      registration.resultpicker = true;
      registration.resArray = res.data.resultArray;
      this.setState({
        registration,
      });
    }).catch((err) => console.log(err));
  }

  setStateWithDist(resArr) {
    const registration = {...this.state.registration};
    registration.st = resArr[1];
    registration.dst = resArr[0];
    this.setState({
      registration,
    });
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

  //====================== BILL HELPERS
  
  watchLaw(id) {
    console.log(id); // these get folded into 
  }

  learnLaw(id) {
    console.log(id);
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
              <div className='container'>
            <Switch>

              <Route exact 
                path='/' 
                render={(props) => <Home 
                  authRoute={false}
              />} />

              <Route 
                path='/login' 
                render={() => ( this.state.auth ? <Redirect push to='/dashboard' /> : <Home 
                  authRoute={true}
                  stage='login' 
                  handleLogin={this.handleLogin} 
                  handleRegister={this.handleRegister} 
              />) } />

              <Route 
                path='/register' 
                render={() => ( this.state.auth ? <Redirect push to='/dashboard' /> : <Home 
                  authRoute={true}
                  stage='register' 
                  handleLogin={this.handleLogin} 
                  handleRegister={this.handleRegister} 
                  registration={this.state.registration}
                  setStateWithDist={this.setStateWithDist}
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
                  learnLaw={this.learnLaw}
                  watchLaw={this.watchLaw} 
                />}
              />
              
              <Route
                path='/about'
                render={() => <About />}
              />

            </Switch>
            </div>
            <Footer />
          </div>
          
        </Router>
    );
  }
}
