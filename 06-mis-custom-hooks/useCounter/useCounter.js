import { useState } from "react";

export const useCounter = ( initial_value = 10 ) => {
    const [ counter, setCounter ] = useState ( initial_value );
    
    const increment = () => setCounter ( counter + 1 );
    const reset = () => setCounter ( initial_value );
    const decrement = () => setCounter ( counter - 1 );
    
    return { counter, increment, reset, decrement };
}