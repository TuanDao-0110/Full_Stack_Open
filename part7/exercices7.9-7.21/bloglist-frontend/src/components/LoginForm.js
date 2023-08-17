import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';

const LoginForm = ({
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange
}) => {
    return (
        <form onSubmit={handleLogin} style={{paddingBottom:'1rem'}}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <Button   type="submit" id="login-button" onClick={() => {}}>
                login
            </Button>
        </form>
    );
};

LoginForm.prototype = {
    handleLogin: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};
export default LoginForm;
