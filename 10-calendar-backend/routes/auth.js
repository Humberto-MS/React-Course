const { Router } = require ( 'express' );
const { check } = require ( 'express-validator' );
const { crearUsuario, loginUsuario, revalidarToken } = require ( '../controllers/auth' );
const { validarCampos, validarJWT } = require ( '../middlewares' );
const router = Router();

router.post ( '/new', [ 
    check ( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check ( 'email', 'El email es obligatorio' ).isEmail(),
    check ( 'password', 'La contraseña debe ser de al menos 6 caracteres' ).isLength( { min: 6 } ),
    validarCampos
], crearUsuario );

router.post ( '/', [
    check ( 'email', 'El email es obligatorio' ).isEmail(),
    check ( 'password', 'La contraseña debe ser de al menos 6 caracteres' ).isLength( { min: 6 } ),
    validarCampos
], loginUsuario );

router.get ( '/renew', validarJWT, revalidarToken );

module.exports = router;