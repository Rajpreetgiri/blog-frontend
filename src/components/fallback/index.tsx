import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackSpinner = () => {
  return (
    <Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress color="primary"/>
    </Box>
  )
}

export default FallbackSpinner