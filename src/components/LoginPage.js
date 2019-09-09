import React from 'react'
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => {
    return (
        <div>
            <div className="loginForm">
            <button onClick={startLogin} type="submit">Login</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

