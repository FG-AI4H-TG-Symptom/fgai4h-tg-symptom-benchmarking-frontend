import { useMemo } from "react";

import { DataState, Loadable } from "../../data/util/dataState/dataStateTypes";
import { BaseConcept } from "../../data/util/baseConceptTypes";

export type ConceptIdMap<DataType extends BaseConcept> = {
  [id: string]: DataType;
};

const useConceptIdMap = <DataType extends BaseConcept>(
  conceptList: Loadable<DataType[]>
): Loadable<ConceptIdMap<DataType>> => {
  return useMemo<Loadable<{ [id: string]: DataType }>>(() => {
    if (conceptList.state !== DataState.READY) {
      return conceptList;
    }

    const map = {};
    conceptList.data.forEach(concept => {
      map[concept.id] = concept;
    });
    return { state: DataState.READY, data: map };
  }, [conceptList]);
};

export default useConceptIdMap;
