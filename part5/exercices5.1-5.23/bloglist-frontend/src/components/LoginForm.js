import PropTypes from 'prop-types'

const LoginForm = (
  { handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id='login-button' onClick={() => {
      }}>login</button>
    </form>
  )
}


LoginForm.prototype = {
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm