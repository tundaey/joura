import React from 'react' 
import PropTypes from 'prop-types' 
import {Feed} from 'components'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends React.Component {

    componentDidMount(){
        this.props.setAndHandleFeedListener()
    }

    render () {
        return (
            <Feed
                newQuestionsAvailable={this.props.newQuestionsAvailable}
                questionIds={this.props.questionIds}
                error= {this.props.error}
                resetNewQuestionsAvailable={this.props.resetNewQuestionsAvailable}
                isFetching={this.props.isFetching}/>
        )
    }
}

FeedContainer.propTypes = {
    newQuestionsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewQuestionsAvailable: PropTypes.func.isRequired,
    questionIds: PropTypes.array.isRequired
}

function mapStateToProps({feed}){
    const { newQuestionsAvailable, error, isFetching, questionIds } = feed
    return {
        newQuestionsAvailable,
        error,
        isFetching,
        questionIds
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)

