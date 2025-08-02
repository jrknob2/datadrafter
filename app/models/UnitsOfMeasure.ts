export type UnitAbbreviation = 'ft' | 'in' | 'm' | 'cm';

export interface UnitsOfMeasure {
  unit: UnitAbbreviation;
  label: string;
  scale: number;
  precision?: number;
}

export const UNIT_MAP: Record<UnitAbbreviation, string> = {
  ft: 'feet',
  in: 'inches',
  m: 'meters',
  cm: 'centimeters'
};

export function createUnitsOfMeasure(
  unit: UnitAbbreviation,
  scale: number,
  precision?: number
): UnitsOfMeasure {
  return {
    unit,
    label: UNIT_MAP[unit],
    scale,
    precision
  };
}

// Usage:
// function createUnitsOfMeasure(unit: UnitAbbreviation, scale: number, precision?: number): UnitsOfMeasure {
//   return {
//     unit,
//     label: UNIT_MAP[unit],
//     scale,
//     precision
//   };
// }
