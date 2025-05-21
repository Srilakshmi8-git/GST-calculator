import React from 'react';
import TextField from '@mui/material/TextField';
import './App.css';
import { Autocomplete, Box, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [PrincipalAmount, setPrincipalAmount] = React.useState('');
  const [selectedGSTPercentage, setSelectedGSTPercentage] = React.useState('');
  const [GSTCategory, setGSTCategory] = React.useState(0);
  const [calculatedGST, setcalculatedGST] = React.useState('');
  const [totalAmount, settotalAmount] = React.useState('');
  const [isGSTEnabled, setIsGSTEnabled] = React.useState(false);
  const [isResultEnabled, setIsResultEnabled] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handlePrincipalAmountChange = (event) => {
    const value = event.target.value;
    setPrincipalAmount(value);
    setIsGSTEnabled(value !== '');
    setIsResultEnabled(false);
    setcalculatedGST('');
    settotalAmount('');
    setSelectedGSTPercentage('');
    setGSTCategory(0);
  };

  const handleGSTPercentageChange = (event, newValue) => {
    setSelectedGSTPercentage(newValue);
    if (newValue) {
      const numericValue = parseFloat(newValue.replace('%', ''));
      setGSTCategory(numericValue);
    } else {
      setGSTCategory(0);
    }
  };

  const handlecalculateGST = () => {
    const principal = parseFloat(PrincipalAmount);
    const gstRate = parseFloat(GSTCategory);

    if (!isNaN(principal) && !isNaN(gstRate)) {
      const gst = (principal * gstRate) / 100;
      const total = principal + gst;
      setcalculatedGST(gst.toFixed(2));
      settotalAmount(total.toFixed(2));
      setIsResultEnabled(true);
      setSnackbarMessage('GST Calculated Successfully');
      setOpenSnackbar(true);
    } else {
      console.error('Principal Amount or GST Category is not a valid number');
      setcalculatedGST('Invalid Input');
      settotalAmount('Invalid Input');
      setIsResultEnabled(true);
      setSnackbarMessage('Invalid input. Please enter valid numbers.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <header className="App-header">Processing Amount based on different GST Categories</header>
      <div className="App-body">
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          spacing="3"
        >
          <TextField
            required
            sx={{ width: 300, padding: 1 }}
            id="filled-required"
            label="PrincipalAmount"
            value={PrincipalAmount}
            onChange={handlePrincipalAmountChange}
            variant="filled"
          />

          <Autocomplete
            disablePortal
            id="filled-demo"
            options={['5%', '12%', '18%', '28%']}
            sx={{ width: 300, padding: 1 }}
            value={selectedGSTPercentage}
            onChange={handleGSTPercentageChange}
            renderInput={(params) => (
              <TextField {...params} id="filled-required" label="GST" variant="filled" required />
            )}
            disabled={!isGSTEnabled}
          />
        </Box>
        <div>
          <Button
            variant="contained"
            onClick={handlecalculateGST}
            sx={{ margin: 2, color: 'black', fontWeight: 'bold', backgroundColor: '#009688' }}
            disabled={!isGSTEnabled || selectedGSTPercentage === ''}
          >
            Calculate
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={action}
          />
        </div>
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          spacing="3"
        >
          <TextField
            sx={{ width: 300, padding: 1 }}
            id="filled"
            label="Calculated GST"
            value={calculatedGST}
            InputProps={{ readOnly: true }}
            variant="filled"
            disabled={!isResultEnabled}
          />

          <TextField
            sx={{ width: 300, padding: 1 }}
            id="filled"
            label="Calculated Amount"
            value={totalAmount}
            InputProps={{ readOnly: true }}
            variant="filled"
            disabled={!isResultEnabled}
          />
        </Box>
      </div>
    </div>
  );
}

export default App;
