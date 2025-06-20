import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container 
            spacing={0} 
            direction="column" 
            sx={{
                minHeight: 'calc(100vh - 110px)', 
                backgroundColor: 'primary.main',
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: 3,
            }}
        >
            <Grid 
                size={{ xs: 12 }} 
                sx={{ 
                    display: 'flex', 
                    alignItems: "center", 
                    justifyContent: "center" 
                }}
            >
                <StarOutline sx={{ fontSize: 100, color: 'white' }}/>
            </Grid>

            <Grid 
                size={{ xs: 12 }}
                sx={{ 
                    display: 'flex', 
                    alignItems: "center", 
                    justifyContent: "center" 
                }}
            >
                <Typography 
                    color="white" 
                    variant="h5">
                    Selecciona o crea una entrada
                </Typography>
            </Grid>
        </Grid>
    )
}