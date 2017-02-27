import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.inspirationalQuotes=[
    'Decisions are made by those who show up.',
    'The voice of the people cannot be silenced.',
    'We must do better and we will do better.',
    'There is work to be done.',
    'Thoughtful & committed citizens can change the world.'
    ]
    this.state = {
      currentQuote: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
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
      </div>
    )
  }
}

export default Home;