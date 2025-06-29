import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { checkingAutentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store"
import { useMemo } from "react"

const form_data = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector ( state => state.auth );
    const { email, password, onInputChange } = useForm ( form_data );
    const isAuthenticating = useMemo ( () => status === 'checking', [status] );

    const onSubmit = ( event ) => {
        event.preventDefault();
        dispatch ( startLoginWithEmailPassword ( { email, password } ) );
    }

    const onGoogleSignIn = () => {
        dispatch ( startGoogleSignIn() );
    }

    return (
        <AuthLayout title="Login">
            <form
                aria-label="submit-form"
                onSubmit={ onSubmit } 
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
                        <TextField 
                            label="Correo" 
                            type="email" 
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder="contraseña"
                            fullWidth
                            name="password"
                            inputProps={{ 'data-testid': 'password' }}
                            value={ password }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }} display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity="error">{ errorMessage }</Alert>
                    </Grid>

                    <Grid 
                        container 
                        spacing={2} 
                        size={{ xs: 12 }} 
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Button 
                                disabled={ isAuthenticating }
                                type="submit"
                                variant="contained"
                                fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Button 
                                aria-label="google-btn"
                                disabled={ isAuthenticating }
                                onClick={ onGoogleSignIn } 
                                variant="contained" 
                                fullWidth
                            >
                                <Google/>
                                
                                <Typography 
                                    sx={{ ml: 1 }}>
                                    Google
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction="row" 
                        justifyContent="end"
                    >
                        <Link 
                            component={ RouterLink } 
                            color="inherit" 
                            to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}