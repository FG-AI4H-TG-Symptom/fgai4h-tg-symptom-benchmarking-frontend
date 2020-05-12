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

export const paths = {
  home: (): string => '/',
  caseSetManager: (): string => '/cases',
  caseSetViewer: (caseSetId: string): string => `/cases/${caseSetId}`, // /cases/:caseSetId
  caseSetCreator: (): string => '/cases/create',
  aiImplementationManager: (): string => '/ai-implementations',
  benchmarkingSessions: (): string => '/benchmarking-sessions',
  benchmarkCreate: (caseSetId?: string): string =>
    `/benchmarks/create${caseSetId ? `?caseSetId=${caseSetId}` : ''}`, // /benchmarks/create?caseSetId={caseSetId}
  benchmarkRun: (benchmarkId: string): string =>
    `/benchmarks/run/${benchmarkId}`, // /benchmarks/run/:benchmarkId
  benchmarkEvaluate: (benchmarkId: string): string =>
    `/benchmarks/${benchmarkId}/evaluate`, // /benchmarks/:benchmarkId/evaluate
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
    id: 'case-set-manager',
    displayName: 'Case set manager',
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
    id: 'ai-implementation-manager',
    displayName: 'AI implementation manager',
    path: paths.aiImplementationManager(),
    component: AiImplementationManager,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'benchmarking-sessions-manager',
    displayName: 'Benchmarking Sessions',
    path: paths.benchmarkingSessions(),
    component: BenchmarkingSessionManagerContainer,
    exact: true,
    visibleInMenu: true,
  },
  {
    id: 'benchmark-creator',
    displayName: 'Create benchmark',
    path: paths.benchmarkCreate(),
    component: BenchmarkCreator,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'benchmark-runner',
    displayName: 'Benchmark runner',
    path: paths.benchmarkRun(':benchmarkId'),
    component: BenchmarkRunner,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'benchmark-evaluator',
    displayName: 'Benchmark evaluator',
    path: paths.benchmarkEvaluate(':benchmarkId'),
    component: BenchmarkEvaluator,
    exact: true,
    visibleInMenu: false,
  },
]
