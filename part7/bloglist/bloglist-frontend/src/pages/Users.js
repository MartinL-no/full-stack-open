import { useEffect } from "react"
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
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })
  console.log(users)

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