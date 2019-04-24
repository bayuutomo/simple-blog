/*
	test
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Layout extends Component {
	componentDidMount() {
		document.title = 'Page not found';
	}
	
	render() {
		return(
			<React.Fragment>
				<h1 className="mt-5">Page not found</h1>
				<p className="lead">The page you are trying to access is not available.</p>
				<p><Link to="/">Go back to home page</Link></p>
			</React.Fragment>
        )
	}
}

export default Layout;
