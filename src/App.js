import React, { Component } from 'react';
import MainLayout from './layouts/MainLayout';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/layout.css";

class App extends Component {
  render() {
    return (
		<React.Fragment>
			{
	            <MainLayout/>
	        }
		</React.Fragment>
    );
  }
}

export default App;
