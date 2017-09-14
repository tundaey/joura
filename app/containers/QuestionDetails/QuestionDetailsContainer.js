import React from 'react' 
import PropTypes from 'prop-types' 
import {QuestionDetails} from 'components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as questionActionCreators from 'redux/modules/question'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'


class QuestionDetailsContainer extends React.Component {
    componentDidMount(){
        this.props.initLikeFetch(this.props.questionId)

        //done in case user bookmarks page or page reloads, no questionId will be in redux
        if(this.props.questionAlreadyFetched === false){
            //fetch question and save to redux store
            this.props.fetchAndHandleQuestion(this.props.questionId)
        }else{
            //set isFetching to false
            this.props.removeFetchingQuestion()
        }
    }
    render () {
        return (
            <QuestionDetails
             addAndHandleReply={(questionId, reply)=> this.props.addAndHandleReply(questionId, reply)}
             authedUser={this.props.authedUser}
             questionId={this.props.questionId}
             isFetching={this.props.isFetching}
             error={this.props.error}/>
        )
    }
}

QuestionDetailsContainer.propTypes = {
    authedUser: PropTypes.object.isRequired,
    questionId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    questionAlreadyFetched: PropTypes.bool.isRequired,
    removeFetchingQuestion: PropTypes.func.isRequired,
    fetchAndHandleQuestion: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
}

function mapStateToProps({question, likeCount, user}, props){
    return {
        isFetching: question.isFetching || likeCount.isFetching,
        error: question.error,
        authedUser: user[user.authedId].profile,
        questionId: props.routeParams.questionId,
        questionAlreadyFetched: !!question[props.routeParams.questionId]
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        ...questionActionCreators,
        ...repliesActionCreators, 
        ...likeCountActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailsContainer)

