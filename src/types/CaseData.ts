export type Presence = "present" | "absent"
export type BiologicalSex = "male" | "female" // limited for the MMVB
export type TriageLevel = "PC" | "EC" | "SC"
export type CaseData = {
  caseData: {
    caseId: string,
    metaData: {
      case_creator: string,
      description: string,
      spreadsheet_case_id: string,
    },
    otherFeatures: Array<{
      id: string,
      name: string,
      state: Presence,
    }>,
    presentingComplaints: Array<{
      id: string,
      name: string,
      state: Presence,
    }>,
    profileInformation: {
      age: number,
      biologicalSex: BiologicalSex,
    }
  },
  valuesToPredict: {
    condition: {
      id: string,
      name: string,
    },
    expectedTriageLevel: TriageLevel
  }
}
