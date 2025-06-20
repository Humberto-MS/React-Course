export const fileUpload = async ( file ) => {
    //if ( !file ) throw new Error ( 'No tenemos ningún archivo a subir' );
    if ( !file ) return null;
    
    const cloud_url = 'https://api.cloudinary.com/v1_1/dbwufzdp6/upload';
    const form_data = new FormData();
    form_data.append('upload_preset', 'react-journal');
    form_data.append('file', file);

    try {
        const resp = await fetch ( cloud_url, {
            method: 'POST',
            body: form_data
        } );
        
        if ( !resp.ok ) throw new Error ( 'No se pudo subir la imagen' );
        const cloud_resp = await resp.json();
        return cloud_resp.secure_url;
    } catch (error) {
        // console.log ( 'Error al subir el archivo: ', error );
        // throw new Error ( error.message );
        return null;
    }
}