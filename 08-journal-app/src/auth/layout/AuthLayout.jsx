import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid 
            container 
            spacing={0} 
            direction="column" 
            alignItems="center" 
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid
                className="box-shadow"
                size={{ xs: 3, sm: 4, md: 5 }}
                sx={{ 
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2, 
                    width: { sm: 450, xs: 350 }, 
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ mb: 2 }}>
                    {title}
                </Typography>

                {children}
            </Grid>
        </Grid>
    )
}