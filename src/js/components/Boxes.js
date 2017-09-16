import React from 'react';
import Task from './Task';

export default class Boxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.todos
        }
        this.handleClick = this.handleClick.bind(this);
    }

    renderTask() {
        // console.log(typeof this.state.tasks);
        var Tasks = this.state.tasks.map((task) =>
            <Task key={task.toString()} taskContent={task}/>
        );
        return Tasks;
    }
    handleClick() {
        this.setState((prevState, props) => ({
            tasks: prevState.tasks.concat([10,11,12])
        }));
        console.log(this.state.tasks);
    }
    stopPropagation(e) {

    }

    render () {
        return (
            <div className="box-container" >
                <div className="to-do box">
                    {this.renderTask()}
                    <div id="addTask" onClick={this.handleClick.bind(this)}>+</div>
                </div>
                <div className="doing box"></div>
                <div className="done box"></div>
            </div>

        );
    }
}
