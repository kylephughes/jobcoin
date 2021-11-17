import 'components/JobcoinAppBar/AuthedUser/authedUser.css'

import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import { useAuth } from 'hooks/useAuth'

type AuthedUserProps = {}
export const AuthedUser = (props: AuthedUserProps) => {
  const { signout } = useAuth()
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClick = (event: any) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setMenuAnchor(null)
  }

  const handleSignout = () => {
    signout()
  }
  const openMenu = menuAnchor ? true : false
  return (
    <>
      <IconButton onClick={handleClick} size="large" edge="end" color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu className="account-menu" anchorEl={menuAnchor} open={openMenu} onClose={handleClose}>
        <MenuItem onClick={handleSignout}>Sign out</MenuItem>
      </Menu>
    </>
  )
}
