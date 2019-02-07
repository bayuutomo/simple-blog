import React, {Component} from 'react';
import Error404 from '../pages/error/Error404';

class Routers extends Component {
	render() {
		let pathname = this.props.location.pathname;
		pathname = (pathname.charAt(pathname.length - 1) !== '/') ? pathname+'/' : pathname;
		let location = pathname.split('/');
		let param = {};
		if(location.length > 4) {
			for(var i = 3; i <= location.length; i++) {
				if(location[i]) {
					param[location[i]] = location[i+1] ? location[i+1] : '';
					i++;
				}
			}
			location = [location[0],location[1],location[2],''];
		}
		location[location.length - 2 ] = this.camelize(location[location.length - 2 ]);
		var locationStr = location.join('/');
		try {
			const Layout = require('./../pages' + locationStr.replace(/./g, (c, i) => i === locationStr.length - 1 ? '.js' : c)).default;
			return (<Layout param={param} onBreadcrumbChange={this.props.onBreadcrumbChange}/>);
		} catch (e) {
			try {
				const Layout = require('./../pages' + pathname + 'Index.js').default;
				return (<Layout onBreadcrumbChange={this.props.onBreadcrumbChange}/>);
			} catch (e) {
				return (<Error404/>);
			}
		}
	}
	
	camelize(text, separator) {
		
        // Assume separator is _ if no one has been provided.
		if(typeof(separator) === 'undefined') {
			separator = '-';
		}
		
		// Cut the string into words
		let words = text.split(separator);
		
		// Concatenate all capitalized words to get camelized string
		let result = '';
		for (let i = 0 ; i < words.length ; i++) {
			let word = words[i];
			let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
			result += capitalizedWord;
		}
		return result;
	}
}

export default Routers;