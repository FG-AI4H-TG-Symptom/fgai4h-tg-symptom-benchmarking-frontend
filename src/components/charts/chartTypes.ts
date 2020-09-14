import { BiologicalSex } from '../../data/caseSets/berlinModelTypes';

export type Population = Array<{
  biologicalSex: BiologicalSex;
  age: number;
}>;
