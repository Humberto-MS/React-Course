const { Router } = require ( 'express' );
const { check } = require ( 'express-validator' );
const { validarCampos, validarJWT } = require ( '../middlewares' );
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use ( validarJWT );
router.get ( '/', getEventos );

router.post ( '/', [
    check ( 'title', 'El título es obligatorio' ).not().isEmpty(),
    check ( 'start', 'Fecha de inicio es obligatoria' ).custom ( isDate ),
    check ( 'end', 'Fecha de fin es obligatoria' ).custom ( isDate ),
    validarCampos
], crearEvento );

router.put ( '/:id', actualizarEvento );
router.delete ( '/:id', eliminarEvento );

module.exports = router;