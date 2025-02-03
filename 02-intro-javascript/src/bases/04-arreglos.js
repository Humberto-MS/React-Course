// Arreglos en JS
// const arreglo = new Array();
const arreglo = [1,2,3,4];
// arreglo.push ( 1 );
// arreglo.push ( 2 );
// arreglo.push ( 3 );
// arreglo.push ( 4 );

let arreglo_2 = [ ...arreglo, 5 ];

const arreglo_3 = arreglo_2.map ( function ( numero ) {
    return numero * 2;
} );

console.log ( arreglo );
console.log ( arreglo_2 );
console.log ( arreglo_3 );