import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router';
import SnippetFolderRoundedIcon from '@mui/icons-material/SnippetFolderRounded';

export function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
          <SnippetFolderRoundedIcon/>
          <Typography variant="h6" component="h1" sx={{marginX: 2}}>Ori..n Test App</Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/product-categories">
            Categories
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
