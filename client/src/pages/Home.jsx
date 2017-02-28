import React from 'react';

import Auth from './Auth';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inspirationalQuotes=[
    'Decisions are made by those who show up.',
    'The voice of the people cannot be silenced.',
    'We must do better and we will do better.',
    'There is work to be done.',
    'Thoughtful & committed citizens can change the world.'
    ]
    this.state = {
      authRoute: this.props.authRoute,
      currentQuote: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({ currentQuote: this.inspirationalQuotes[Math.floor(Math.random() * this.inspirationalQuotes.length)] });
  }

  render() {
    return (
      <div className='init'>
        <div className='left'>
          <h1>{this.state.currentQuote}</h1>
        </div>
        <div className='right'>
          <form className='initialinput' /*onSubmit={(e) => this.props.getInput(e)}*/>
            <input name='zip' type='number' required /> <button type='submit'><i className='fa fa-search fa-4x'></i></button>
            <p className='ziplabel'>Please enter your zip code to get started.</p>
          </form>
        </div>
        { this.state.authRoute ? <Auth closeModal={this.props.closeModal} stage={this.props.stage} handleLogin={this.props.handleLogin} handleRegister={this.props.handleRegister} /> : '' }
      </div>
    )
  }
}

export default Home;