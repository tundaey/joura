import React from 'react' 
import PropTypes from 'prop-types' 
import {Logout} from 'components'
import {connect} from 'react-redux'
import {logoutAndUnAuth} from 'redux/modules/user'

class LogoutContainer extends React.Component {
    componentDidMount(){
        this.props.dispatch(logoutAndUnAuth())
        this.context.router.replace('/')
    }
    render () {
        return (
            <Logout/>
        )
    }
}

LogoutContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

LogoutContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect()(LogoutContainer)