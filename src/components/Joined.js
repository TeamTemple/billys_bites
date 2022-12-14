import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { BroncoButton } from './styles';
import { modalStyle } from './styles';
import Axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import jwt from 'jwt-decode';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';


const mdTheme = createTheme();

function preventDefault(event) {
  event.preventDefault();
}

export default function Joined() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCounter(1);
    setOpen(false);
  };
  const [counter, setCounter] = useState(1);

  const handleAddTextField = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const [orders, setOrderData] = useState(null)

  // Get loggin info
  var profile = localStorage.getItem('token');
  var decode = jwt(profile);
  console.log(decode);
  var fullPhone = decode.phone_number
  var phone = fullPhone.slice(1, fullPhone.length)
  console.log(phone)

  useEffect(() => {
    let isRendered = false;

    // CHANGE LINK
    // DEPLOYMENT: billysbitescpp.com:8080/api/order1
    // DEVELOPMENT: http://ec2-54-202-111-166.us-west-2.compute.amazonaws.com:8080/api/order1
    Axios.get('https://billysbitescpp.com/api/api/getJoined?phone=' + phone, { crossDomain: true }).then((res) => {
      if (!isRendered) {
        setOrderData(res.data);
        console.log(res.data);
      }
    })
    return () => { isRendered = true };
  }, [phone])

  if (!orders) {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Grid container justifyContent="center">
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <React.Fragment>
                    <Title>You have no joined orders</Title>
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
            }}
          >
            <React.Fragment>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                #{order.orderNumber}
              </Typography>
              <Title>{order.name}</Title>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                <LocalPhoneIcon />
                {order.phoneNumber}
              </Typography>
              <Typography component="p" variant="h4">
                {order.restaurant}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Expected Pickup: {order.pickup}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Expected Arrival: {order.arrival}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 2 }}>
                Meeting Location: {order.location}
              </Typography>
              {/* <div>
                <BroncoButton onClick={handleOpen} variant='contained'>Your Items</BroncoButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle} component='form'>
                    <List dense={true}>
                    {Object.values(order.customer.).slice(1).map((c, index) => (
                      <ListItem>
                      <ListItemText
                        primary = {c}
                      />
                    </ListItem>
                    ))}
                    </List>
                  </Box>
                </Modal>
              </div> */}
            </React.Fragment>
          </Paper>
        </Grid>
      ))}

    </Grid>

  );
}
