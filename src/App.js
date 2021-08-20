import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Route, Switch } from 'react-router-dom';

import './styles/App.scss';

// components
import Header from './components/Header';
import Navigation from './components/Navigation';

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

function debounce(fn, ms) {
	let timer;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}

function App() {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		// Grab inner height of window for mobile reasons when dealing with vh
		let vh = dimensions.height * 0.01;
		// Set css variable vh
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		const HandleResize = () => {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};

		const debouncedHandleResize = debounce(HandleResize, 1000);

		window.addEventListener('resize', debouncedHandleResize);

		// prevents flashing
		gsap.to('body', 0, { css: { visibility: 'visible' } });

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
		};
	}, [dimensions]);

	return (
		<>
			<Header dimensions={dimensions} />
			<Switch>
				<div className='App'>
					{routes.map(({ path, Component }) => (
						<Route key={path} path={path} exact>
							<Component />
						</Route>
					))}
				</div>
			</Switch>
			<Navigation />
		</>
	);
}

export default App;
