import React from 'react';


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIsOn : false
        };
    }


    render () {
        return (
            <div className="task" contentEditable={this.state.editIsOn}>

                <p>{this.props.taskContent}</p>
            </div>
        );
    }
}
