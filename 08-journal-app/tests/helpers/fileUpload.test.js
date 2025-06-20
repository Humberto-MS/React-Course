import { fileUpload, getEnvironments } from "../../src/helpers";
import { v2 as cloudinary } from 'cloudinary';

const {
    VITE_CLOUD_NAME,
    VITE_API_KEY,
    VITE_API_SECRET
} = getEnvironments();

cloudinary.config ( {
    cloud_name: VITE_CLOUD_NAME,
    api_key: VITE_API_KEY,
    api_secret: VITE_API_SECRET,
    secure: true
} );

describe ( 'Pruebas en la función fileUpload', () => {
    test ( 'debe de subir el archivo correctamente a cloudinary', async () => {
        const image_url = 'https://www.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-600nw-407021107.jpg';
        const resp = await fetch ( image_url );
        const blob = await resp.blob()
        const file = new File ( [ blob ], 'foto.jpg' );
        const url = await fileUpload ( file );
        expect ( typeof url ).toBe ( 'string' );

        const segments = url.split ( '/' );
        const image_id = segments[ segments.length - 1 ].replace ( '.jpg', '' );
        await cloudinary.api.delete_resources ( image_id );
    } );

    test ( 'debe de retornar null si no hay archivo', async () => {
        const file = new File ( [], 'foto.jpg' );
        const url = await fileUpload ( file );
        expect ( url ).toBe ( null );
    } );
} );