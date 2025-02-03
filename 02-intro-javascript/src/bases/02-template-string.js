const nombre = 'Humberto';
const apellido = 'Medina';

// const nombre_completo = nombre + ' ' + apellido;
const nombre_completo = `${ nombre } ${ apellido }`;

console.log ( nombre_completo );

function getSaludo ( nombre ) {
    return 'Hola ' + nombre;
}

console.log ( `Este es un texto: ${ getSaludo ( nombre ) }` );