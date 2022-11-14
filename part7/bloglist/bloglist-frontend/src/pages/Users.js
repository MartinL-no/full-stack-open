import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { initializeUsers } from "../reducers/userReducer"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const userRows = users.map(user => {
    return (
      <TableRow key={user.id}>
        <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
        <TableCell>{user.blogs.length}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRows}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users