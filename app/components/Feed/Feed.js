import React from 'react' 
import PropTypes from 'prop-types' 
import {QuestionContainer} from 'containers'


function NewQuestionsAvalailable({handleClick}){
    return (
        <span onClick={handleClick} className="tag is-rounded is-success is-medium">
            {'New Questions Available'}
            <button onClick={handleClick} className="delete is-small"></button>
        </span>
    )
}

export default function Feed (props) {
    return props.isFetching === true
        ? <h4 className="title is-4">{'Loading Questions'}</h4>
        : <div style={{margin: "auto", width: 800, padding: 20}}>
            {props.newQuestionsAvailable ? <NewQuestionsAvalailable 
            handleClick={props.resetNewQuestionsAvailable}/> : null}

            {props.questionIds.length === 0 
            ? <h4 className="title is-4">{'This is unfortunate. It appears there no questions yet'}</h4>
            : null}

            {props.questionIds.map((id)=> (
                <QuestionContainer questionId={id} key={id}/>
            ))}

            {props.error ? 
            <h4 className="title is-4">{'This is unfortunate. It appears there no questions yet'}</h4>
            : null}
        </div>
}

Feed.propTypes = {
    newQuestionsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    resetNewQuestionsAvailable: PropTypes.func.isRequired,
    questionIds: PropTypes.array.isRequired
}