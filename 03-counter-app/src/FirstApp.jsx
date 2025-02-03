import PropTypes from 'prop-types';

// const new_message = {
//     message: 'Hola Mundo',
//     title: 'Humberto'
// };

// const showMessage = ( a, b ) => a + b;

export const FirstApp = ( { title, subtitle, name } ) => {
  return (
    <>
        <h1 data-testid="test-title">{ title }</h1>
        {/* <h1>{ JSON.stringify ( new_message ) }</h1> */}
        <p>{ subtitle }</p>
        <p>{ name }</p>
    </>
  )
}

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

FirstApp.defaultProps = {
  // title: 'No hay titulo',
  subtitle: 'No hay subtitulo',
  name: 'Humberto'
}
