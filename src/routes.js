import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import GetStarted from './pages/GetStarted';

export const routes = [
  {
    forNavBar: false,
    isExact: true,
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    forNavBar: true,
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    forNavBar: true,
    path: '/about',
    name: 'About',
    component: About
  },
  {
    forNavBar: true,
    navBarClass: 'btn btn--small',
    path: '/get-started',
    name: 'Get Started',
    component: GetStarted,
    isPrivate: false
  },
];
