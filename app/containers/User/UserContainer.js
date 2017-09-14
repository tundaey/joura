import React from 'react' 
import PropTypes from 'prop-types'
import {User} from 'components' 
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {staleQuestions, staleUser} from 'helpers/utils'

import * as userActionCreators from 'redux/modules/user'
import * as userQuestionsActionCreators from 'redux/modules/userQuestions'

class UserContainer extends React.Component {
    componentDidMount(){
        const uid = this.props.routeParams.uid
        //check for cached user data before fetching user
        if(this.props.noUser === true || staleUser(this.props.lastUpdatedUser)){
            this.props.fetchAndHandleUser(uid)
        }

        //check for cached user questions before fetching user
        if(this.props.noUser === true || staleQuestions(this.props.lastUpdatedQuestions)){
            this.props.fetchAndHandleUserQuestions(uid)
        }
    }

    render () {
        return (
            <User 
              noUser={this.props.noUser}
              name={this.props.name}
              avatar={this.props.avatar}
              isFetching={this.props.isFetching}
              error={this.props.error}
              questionIds={this.props.questionIds}/>
        )
    }
}

UserContainer.propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    questionIds: PropTypes.array.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    fetchAndHandleUserQuestions: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired ,
    lastUpdatedQuestions : PropTypes.number.isRequired
}

function mapStateToProps({user, userQuestions}, props){
    console.log('questions', userQuestions)
    const specificUserQuestions = userQuestions[props.routeParams.uid]
    const _user = user[props.routeParams.uid]
    const noUser = typeof _user === 'undefined'
    return {
        noUser,
        name: noUser ? '' : _user.profile.name,
        avatar: noUser ? '' : _user.profile.avatar,
        isFetching: user.isFetching || userQuestions.isFetching,
        error: user.error || userQuestions.error,
        questionIds: specificUserQuestions ? specificUserQuestions.questionIds : [],
        lastUpdatedUser: _user ? _user.lastUpdated : 0 ,
        lastUpdatedQuestions : specificUserQuestions ? specificUserQuestions.lastUpdated : 0
        
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, ...userQuestionsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)