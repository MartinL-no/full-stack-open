import { useDispatch } from "react-redux";
import { TextField, Button } from '@mui/material'

import { login } from "../reducers/loginReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";

    dispatch(login(username, password));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" name="username" />
        </div>
        <div>
          <TextField label="password" name="password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;