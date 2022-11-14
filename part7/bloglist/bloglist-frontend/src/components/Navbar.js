import {
  AppBar,
  Toolbar,
  Button
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { logout } from "../reducers/loginReducer"

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLogout = () => {
     dispatch(logout(null))
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <em>{user.name} logged in</em>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>

  )
}

export default Navbar