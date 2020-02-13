import LandingPage from './components/LandingPage'
import CaseSetManager from './components/CaseSetManager'
import CaseSet from './components/CaseSet'
import AiImplementationManager from './components/AiImplementationManager'
import BenchmarkRunner from './components/BenchmarkRunner'
import BenchmarkCreator from './components/BenchmarkCreator'

export const paths = {
  home: (): string => '/',
  caseSetManager: (): string => '/cases',
  cases: (caseSetId: string): string => `/cases/${caseSetId}`, // /cases/:caseSetId
  aiImplementationManager: (): string => '/ai-implementations',
  benchmarkRun: (benchmarkId: string): string =>
    `/benchmarks/run/${benchmarkId}`, // /benchmarks/run/:benchmarkId
  benchmarkCreate: (caseSetId?: string): string =>
    `/benchmarks/create${caseSetId ? `?caseSetId=${caseSetId}` : ''}`, // /benchmarks/create?caseSetId={caseSetId}
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
  {
    id: 'benchmark-runner',
    displayName: 'Benchmark runner',
    path: paths.benchmarkRun(':benchmarkId'),
    component: BenchmarkRunner,
    exact: false,
  },
  {
    id: 'benchmark-creator',
    displayName: 'Create benchmark',
    path: paths.benchmarkCreate(),
    component: BenchmarkCreator,
    exact: false,
    visibleInMenu: true,
  },
]
