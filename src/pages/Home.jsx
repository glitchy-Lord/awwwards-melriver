import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

import Banner from '../components/Banner';
import Cases from '../components/Cases';
import IntroOverlay from '../components/IntroOverlay';

// on load timeline
const tl = gsap.timeline();

const homeAnimation = (completeAnimation) => {
	// duration and delay is halved from the tut
	tl.from('.line span', 0.9, {
		y: 100,
		ease: 'power4.out',
		delay: 0.5,
		skewY: 7,
		stagger: {
			amount: 0.3,
		},
	})
		.to('.overlay-top', 0.8, {
			height: 0,
			ease: 'expo.inOut',
			stagger: 0.4,
		})
		.to('.overlay-bottom', 0.8, {
			width: 0,
			ease: 'expo.inOut',
			delay: -0.4,
			stagger: 0.4,
		})
		.to('.intro-overlay', 0, { css: { display: 'none' } })
		.from('.case-image img', 0.8, {
			scale: 1.4,
			ease: 'expo.inOut',
			delay: -1.5,
			stagger: 0.4,
			onComplete: completeAnimation,
		});
};

const Home = () => {
	const [animationComplete, setAnimationComplete] = useState(false);

	const completeAnimation = () => {
		setAnimationComplete(true);
	};

	useEffect(() => {
		homeAnimation(completeAnimation);
	}, []);

	return (
		<>
			{!animationComplete && <IntroOverlay />}
			<Banner />
			<Cases />
		</>
	);
};

export default Home;
