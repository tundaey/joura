import React from 'react' 
import PropTypes from 'prop-types' 
import {Navigation} from 'components'
import {AuthenticateContainer} from 'containers'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as modalActionCreators from 'redux/modules/modal'

class NavigationContainer extends React.Component {
    constructor(props){
        super(props);
        this.openAskQuestionModal = this.openAskQuestionModal.bind(this)
    }

    render () {
        return (
            <Navigation user={this.props.user} openModal={this.openAskQuestionModal} isAuthed={this.props.isAuthed}/>
        )
    }

    openAskQuestionModal(){
        this.props.openModal()
    }
}

NavigationContainer.propTypes = {
    isAuthed : PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(modalActionCreators, dispatch)
}

function mapStateToProps({user}){
    return {
        user: user[user.authedId] ? user[user.authedId].profile : {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)
