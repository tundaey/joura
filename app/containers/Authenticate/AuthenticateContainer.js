import React from 'react' 
import PropTypes from 'prop-types'
import {connect} from 'react-redux' 
import {bindActionCreators} from 'redux'
import * as userActionCreators from 'redux/modules/user'
import {Authenticate} from 'components'


class AuthenticateContainer extends React.Component {
    constructor(props){
        super(props)

        this.handleAuth = this.handleAuth.bind(this)
    }

    render () {
        return (
            <Authenticate 
                isFetching={this.props.isFetching}
                error={this.props.error} 
                onAuth={this.handleAuth} />
        )
    }

    handleAuth(e){
        e.preventDefault()
        this.props.fetchAndHandleUser().then(()=> this.context.router.replace('feed'))
    }
}

AuthenticateContainer.propTypes = {
    isFetching : PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleUser : PropTypes.func.isRequired,
}

AuthenticateContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps({user}){
    return {
        isFetching: user.isFetching,
        error:user.error,
    }
}

function mapDispatchProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(AuthenticateContainer)