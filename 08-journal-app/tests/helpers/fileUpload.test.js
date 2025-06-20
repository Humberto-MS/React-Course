import { fileUpload } from "../../src/helpers";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config ( {
    cloud_name: 'dbwufzdp6',
    api_key: '712463694295745',
    api_secret: 'pDzipZAP5gF9psEQ3fX1HTqv7WQ',
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