import React from 'react' 
import PropTypes from 'prop-types' 
import {Feed} from 'components'

import {connect} from 'react-redux'

class FeedContainer extends React.Component {
    render () {
        return (
            <Feed/>
        )
    }
}

function mapStateToProps({feed}){
    const { newDucksAvailable, error, isFetching } = feed
    return {
        newDucksAvailable,
        error,
        isFetching
    }
}

export default connect()(FeedContainer)

