// import { heroes } from './data/heroes';
// import { heroes } from './data/heroes';
import heroes, { owners } from '../data/heroes';

// console.log ( owners );

export const getHeroeById = ( id ) => heroes.find ( x => x.id === id );

// console.log ( getHeroeById(2) ); 
// Debe de regresar { id: 2, name: 'Spiderman', owner: 'Marvel' }

export const getHeroesByOwner = ( owner ) => heroes.filter ( x => x.owner === owner );

// console.log ( getHeroesByOwner('DC') ); 
// Debe de regresar [{ id: 1, name: 'Batman', owner: 'DC' }, { id: 3, name: 'Superman', owner: 'DC' }]