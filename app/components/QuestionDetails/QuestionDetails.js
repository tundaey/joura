import React from 'react' 
import PropTypes from 'prop-types' 
import {QuestionContainer, RepliesContainer} from 'containers'
import {formatReply} from 'helpers/utils'

function Reply({submit}){

    function handleSubmit(e){
        if(Reply.ref.value.length === 0){
            return
        }

        submit(Reply.ref.value, e)
        Reply.ref.value = ''
    }
    return (
        <nav className="panel">
            <p className="panel-heading">
                Reply
            </p>
            <div className="panel-block">
                <p className="control has-icons-left">
                <textarea
                 ref={(ref)=> Reply.ref = ref} 
                 className="textarea" 
                 type="text" 
                 placeholder="Enter Reply"></textarea>
                </p>
            </div>
  
            <div className="panel-block">
                <button onClick={handleSubmit} className="button is-primary">
                Submit
                </button>
            </div>
        </nav>
    )
}

export default function QuestionDetails (props) {
    return (
        <div className="container">
           <div className="columns">
               <div style={{margin: "auto", width: 800, padding: 20}}>
                    {props.isFetching === true ? <p>{'Loading'}</p> 
                    :<div>
                        <QuestionContainer questionId={props.questionId}
                        hideReplyButton={true}
                        hideLikeCount={false}/>

                        <div id="replies">
                            <h2 className="subtitle">{'Replies'}</h2>
                            <Reply 
                             submit={(replyText)=> props.addAndHandleReply(props.questionId, formatReply(props.authedUser, replyText))}
                            />

                            <div style={{marginTop: 15}}>
                                <RepliesContainer questionId={props.questionId}/>
                            </div>
                        </div>
                    </div>
                    }
                    {props.error ? <p>{props.error}</p>: null}
                </div>
           </div>
        </div>
    )
}

QuestionDetails.propTypes = {
    authedUser: PropTypes.object.isRequired,
    questionId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
}