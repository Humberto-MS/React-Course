import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector ( state => state.journal );
    const { body, title, onInputChange, formState, date } = useForm ( note );
    
    const date_string = useMemo ( () => {
        const new_date = new Date ( date );
        return new_date.toUTCString();
    }, [date]);

    const file_input_ref = useRef();

    useEffect ( () => {
        dispatch ( setActiveNote ( formState ) );
    }, [formState])

    useEffect ( () => {
        if ( messageSaved.length > 0 ) {
            Swal.fire ( 'Nota actualizada', messageSaved, 'success' );
        }
    }, [messageSaved]);

    const onSaveNote = () => dispatch ( startSaveNote() );

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;
        dispatch ( startUploadingFiles ( target.files ) );
    }

    const onDelete = () => dispatch ( startDeletingNote() );

    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container 
            direction='row'
            sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
            }}
        >
            <Grid>
                <Typography
                    fontSize={39}
                    fontWeight='light'>
                    { date_string }
                </Typography>
            </Grid>

            <Grid>
                <input 
                    type="file"
                    multiple
                    ref={ file_input_ref }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton 
                    color="primary" 
                    disabled={ isSaving }
                    onClick={ () => file_input_ref.current.click() }>
                    <UploadOutlined/>
                </IconButton>

                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container sx={{ width: '100%' }}>
                <TextField 
                    type="text" 
                    variant="filled" 
                    fullWidth 
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type="text" 
                    variant="filled" 
                    fullWidth 
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container sx={{ justifyContent: 'end' }}>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error">
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls }/>
        </Grid>
    )
}