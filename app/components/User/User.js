import React from 'react' 
import PropTypes from 'prop-types' 
import {QuestionContainer} from 'containers'

import {avatar} from 'components/Navigation/styles.css'

export default function User (props) {
    return props.noUser === true
        ? <p>{'This user does not exist'}</p>
        :<div className={"container"} style={{marginTop: 20}}>
           { props.isFetching === true
            ? <p>{'Loading'}</p>
             :  <div className={"columns"}>

                <div className={'column is-one-third'}>
                    <div className="box" style={{boxShadow: "none"}}>

                        <figure style={{ margin: "auto", width: 100}} className="image is-128x128">
                            <img className={avatar} src={props.avatar}/>
                        </figure>
                        <br/>

                        <h3 style={{ margin: "auto", width: 200, marginBottom: 10, paddingLeft: 20}} 
                         className={"title"}>{props.name}
                        </h3>

                        <a  className="button is-medium level-item" 
                         style={{background:"#e0f7fa", color: "#00bcd4"}}>
                            <span className="icon is-medium">
                            <i className="fa fa-user-plus"></i>
                            </span>
                            <span style={{paddingLeft: 10}}>Follow</span>
                        </a>

                        <nav style={{marginTop: 20}} className="level is-mobile">

                            <div className="level-item has-text-centered">
                                <div>
                                <p className="heading">Questions</p>
                                <p className="title">3,456</p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                <p className="heading">Upvotes</p>
                                <p className="title">123</p>
                                </div>
                            </div>
                            
                        </nav>
                    </div>
                    
                </div>

                <div className={'column'} style={{marginTop: 10}}>
                    <div className="tabs">
                        <ul>
                            <li className="is-active"><a>Questions</a></li>
                            <li><a>Following <span className="tag">40</span></a></li>
                            <li><a>Follwers<span className="tag">65</span></a></li>
                        </ul>
                        
                    </div>
                    <div style={{padding: 20}}>
                      
                        {props.length === 0 
                        ? <p>{`It looks like ${props.name.split(' ')[0]} hasn't asked any questions yet`}</p>
                         : null
                         }
                        
                       

                        {props.questionIds.map((id)=> (
                            <QuestionContainer questionId={id} key={id}/>
                        ))}

                    </div>
                </div>
            </div>
           }
           {props.error ? <p>{props.error}</p> : null}
        </div>
    
}

User.propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    questionIds: PropTypes.array.isRequired
}