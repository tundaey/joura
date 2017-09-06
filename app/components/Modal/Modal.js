import React from 'react' 
import PropTypes from 'prop-types' 

export default function Modal (props) {
    return props.isOpen === true 
    ?<div id="modal" className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="box">
                <div className="field">
                    <div className="control">
                        <input onChange={(e)=> props.updateModalQuestion(e.target.value)} 
                        className="input is-large" 
                        type="email" 
                        placeholder="What is your Question?"/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <textarea 
                            onChange={(e)=> props.updateModalDescription(e.target.value)}
                            className="textarea" 
                            placeholder="Describe your question"></textarea>
                    </div>
                </div>
                
                    <button disabled={props.disableSubmitBtn} onClick={props.submitQuestion} 
                    className={props.isSubmitting ? "button is-success is-loading" : "button is-success"}>Ask Question</button>
                
            </div>
        </div>
        <button onClick={props.closeModal} className="modal-close is-large"></button>
    </div>
    :  null    
    
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    updateModalQuestion: PropTypes.func.isRequired,
    updateModalDescription: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    submitQuestion: PropTypes.func.isRequired,
    disableSubmitBtn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

