'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import GarageIcon from '@mui/icons-material/Garage';
import Link from 'next/link';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/gql/Query';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const pages = ['Add Employee', 'Manage Requests'];
const pagesLink = ['addEmployee', 'manageRequests'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { data } = useQuery(GET_CURRENT_USER,{
    variables:{employeesId: typeof window !== "undefined" && window.localStorage.getItem("Token")}
  })
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter()
  const client = useApolloClient()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("Token")
      client.writeQuery({
        query: gql`
            {
                isLoggedIn @client
            }
        `,
        data:{ isLoggedIn: false }
      })
      router.push('/')
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='bg-[#19556b]'>
        <Toolbar disableGutters>
          {
            data && data.me.role === 0 ? 
            <>
              <GarageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                GP
              </Typography>
            </>
            :''
          }

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                data && data.me.role === 0 ?
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={`/${pagesLink[0]}`}>
                    <Typography textAlign="center">{pages[0]}</Typography>
                  </Link>
                </MenuItem>
                :
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={`/${pagesLink[1]}`}>
                    <Typography textAlign="center">{pages[1]}</Typography>
                  </Link>
                </MenuItem>
              }
              {
                data &&
                <button className='w-full ' onClick={()=>{handleLogOut()}}> Logout </button>
              }
            </Menu>
          </Box>
          {
            data && data.me.role === 0 ? 
              <>
                <GarageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  GP
                </Typography>
              </>
              :
              <>
                <GarageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    GP
                </Typography>
              </>
          }
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {
            data && data.me.role === 0 ?
              <Link href={`/${pagesLink[0]}`}>
                  <Button
                      key={pages[0]}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      {pages[0]}
                  </Button>
              </Link>
            :
            <Link href={`/${pagesLink[1]}`}>
                <Button
                    key={pages[1]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {pages[1]}
                </Button>
            </Link>
          }
          {
            data &&
            <button className='text-right w-[80%]' sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>{handleLogOut()}}> Logout </button>
          }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
