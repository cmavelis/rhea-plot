import React, { Component } from 'react';
import BarChart from './BarChart'
import './App.css';

class App extends Component {
   render() {
   return (
      <div className='App'>
        <div className='App-header'>
          <h2>D3 in React</h2>
        </div>
        <div>
          <BarChart data={
              [5,10,1,3,10,1,3,5]
          } size={[500,500]} />
        </div>
      </div>
   )
   }
}

export default App;
