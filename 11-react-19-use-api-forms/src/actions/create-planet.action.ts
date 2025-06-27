import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";

export const createPlanetAction = async ( planet: Partial<Planet> ) => {
    try {
        const response = await planetsApi.post<Planet> ( '/', planet );
        return response.data;
    } catch (error) {
        console.error ( error );
        return null;
    }
}

export const createPlanetActionForm = async ( _prev_state: unknown, query_data: FormData ) => {
    const form_data = Object.fromEntries ( query_data.entries() );

    try {
        const response = await planetsApi.post<Planet> ( '/', form_data );
        return response.data;
    } catch (error) {
        console.error ( error );
        throw new Error ( 'No se pudo agregar o crear el planeta' );
    }
}