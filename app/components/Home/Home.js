import React from 'react' 
import PropTypes from 'prop-types' 
import {AuthenticateContainer} from 'containers'

import {isround} from './styles.css'

const color = "linear-gradient(305deg,#2e63e7,#27b6dc 84%,#26bddc 90%,#26bddc 0,#26c6da)"

export default function Home (props) {
    return (
        <section className={"hero is-fullheight is-info is-bold"} style={{background: color}}>
            <div className="hero-body">
               <div className="columns">
                   <div className="column is-half">
                        <div className="" style={{paddingLeft: 40}}>
                            <h3 className="title is-2">
                                <a href="">
                                <strong>Joura</strong> 
                                </a>
                            </h3>

                            <h3 className="title is-2">
                                <a href="">
                                <strong>A friendly and inclusive Q&A network for Javascript Developers</strong> 
                                </a>
                            </h3>
                            <h4 className="subtitle is-4">How it works:</h4>
                            <p style={{marginBottom: 10}}>
                                <span style={{paddingRight: 10}}><i className="fa fa-check-square-o"></i></span>  
                                Join for free
                            </p>
                            <p style={{marginBottom: 10}}>
                                <span  style={{paddingRight: 10}}><i className="fa fa-check-square-o"></i></span>  
                                Ask for programming advice & opinions                   
                            </p>
                            <p style={{marginBottom: 10}}>
                                <span  style={{paddingRight: 10}}><i className="fa fa-check-square-o"></i></span>  
                                Share what you know & grow your knowledge
                            </p>
                        </div>
                   </div>
                   <div className="column is-one-third" style={{paddingRight: 30}}>
                        <AuthenticateContainer/>
                   </div>
               </div>
            </div>
        </section>
    )
}