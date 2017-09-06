import React from 'react' 
import PropTypes from 'prop-types' 

export default function Authenticate ({onAuth, isFetching}) {
    return (
        <div className="card" 
            style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
            <div className="card-content">
                <a className="button is-large" style={{marginTop: 20, background: "#fafbfc"}}>
                    <span className="icon is-medium">
                    <i className="fa fa-github"></i>
                    </span>
                    <span>Continue with GitHub</span>
                </a>
                <FacebookAuthButton onAuth={onAuth} isFetching={isFetching} />                
            </div>
        </div>
    )
}

Authenticate.propTypes = {
    onAuth: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
}

function FacebookAuthButton({onAuth, isFetching}){
    return (
        <a onClick={onAuth} className={isFetching === true ? "button is-info is-large is-loading": "button is-info is-large"} style={{marginTop: 20, marginBottom: 30}}>
            <span className="icon is-medium">
                <i className="fa fa-facebook"></i>
            </span>
            <span>Continue with facebook</span>
        </a>
    )
}

FacebookAuthButton.propTypes = {
    onAuth: PropTypes.func.isRequired
}