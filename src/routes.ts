import React from 'react';
import {
  SvgIconComponent,
  Home as HomeIcon,
  Add as AddIcon,
  Memory as AiImplementationIcon,
  Web as CaseSetIcon,
  Speed as BenchmarkingSessionIcon,
} from '@material-ui/icons';

import AboutPage from './components/staticPages/AboutPage';
import AiImplementationManager from './components/aiImplementations/AiImplementationManager';
import AiImplementationRegistration from './components/aiImplementations/AiImplementationRegistration';
import AiImplementationEditor from './components/aiImplementations/AiImplementationEditor';
import CaseSetManager from './components/caseSets/CaseSetManager';
import CaseSetViewer from './components/caseSets/CaseSetViewer';
import CaseSetGenerator from './components/caseSets/CaseSetGenerator';
import DatasetCreator from './components/caseSets/DatasetCreator';
import BenchmarkRunner from './components/benchmarkingSessions/BenchmarkRunner';
import BenchmarkCreator from './components/benchmarkingSessions/BenchmarkCreator';
import BenchmarkEvaluator from './components/benchmarkingSessions/BenchmarkEvaluator';
import BenchmarkingSessionManager from './components/benchmarkingSessions/BenchmarkingSessionManager';
import SimpleCaseEditor from './components/caseSets/SimpleCaseEditor';

const AI_IMPLEMENTATIONS_PATH = 'ai-implementations';
const CASE_SETS_PATH = 'case-sets';
const BENCHMARKING_SESSIONS_PATH = 'benchmarking-sessions';
const ABOUT_PATH = 'about-page';

export const paths = {
  home: (): string => '/',
  about: (): string => `/${ABOUT_PATH}`,
  aiImplementationManager: (): string => `/${AI_IMPLEMENTATIONS_PATH}`,
  aiImplementationRegistration: (): string => `/${AI_IMPLEMENTATIONS_PATH}/register`,
  aiImplementationEditor: (aiImplementationId: string): string =>
    `/${AI_IMPLEMENTATIONS_PATH}/edit/${aiImplementationId}`,
  caseSetManager: (): string => `/${CASE_SETS_PATH}`,
  caseSetViewer: (caseSetId: string): string => `/${CASE_SETS_PATH}/${caseSetId}`, // /cases/:caseSetId

  simpleCaseEditor: (caseSetId: string, caseId: string): string =>
    `/${CASE_SETS_PATH}/${caseSetId}/simple_edit/${caseId}`, // /cases/:caseSetId/edit/:caseId

  caseSetGenerator: (): string => `/${CASE_SETS_PATH}/generate`,
  datasetCreator: (): string => `/${CASE_SETS_PATH}/create`,
  benchmarkingSessions: (): string => `/${BENCHMARKING_SESSIONS_PATH}`,
  benchmarkCreate: (caseSetId?: string): string =>
    `/${BENCHMARKING_SESSIONS_PATH}/create${caseSetId ? `?caseSetId=${caseSetId}` : ''}`, // /benchmarking-sessions/create?caseSetId={caseSetId}
  benchmarkRun: (benchmarkId: string): string => `/${BENCHMARKING_SESSIONS_PATH}/run/${benchmarkId}`, // /benchmarking-sessions/run/:benchmarkId
  benchmarkEvaluate: (benchmarkId: string): string => `/${BENCHMARKING_SESSIONS_PATH}/${benchmarkId}/evaluate`, // /benchmarking-sessions/:benchmarkId/evaluate
};

interface Route {
  id: string;
  displayName: string;
  path: string;
  component: React.FC;
  visibleInMenu: boolean;
  exact: boolean;
  icon?: SvgIconComponent;
  action?: {
    icon: SvgIconComponent;
    targetPath: string;
  };
}

export const routes: Array<Route> = [
  {
    id: 'home',
    displayName: 'Home',
    path: paths.home(),
    component: AboutPage,
    exact: true,
    visibleInMenu: true,
    icon: HomeIcon,
  },

  {
    id: 'ai-implementations-manager',
    displayName: 'AI implementations manager',
    path: paths.aiImplementationManager(),
    component: AiImplementationManager,
    exact: true,
    visibleInMenu: true,
    icon: AiImplementationIcon,
    action: {
      targetPath: paths.aiImplementationRegistration(),
      icon: AddIcon,
    },
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
    id: 'ai-implementations-edit',
    displayName: 'Edit AI implementation',
    path: paths.aiImplementationEditor(':aiImplementationId'),
    component: AiImplementationEditor,
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
    icon: CaseSetIcon,
    action: {
      targetPath: paths.caseSetGenerator(),
      icon: AddIcon,
    },
  },

  {
    id: 'case-set-generator',
    displayName: 'Generate case set',
    path: paths.caseSetGenerator(),
    component: CaseSetGenerator,
    exact: true,
    visibleInMenu: false,
  },
  {
    id: 'dataset-creator',
    displayName: 'Create dataset',
    path: paths.datasetCreator(),
    component: DatasetCreator,
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
    id: 'simple-case-editor',
    displayName: 'Simple Case editor',
    path: paths.simpleCaseEditor(':caseSetId', ':caseId'),
    component: SimpleCaseEditor,
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
    icon: BenchmarkingSessionIcon,
    action: {
      targetPath: paths.benchmarkCreate(),
      icon: AddIcon,
    },
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
];
