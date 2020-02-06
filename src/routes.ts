import LandingPage from './components/LandingPage'
import CaseSetManager from './components/CaseSetManager'
import CaseSet from './components/CaseSet'
import AiImplementationManager from './components/AiImplementationManager'

export const paths = {
  home: (): string => '/',
  caseSetManager: (): string => '/cases',
  cases: (caseSetId: string): string => `/cases/${caseSetId}`, // /cases/:caseSetId
  aiImplementationManager: (): string => '/ai-implementations',
}

export const routes = [
  {
    id: 'home',
    displayName: 'Start',
    path: paths.home(),
    component: LandingPage,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'caseSetManager',
    displayName: 'Case set manager',
    path: paths.caseSetManager(),
    component: CaseSetManager,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'cases',
    displayName: 'Case set',
    path: paths.cases(':caseSetId'),
    component: CaseSet,
    exact: false,
  },
  {
    id: 'aiImplementationManager',
    displayName: 'AI implementation manager',
    path: paths.aiImplementationManager(),
    component: AiImplementationManager,
    exact: true,
    visibleInMenu: true,
  },
]
