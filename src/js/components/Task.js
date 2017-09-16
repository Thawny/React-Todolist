import React from 'react';
import randomId from 'random-id';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIsOn : false,
        };
        this.id = randomId(15, "a");
    }

    componentDidMount() {
        this.toggleWidgetHook = document.getElementById(this.id);
    }

    handleMouseEnter(e) {
        this.toggleWidgetHook.classList.toggle('hidden');
    }

    handleMouseLeave(e) {
        this.toggleWidgetHook.classList.toggle('hidden');
    }

    handleEditClick(e) {

    }

    handleDeleteClick(e) {
        console.log('click')
        console.log(this.props.taskContent)
        this.props.updateTasks("DELETE", this.props.taskContent)
    }

    render () {
        return (
            <div className="task">
                <span className="task-span"
                    contentEditable={this.state.editIsOn}
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)} >

                    {this.props.taskContent}

                    <span id={this.id} className="toggleWidgetHook hidden">
                        <span className="action-widget" onClick={this.handleEditClick.bind(this)}>E</span>
                        <span className="action-widget" onClick={this.handleDeleteClick.bind(this)}>X</span>
                    </span>
                </span>
            </div>
        );
    }
}
