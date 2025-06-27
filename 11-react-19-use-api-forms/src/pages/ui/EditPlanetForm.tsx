import { useActionState } from 'react';
import { Planet } from '../../interfaces/planet.interface';
import { createPlanetActionForm } from '../../actions/create-planet.action';
import { SubmitButton } from './SubmitButton';

interface Props {
  onAddPlanet: (planet: Planet) => void;
}

export const EditPlanetForm = ({ onAddPlanet }: Props) => {

  const [ _state, formAction, isPending ] = useActionState ( 
    async ( prev_state: unknown, query_data: FormData ) => {
      const planet = await createPlanetActionForm ( prev_state, query_data );
      onAddPlanet ( planet );
    }, 
    null 
  );

  return (
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>
      <h1>{ isPending ? 'Pending' : 'Not Pending' }</h1>

      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name='name'
        required
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name='type'
        required
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name='distanceFromSun'
        required
      />
      <SubmitButton/>
    </form>
  );
};
