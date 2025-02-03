import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = ( category ) => {

    const [ images, setImages ] = useState ( [] );
    const [ isLoading, setIsLoading ] = useState ( true );

    const getImages = async () => {
        const new_images = await getGifs ( category );
        setImages ( new_images );
        setIsLoading ( false );
    }

    useEffect ( () => {
        getImages();
    }, [] );

    return {
        images,
        isLoading
    };
}
