import React, {Component} from 'react';

export class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      remainingMinutes: 0,
      remainingSeconds: 0
    };
  }

  render(){
    return (
      <div className='timer'>        
      </div>
    )
  }
}