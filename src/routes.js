// import Home from './pages/Home';
// import Pricing from './pages/Pricing';
// import About from './pages/About';
// import GetStarted from './pages/GetStarted';

// import AsyncComponent from './hoc/AsyncComponent';
// const Home = AsyncComponent(() => import("./pages/Home"));
// const Pricing = AsyncComponent(() => import("./pages/Pricing"));
// const About = AsyncComponent(() => import("./pages/About"));
// const GetStarted = AsyncComponent(() => import("./pages/GetStarted"));

import Loadable from 'react-loadable';
import Loader from './components/Loader';

function MyLoadable(opts) {
  return Loadable(Object.assign({
    loading: Loader,
    delay: 300,
    timeout: 10000,
  }, opts));
};

export const Home = MyLoadable({
  loader: () => import("./pages/Home"),
  modules: ['./pages/Home'],
  webpack: () => [require.resolveWeak('./pages/Home')]
});
export const Pricing = MyLoadable({
  loader: () => import("./pages/Pricing"),
  modules: ['./pages/Pricing'],
  webpack: () => [require.resolveWeak('./pages/Pricing')]
});
export const About = MyLoadable({
  loader: () => import("./pages/About"),
  modules: ['./pages/About'],
  webpack: () => [require.resolveWeak('./pages/About')]
});
export const GetStarted = MyLoadable({
  loader: () => import("./pages/GetStarted"),
  modules: ['./pages/GetStarted'],
  webpack: () => [require.resolveWeak('./pages/GetStarted')]
});
export const GetStartedCompleted = MyLoadable({
  loader: () => import("./pages/GetStartedCompleted"),
  modules: ['./pages/GetStartedCompleted'],
  webpack: () => [require.resolveWeak('./pages/GetStartedCompleted')]
});
export const NotFound = MyLoadable({
  loader: () => import("./pages/NotFound"),
  modules: ['./pages/NotFound'],
  webpack: () => [require.resolveWeak('./pages/NotFound')]
});

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
    isExact: true,
    navBarClass: 'btn btn--small',
    path: '/get-started',
    name: 'Get Started',
    component: GetStarted,
    isPrivate: false
  },
  {
    path: '/get-started/thank-you',
    component: GetStartedCompleted,
  },
  {
    forNavBar: false,
    path: '',
    component: NotFound
  },
];
