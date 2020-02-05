/* eslint-disable import/prefer-default-export */

export enum PresenceStates {
  PRESENT = 'present',
  ABSENT = 'absent',
}
export type Presence = 'present' | 'absent'
export type BiologicalSex = 'male' | 'female' // limited for the MMVB
export type TriageLevel = 'PC' | 'EC' | 'SC'
export type CaseDataType = {
  caseData: {
    caseId: string
    metaData: {
      // eslint-disable-next-line camelcase
      case_creator: string
      description: string
      // eslint-disable-next-line camelcase
      spreadsheet_case_id: string
    }
    otherFeatures: Array<{
      id: string
      name: string
      state: Presence
    }>
    presentingComplaints: Array<{
      id: string
      name: string
      state: Presence
    }>
    profileInformation: {
      age: number
      biologicalSex: BiologicalSex
    }
  }
  valuesToPredict: {
    condition: {
      id: string
      name: string
    }
    expectedTriageLevel: TriageLevel
  }
}
