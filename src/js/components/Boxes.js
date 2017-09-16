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

    renderTasks() {
        // console.log(typeof this.state.tasks);
        var Tasks = this.state.tasks.map((task) =>
            <Task key={task.toString()} taskContent={task} updateTasks={this.updateTasks.bind(this)}/>
        );
        return Tasks;
    }

    // "taskName", "UPDATE || DELETE" --> setState()
    updateTasks(action, taskName, newTask) {
        if (action == "DELETE") {
            const newState = this.state.tasks.filter(task => task !== taskName)
            this.setState((prevState, props) => ({
            tasks: newState
            }));
        } else if (action == "UPDATE") {
            const newState = this.state.tasks.map(task => {
                return task == taskName ? newTask : task
            })
            this.setState((prevState, props) => ({
            tasks: newState
            }));
        }
    }

    handleClick() {
        this.setState((prevState, props) => ({
            tasks: prevState.tasks.concat([10,11,12])
        }));
    }

    render () {
        return (
            <div className="box-container" >
                <div className="to-do box">
                    <h3>
                        <span>À FAIRE</span>
                    </h3>
                    {this.renderTasks()}
                    <div id="addTask" onClick={this.handleClick.bind(this)}>+</div>
                </div>
                <div className="doing box">
                    <h3>
                        <span>EN COURS</span>
                    </h3>
                </div>
                <div className="done box">
                    <h3>
                        <span>FAIT</span>
                    </h3>
                </div>
            </div>

        );
    }
}
