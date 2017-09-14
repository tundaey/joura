import React from 'react' 
import PropTypes from 'prop-types' 
import {formatTimestamp} from 'helpers/utils'

function Reply({reply}){
    const time = formatTimestamp(reply.timestamp)
    return (
        <div className="card" style={{margin: 10}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img src={reply.avatar} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{reply.name}</p>
                    </div>
                </div>

                <div className="content">
                    {reply.reply}
                    
                    <br/>
                    <time dateTime="2016-1-1">{time}</time>
                </div>
            </div>
        </div>
    )
}

export default function Replies ({isFetching, error, replies}) {
    const replyIds = Object.keys(replies)
    return (
        <div>
            {error ? <h3>{error}</h3> : null}
            {isFetching === true
            ? <p>{'Fetching Replies'}</p>
            : <div>
                {replyIds.map((replyId) => (
                    <Reply key={replyId} reply={replies[replyId]}/>
                )
                )}    
            </div>}
        </div>
    )
}

Replies.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    replies: PropTypes.object
}