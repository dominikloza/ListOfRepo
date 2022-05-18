import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListOfRepos from './ListOfRepos';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ScrollTopArrow from './ScrollTopArrow';
import Grid from '@mui/material/Grid';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [sortType, setSortType] = React.useState('name');

  const handleChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
        <Grid item xs={4}>
          <Box sx={{
            height: '100%',
            width: '200px',
            bgcolor: '#1976d2'
          }}>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{
            pt: '30px'
          }}>
            {theme.palette.mode === 'dark' ? 'Dark' : 'Light'} Mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
              List of Repos:
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography component="h4" gutterBottom sx={{ mt: 2 }}>
                Sort by :
              </Typography>
              <FormControl sx={{ minWidth: 120, ml: 1 }}>
                <Select
                  value={sortType}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="name">
                    <em>A - Z</em>
                  </MenuItem>
                  <MenuItem value="stars">Stars</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ListOfRepos sortType={sortType} />
            <ScrollTopArrow />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default function ToggleColorMode() {

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



