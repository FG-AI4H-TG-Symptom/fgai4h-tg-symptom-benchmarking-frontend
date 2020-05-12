import React from 'react'

import LandingPage from './components/LandingPage'
import CaseSetManager from './components/CaseSetManager'
import CaseSetViewer from './components/CaseSetViewer'
import CaseSetCreator from './components/CaseSetCreator'
import AiImplementationManager from './components/AiImplementationManager'
import BenchmarkRunner from './components/BenchmarkRunner'
import BenchmarkCreator from './components/BenchmarkCreator'
import BenchmarkEvaluator from './components/BenchmarkEvaluator'
import BenchmarkingSessionManagerContainer from './components/BenchmarkingSessionManager'

const CASE_SETS_PATH = 'case-sets'
const BENCHMARKING_SESSIONS_PATH = 'benchmarking-sessions'

export const paths = {
  home: (): string => '/',
  caseSetManager: (): string => `/${CASE_SETS_PATH}`,
  caseSetViewer: (caseSetId: string): string =>
    `/${CASE_SETS_PATH}/${caseSetId}`, // /cases/:caseSetId
  caseSetCreator: (): string => `/${CASE_SETS_PATH}/create`,
  aiImplementationManager: (): string => '/ai-implementations',
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
    displayName: 'Start',
    path: paths.home(),
    component: LandingPage,
    exact: true,
    visibleInMenu: true,
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
    id: 'ai-implementations-manager',
    displayName: 'AI implementations manager',
    path: paths.aiImplementationManager(),
    component: AiImplementationManager,
    exact: true,
    visibleInMenu: true,
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
