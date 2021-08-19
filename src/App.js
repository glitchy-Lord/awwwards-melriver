import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import './styles/App.scss';

// pages
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import Approach from './pages/Approach';
import Services from './pages/Services';
import About from './pages/About';

// routes
const routes = [
	{ path: '/', name: 'Home', Component: Home },
	{ path: '/case-studies', name: 'Case Studies', Component: CaseStudies },
	{ path: '/approach', name: 'Approach', Component: Approach },
	{ path: '/services', name: 'Services', Component: Services },
	{ path: '/about-us', name: 'About Us', Component: About },
];

function App() {
	useEffect(() => {
		// Grab inner height of window for mobile reasons when dealing with vh
		let vh = window.innerHeight * 0.01;
		// Set css variable vh
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// prevents flashing
		gsap.to('body', 0, { css: { visibility: 'visible' } });
	}, []);

	return (
		<>
			<Header />
			<div className='App'>
				{routes.map(({ path, Component }) => (
					<Route key={path} path={path} exact>
						<Component />
					</Route>
				))}
			</div>
		</>
	);
}

export default App;
