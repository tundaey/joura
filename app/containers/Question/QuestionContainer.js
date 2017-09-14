import React from 'react' 
import PropTypes from 'prop-types' 

import {Question} from 'components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userLikesActionCreators from 'redux/modules/userLikes'

const { func, object, bool, number} = PropTypes

class QuestionContainer extends React.Component {

    constructor(props){
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render () {
        return (
            <Question
                goToProfile={this.goToProfile}
                onClick={this.props.hideReplyButton === true ? null : this.handleClick}
                {...this.props}/>
        )
    }

    goToProfile(e){
        e.stopPropagation()
        this.context.router.push('/' + this.props.question.uid)
    }

    handleClick(e){
        e.stopPropagation()
        this.context.router.push('/questions/' + this.props.question.questionId)
    }
}

QuestionContainer.defaultProps = {
    hideReplyButton: false,
    hideLikeCount: true
}

QuestionContainer.propTypes = {
    question: object.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyButton: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired
}

QuestionContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps({question, likeCount, userLikes}, props){
    console.log(likeCount)
    return {
        question: question[props.questionId],
        hideLikeCount: props.hideLikeCount,
        hideReplyButton: props.hideReplyButton,
        isLiked: userLikes[props.questionId] === true,
        numberOfLikes: likeCount[props.questionId]
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userLikesActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)