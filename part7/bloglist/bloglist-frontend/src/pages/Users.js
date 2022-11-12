import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { initializeUsers } from "../reducers/userReducer"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const userRows = users.map(user => {
    return (
      <tr key={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th/>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userRows}
        </tbody>
      </table>
    </>
  )
}

export default Users