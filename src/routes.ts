import React from 'react'

import DashboardPage from './components/staticPages/DashboardPage'
import AboutPage from './components/staticPages/AboutPage'
import AiImplementationManager from './components/aiImplementations/AiImplementationManager'
import AiImplementationRegistration from './components/aiImplementations/AiImplementationRegistration'
import CaseSetManager from './components/caseSets/CaseSetManager'
import CaseSetViewer from './components/caseSets/CaseSetViewer'
import CaseSetCreator from './components/caseSets/CaseSetCreator'
import BenchmarkRunner from './components/benchmarkingSessions/BenchmarkRunner'
import BenchmarkCreator from './components/benchmarkingSessions/BenchmarkCreator'
import BenchmarkEvaluator from './components/benchmarkingSessions/BenchmarkEvaluator'
import BenchmarkingSessionManagerContainer from './components/benchmarkingSessions/BenchmarkingSessionManager'

const AI_IMPLEMENTATIONS_PATH = 'ai-implementations'
const CASE_SETS_PATH = 'case-sets'
const BENCHMARKING_SESSIONS_PATH = 'benchmarking-sessions'
const ABOUT_PATH = 'about-page'

export const paths = {
  home: (): string => '/',
  about: (): string => `/${ABOUT_PATH}`,
  aiImplementationManager: (): string => `/${AI_IMPLEMENTATIONS_PATH}`,
  aiImplementationRegistration: (): string =>
    `/${AI_IMPLEMENTATIONS_PATH}/register`,
  caseSetManager: (): string => `/${CASE_SETS_PATH}`,
  caseSetViewer: (caseSetId: string): string =>
    `/${CASE_SETS_PATH}/${caseSetId}`, // /cases/:caseSetId
  caseSetCreator: (): string => `/${CASE_SETS_PATH}/create`,
  benchmarkingSessions: (): string => `/${BENCHMARKING_SESSIONS_PATH}`,
  benchmarkCreate: (caseSetId?: string): string =>
    `/${BENCHMARKING_SESSIONS_PATH}/create${
      caseSetId ? `?caseSetId=${caseSetId}` : ''
    }`, // /benchmarking-sessions/create?caseSetId={caseSetId}
  benchmarkRun: (benchmarkId: string): string =>
    `/${BENCHMARKING_SESSIONS_PATH}/run/${benchmarkId}`, // /benchmarking-sessions/run/:benchmarkId
  benchmarkEvaluate: (benchmarkId: string): string =>
    `/${BENCHMARKING_SESSIONS_PATH}/${benchmarkId}/evaluate`, // /benchmarking-sessions/:benchmarkId/evaluate
}

interface Route {
  id: string
  displayName: string
  path: string
  component: React.FC<{}>
  visibleInMenu: boolean
  exact: boolean
}

export const routes: Array<Route> = [
  {
    id: 'home',
    displayName: 'Dashboard',
    path: paths.home(),
    component: DashboardPage,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'about',
    displayName: 'About',
    path: paths.about(),
    component: AboutPage,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'ai-implementations-manager',
    displayName: 'AI implementations manager',
    path: paths.aiImplementationManager(),
    component: AiImplementationManager,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'ai-implementations-register',
    displayName: 'Register AI implementation',
    path: paths.aiImplementationRegistration(),
    component: AiImplementationRegistration,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'case-sets-manager',
    displayName: 'Case sets manager',
    path: paths.caseSetManager(),
    component: CaseSetManager,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'case-set-creator',
    displayName: 'Create case set',
    path: paths.caseSetCreator(),
    component: CaseSetCreator,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'case-set-viewer',
    displayName: 'Case set',
    path: paths.caseSetViewer(':caseSetId'),
    component: CaseSetViewer,
    exact: false,
    visibleInMenu: false,
  },
  {
    id: 'benchmarking-sessions-manager',
    displayName: 'Benchmarking sessions manager',
    path: paths.benchmarkingSessions(),
    component: BenchmarkingSessionManagerContainer,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'benchmarking-session-creator',
    displayName: 'Create benchmarking session',
    path: paths.benchmarkCreate(),
    component: BenchmarkCreator,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'benchmarking-session-runner',
    displayName: 'Benchmarking session runner',
    path: paths.benchmarkRun(':benchmarkId'),
    component: BenchmarkRunner,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'benchmark-evaluator',
    displayName: 'Benchmarking session evaluator',
    path: paths.benchmarkEvaluate(':benchmarkId'),
    component: BenchmarkEvaluator,
    exact: true,
    visibleInMenu: false,
  },
]
