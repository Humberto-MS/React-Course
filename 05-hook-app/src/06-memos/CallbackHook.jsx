import { useCallback, useEffect } from "react";
import { ShowIncrement } from "./ShowIncrement";

export const CallbackHook = () => {

    const [counter, setCounter] = useState(10);

    const increment = useCallback ( 
        (value) => setCounter ( (c) => c + value ), 
        [], 
    );

    useEffect ( () => {
        //increment();
    }, [increment] )
    

    return (
        <>
            <h1>useCallback Hook: { counter }</h1>
            <hr/>

            <ShowIncrement increment={ increment } />
        </>
    )
}
