const { response } = require ( 'express' );
const Evento = require ( '../models/Evento' );

const getEventos = async ( req, res = response ) => {
    const eventos = await Evento.find().populate ( 'user', 'name' );

    res.status ( 200 ).json ({
        ok: true,
        eventos
    });
}

const crearEvento = async ( req, res = response ) => {
    const evento = new Evento ( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status ( 201 ).json ({
            ok: true,
            evento: eventoGuardado
        });
    } catch ( error ) {
        console.error ( error );
        res.status ( 500 ).json ({
            ok: false,
            msg: 'Error al crear el evento'
        });
    }
}

const actualizarEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById ( eventoId );

        if ( !evento ) {
            return res.status ( 404 ).json ({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status ( 401 ).json ({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate ( eventoId, nuevoEvento, { new: true } );
        
        res.status ( 200 ).json ({
            ok: true,
            evento: eventoActualizado
        });
    } catch ( error ) {
        console.error ( error );
        
        res.status ( 500 ).json ({
            ok: false,
            msg: 'Error al actualizar el evento'
        });
    }
}

const eliminarEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById ( eventoId );
        
        if ( !evento ) {
            return res.status ( 404 ).json ({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status ( 401 ).json ({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete ( eventoId );
        
        res.status ( 200 ).json ({
            ok: true,
            msg: 'Evento eliminado'
        });
    } catch ( error ) {
        console.error ( error );
        
        res.status ( 500 ).json ({
            ok: false,
            msg: 'Error al eliminar el evento'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}