import React from 'react' 
import PropTypes from 'prop-types' 

import {formatTimestamp} from 'helpers/utils'

import {likedIcon} from './styles.css'

function Reply(){
    return (
        <a className="level-item">
            <span className="icon is-small"><i className="fa fa-reply"></i></span> 
            <span style={{padding: 5}}>Write an Answer</span>
        </a>
    )
}

export default function Question (props) {
    console.log('props', props.numberOfLikes)
    const starIcon = props.isLiked === true ? likedIcon : "icon"
    const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
    return (
        <div className="box" 
        style={{cursor: props.hideReplyButton === true ? 'default' : 'pointer'}}>
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={props.question.avatar} alt="Image"/>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p onClick={props.goToProfile}>
                            <strong >{props.question.name}</strong> <small>{formatTimestamp(props.question.timestamp)}</small> 
                        </p>
                        <br / >
                        <p onClick={props.onClick}>                            
                            <strong >{props.question.question}</strong>
                            <br />
                            {props.question.description}
                        </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                            {props.isLiked === true 
                            ?<a onClick={(e)=> starFn(props.question.questionId, e)} className="button is-small level-item" 
                            style={{background:"#eceff1", color: "#90a4ae"}}>
                                <span className="icon is-small">
                                <i className="fa fa-thumbs-up"></i> 
                                </span>
                                 {props.hideLikeCount === true 
                                ? null 
                                : <span style={{padding: 1}}>{props.numberOfLikes}</span>}
                                
                            </a> 
                            :<a onClick={(e)=> starFn(props.question.questionId, e)} className="button is-small level-item" 
                            style={{background:"#e0f7fa", color: "#00bcd4"}}>
                                <span className="icon is-small">
                                <i className="fa fa-thumbs-o-up"></i>
                                </span>
                                <span>Upvote</span>
                                {props.hideLikeCount === true 
                                ? null 
                                : <span style={{padding: 1}}>{props.numberOfLikes}</span>}
                            </a> }

                            {props.hideReplyButton === true 
                            ? null
                            : <Reply/>}                    

                         <a className="level-item">
                            <span className="icon is-small"><i className="fa fa-bullhorn"></i></span>
                            <span style={{padding: 5}}>Share</span>
                        </a>
                       
                        </div>
                    </nav>
                </div>
            </article>
        </div>


    )
}

Question.propTypes ={
    question: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        questionId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        description: PropTypes.string,
        timestamp: PropTypes.number.isRequired,
        uid: PropTypes.string.isRequired
    }),
    goToProfile: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyButton: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired
}