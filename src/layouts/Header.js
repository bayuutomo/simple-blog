import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => (
	<header>
		<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<Link to="/" className="navbar-brand">Simple Blog</Link>
		</nav>
	</header>
);

export default Layout;