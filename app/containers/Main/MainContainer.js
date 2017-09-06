import React from 'react' 
import PropTypes from 'prop-types' 
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActionCreators from 'redux/modules/user'
import {formatUserInfo} from 'helpers/utils'

import {firebaseAuth} from 'config/constants'

import {NavigationContainer, ModalContainer} from 'containers'

class MainContainer extends React.Component {
    componentDidMount(){
        firebaseAuth().onAuthStateChanged((user)=> {
            if(user){
                const userData = user.providerData[0]
                const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
                this.props.authUser(user.uid)
                this.props.fetchingUserSuccess(userInfo, user.uid, Date.now());
                if(this.props.location.pathname === '/'){
                    this.context.router.replace('/feed')
                }
            }else{
                this.props.removeFetching()
            }
        })
    }
    render () {
        return this.props.isFetching === true 
        ?<div>
            <NavigationContainer isAuthed={this.props.isAuthed}/>
            <div className="loader">Loading...</div>
        </div>
        :<div>
            <NavigationContainer isAuthed={this.props.isAuthed}/>
            <ModalContainer/>
            {this.props.children}
        </div>
        
    }
}

MainContainer.propTypes = {
    isAuthed : PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired
}

MainContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps({user}){
    return {
        isAuthed: user.isAuthed,
        authedId: user.authedId,
        isFetching: user.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)

