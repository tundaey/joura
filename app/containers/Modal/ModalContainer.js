import React from 'react' 
import PropTypes from 'prop-types' 
import {Modal} from 'components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as questionActionCreators from 'redux/modules/question'
import {formatQuestion} from 'helpers/utils'

class ModalContainer extends React.Component {
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }
    render () {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                isSubmitting={this.props.isSubmitting} 
                user={this.props.user}
                updateModalQuestion={this.props.updateModalQuestion}
                updateModalDescription={this.props.updateModalDescription}
                disableSubmitBtn={this.props.disableSubmitBtn}
                submitQuestion={this.submitQuestion}
                closeModal={this.closeModal}/>
        )
    }

    closeModal(){
        this.props.closeModal()
    }

    submitQuestion(){
        this.props.questionFanout(
            formatQuestion(this.props.question, this.props.description, this.props.user))
    }
}

function mapStateToProps({modal, user}){
    const questionLength = modal.question.length;
    return {
        isOpen: modal.isOpen,
        isSubmitting: modal.isSubmitting,
        question: modal.question,
        description: modal.description,
        disableSubmitBtn : questionLength <= 0,
        user: user[user.authedId] ? user[user.authedId].profile : {}
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...modalActionCreators,...questionActionCreators}, dispatch)
}

ModalContainer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    updateModalQuestion: PropTypes.func.isRequired,
    updateModalDescription: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    disableSubmitBtn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    questionFanout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)

