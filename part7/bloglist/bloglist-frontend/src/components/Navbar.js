import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logout } from "../reducers/loginReducer"

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const ulStyle = {
    backgroundColor: "lightgrey",
    listStyle: "none",
    margin: 0,
    padding: "0.25em"
  }
  const liStyle = {
    display: "inline",
    marginRight: "0.25em"
  }

  const handleLogout = () => {
    dispatch(logout(null))
  };

  return (
    <nav>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to="/">blog</Link></li>
        <li style={liStyle}><Link to="/users">users</Link></li>
        <li style={liStyle}>{user.name} logged in</li>
        <li style={liStyle}><button onClick={handleLogout}>logout</button></li>
      </ul>
    </nav>
  )
}

export default Navbar