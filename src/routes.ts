import React from 'react'

import LandingPage from './components/staticPages/LandingPage'
import AiImplementationManager from './components/aiImplementations/AiImplementationManager'
import AiImplementationRegistration from './components/aiImplementations/AiImplementationRegistration'
import CaseSetManager from './components/caseSets/CaseSetManager'
import CaseSetViewer from './components/caseSets/CaseSetViewer'
import CaseSetCreator from './components/caseSets/CaseSetCreator'
import BenchmarkRunner from './components/benchmarkingSessions/BenchmarkRunner'
import BenchmarkCreator from './components/benchmarkingSessions/BenchmarkCreator'
import BenchmarkEvaluator from './components/benchmarkingSessions/BenchmarkEvaluator'
import BenchmarkingSessionManager from './components/benchmarkingSessions/BenchmarkingSessionManager'
import CaseSetCaseEditor from './components/caseSets/CaseSetCaseEditor'

const AI_IMPLEMENTATIONS_PATH = 'ai-implementations'
const CASE_SETS_PATH = 'case-sets'
const BENCHMARKING_SESSIONS_PATH = 'benchmarking-sessions'

export const paths = {
  home: (): string => '/',
  aiImplementationManager: (): string => `/${AI_IMPLEMENTATIONS_PATH}`,
  aiImplementationRegistration: (): string =>
    `/${AI_IMPLEMENTATIONS_PATH}/register`,
  caseSetManager: (): string => `/${CASE_SETS_PATH}`,
  caseSetViewer: (caseSetId: string): string =>
    `/${CASE_SETS_PATH}/${caseSetId}`, // /cases/:caseSetId
  caseSetCaseEditor: (caseSetId: string, caseId: string): string =>
    `/${CASE_SETS_PATH}/${caseSetId}/edit/${caseId}`, // /cases/:caseSetId/edit/:caseId
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
    displayName: 'Start',
    path: paths.home(),
    component: LandingPage,
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
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'case-set-case-editor',
    displayName: 'Case editor',
    path: paths.caseSetCaseEditor(':caseSetId', ':caseId'),
    component: CaseSetCaseEditor,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'benchmarking-sessions-manager',
    displayName: 'Benchmarking sessions manager',
    path: paths.benchmarkingSessions(),
    component: BenchmarkingSessionManager,
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
