import React, { Component } from 'react';
import MainRouter from '../routers/Main.router';

import Header from './Header';

class Layout extends Component {
	
	render() {
		
		return(
			<React.Fragment>
				
				<Header/>
				
				<main role="main" className="flex-shrink-0">
					<div className="container">
						<MainRouter />
					</div>
				</main>
				
			</React.Fragment>
        )
	}
}

export default Layout;