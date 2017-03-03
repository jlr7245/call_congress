// this component is fine

import React from 'react';
import InListBill from './InListBill';

class BillList extends React.Component {
  constructor(props) {
    super(props);
    this.renderBills = this.renderBills.bind(this);
  }

  renderBills(laws) {
    return laws.map((law) => {
      return (
        <InListBill law={law} learnLaw={this.props.learnLaw} watchLaw={this.props.watchLaw} key={law.lookup_cc} />
      );
    });
  }

  render() {
    return (
      <ul>
        {this.renderBills(this.props.laws)}
      </ul>
    )
  }
}


export default BillList;