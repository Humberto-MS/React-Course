const personajes = ['Goku', 'Vegeta', 'Trunks'];
const [ , , p3 ] = personajes;
console.log(p3); // Trunks

const retornaArreglo = () => {
    return ['ABC', 123];
};

const [letras, numeros] = retornaArreglo();

// Tarea
// 1. El primer valor del arr se llamará nombre
// 2. Se llamará setNombre

const useState = (valor) => {
    return [valor, () => { console.log('Hola Mundo') }];
};

const [ nombre, setNombre ] = useState ( 'Humberto' );
console.log(nombre);
setNombre(); // Hola Mundo
