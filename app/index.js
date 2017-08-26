import React from 'react'
import ReactDOM from 'react-dom'

class HelloComponent extends React.Component {
    render(){
        return (
            <div>Hello World</div>
        )
    }
}

ReactDOM.render(
    <HelloComponent/>, document.getElementById('app')
)