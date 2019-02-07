import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/Index';
import Routers from "./Routers";

class Router extends Component {
	render() {
		return (
			<Switch>
				{/*<Route exact path='/' component={Home}/>*/}
				<Route
				  exact path='/'
				  render={(props) => <Home {...props} />}
				/>
				
				{/*Excluded routes*/}

		        {/*Default route when not defined here*/}
				{/*<Route component={Routers}/>*/}
				<Route
				  render={(props) => <Routers {...props} />}
				/>
			</Switch>
		)
	}
}
	
export default Router;