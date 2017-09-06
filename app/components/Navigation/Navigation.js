import React from 'react' 
import PropTypes from 'prop-types' 

import {Link} from 'react-router'
import {ModalContainer} from 'components'

import {avatar} from './styles.css'

export default function Navigation ({isAuthed, openModal, user}) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <span style={{fontSize: 30}}>Joura</span>
                 </a>

                <div className="navbar-burger burger" data-target="navMenubd-example">
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>

            <div id="navMenubd-example" className="navbar-menu">
                <NavLinks user={user} isAuthed={isAuthed} />
                <ActionLinks user={user} openModal={openModal}  isAuthed={isAuthed}/>
            </div>
</nav>
    )
}

function NavLinks({isAuthed, user}){
    return (
        isAuthed === true
        ? <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link is-active" to="/">{'Docs'}</Link>
                <div className="navbar-dropdown ">
                    <a className="navbar-item " href="/documentation/overview/start/">
                        Overview
                    </a>
                    <a className="navbar-item is-active" href="http://bulma.io/documentation/components/breadcrumb/">
                    Components
                    </a>
                    <hr className="navbar-divider"/>
                    <div className="navbar-item">
                        <div>
                            <p className="is-size-6-desktop">
                                <strong className="has-text-info">0.5.1</strong>
                            </p>
                            <small>
                            <a className="bd-view-all-versions" href="/versions">View all versions</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <Link className="navbar-item" to="/">{'Expo'}</Link>
            <Link className="navbar-item" to="/">{'Love'}</Link>
        </div>
        : null

    )
}

function ActionLinks({isAuthed, openModal, user}){
    return (
        isAuthed === true 
        ?<div className="navbar-end">
            <div className="navbar-item">
                <figure className="image is-32x32">
                    <img src={user.avatar} className={avatar}/>
                </figure>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link is-active" to="/">{user.name}</Link>
                <div className="navbar-dropdown ">
                    <a className="navbar-item " href="/documentation/overview/start/">
                        Profile
                    </a>
                    <hr className="navbar-divider"/>
                    <Link className="navbar-item" to="/logout">{'Logout'}</Link>
                </div>
            </div>
            <div className="navbar-item">
                <div className="field is-grouped">
                    <p className="control">
                        <button onClick={openModal} className="button is-success">
                            <span>Submit Question</span>
                        </button>
                    </p>
                </div>
            </div>
            </div>
            
            
             :null           
        
    )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
    isAuthed : PropTypes.bool.isRequired,
    openModal: PropTypes.func,
    user: PropTypes.object.isRequired
}