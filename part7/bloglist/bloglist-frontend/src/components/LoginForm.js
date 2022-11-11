import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../reducers/loginReducer";
import { createNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(login(username, password))
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(createNotification("Wrong username or password", 5));
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
