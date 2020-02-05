import LandingPage from './components/LandingPage'
import CaseSet from './components/CaseSet'

export const paths = {
  home: '/',
  cases: '/cases',
}

export const routes = [
  {
    id: 'home',
    displayName: 'Start',
    path: paths.home,
    component: LandingPage,
    exact: true,
  },
  {
    id: 'cases',
    displayName: 'Cases',
    path: paths.cases,
    component: CaseSet,
    exact: false,
  },
]
