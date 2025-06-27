import { useOptimistic, useTransition } from 'react';
import { Planet } from '../../interfaces/planet.interface';
import { updatePlanetAction } from '../../actions/update-planet.action';

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {

  const [ isPending, startTransition ] = useTransition();

  const [ optimisticPlanets, setOptimisticNewPlanets ] = useOptimistic ( planets, 
    ( current: Planet[], new_planet: Planet ) => {
      const updated_planets = current.map ( planet => planet.id === new_planet.id ? new_planet : planet );
      return updated_planets;
    } 
  );

  const handleUpdatePlanet = async ( planet: Planet ) => {
    startTransition ( async () => {
      const data = {
        ...planet,
        name: planet.name.toUpperCase()
      }

      try {
        setOptimisticNewPlanets ( data );
        const updated_planet = await updatePlanetAction ( data );
        setOptimisticNewPlanets ( updated_planet );
      } catch (error) {
        console.error ( error );
        setOptimisticNewPlanets ( planet );
      }
    } );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br />
          <button
            onClick={ () => handleUpdatePlanet ( planet ) }
            disabled={ isPending }
            className='bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full'>
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
