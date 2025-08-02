import { Drawing } from '../../../app/models/Drawing';
import { createUnitsOfMeasure } from '../../../app/models/UnitsOfMeasure';
//import { v4 as uuidv4 } from 'uuid'; // or just use 1 for now
// TODO: implement uuid4 below
export function createDefaultDrawing(): Drawing {
  return {
    id: 1,
    name: 'Untitled',
    height: 1000,
    width: 1000,
    background: '#ffffff',
    shapes: [],
    transform: { 
        rotation: 0, 
        scale: 1 },
    style: { 
        fillColor: 'transparent',
        strokeColor: 'black',
        lineWidth: 1,
        lineStyle: 'solid'
    },
    uom: createUnitsOfMeasure('ft', 10, 1)
  };
}
