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

// import PricingAccounting from './containers/PricingAccounting';
// import PricingSecretary from './containers/PricingSecretary';
// import PricingIncorp from './containers/PricingIncorp';
// import PricingDormant from './containers/PricingDormant';

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
export const OnBoarding = MyLoadable({
  loader: () => import("./pages/OnBoarding"),
  modules: ['./pages/OnBoarding'],
  webpack: () => [require.resolveWeak('./pages/OnBoarding')]
});
export const OnBoardingIndividual = MyLoadable({
  loader: () => import("./pages/OnBoardingIndividual"),
  modules: ['./pages/OnBoardingIndividual'],
  webpack: () => [require.resolveWeak('./pages/OnBoardingIndividual')]
});
export const OnBoardingCorporate = MyLoadable({
  loader: () => import("./pages/OnBoardingCorporate"),
  modules: ['./pages/OnBoardingCorporate'],
  webpack: () => [require.resolveWeak('./pages/OnBoardingCorporate')]
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
    secondLevel: [
      {
        path: '/pricing/accounting',
        name: 'Accounting and tax',
        // component: PricingAccounting
      },
      {
        path: '/pricing/secretary',
        name: 'Corporate secretary',
        // component: PricingSecretary
      },
      {
        path: '/pricing/incorporation',
        name: 'Incorporation',
        // component: PricingIncorp
      },
      {
        path: '/pricing/dormant',
        name: 'Dormant company',
        // component: PricingDormant
      }
    ],
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
    // isExact: true,
    navBarClass: 'btn btn--small',
    path: '/get-started',
    name: 'Get Started',
    component: GetStarted,
    isPrivate: false
  },
  {
    forNavBar: false,
    path: '/onboarding',
    name: 'Onboarding tool',
    component: OnBoarding,
  },
  {
    forNavBar: false,
    path: '/onboarding-individual',
    name: 'Onboarding stakeholder individual tool',
    component: OnBoardingIndividual,
  },
  {
    forNavBar: false,
    path: '/onboarding-corporate',
    name: 'Onboarding stakeholder corporate tool',
    component:   OnBoardingCorporate,
  },
  {
    forNavBar: false,
    path: '',
    component: NotFound
  },
];
