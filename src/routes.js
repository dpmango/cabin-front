import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

export const routes = [
  {
    forNavBar: true,
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
    path: '/profile',
    name: 'Get Started',
    component: Profile,
    isPrivate: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
];
