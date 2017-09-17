import React from 'react';
import Task from './Task';

export default class Boxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.todos,
            doing: [],
            done: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    renderTasks() {
        var Tasks = this.state.tasks.map((task, i) =>
            <Task key={i.toString()} taskContent={task} updateTasks={this.updateTasks.bind(this)}/>
        );
        return Tasks;
    }

    // "taskName", "UPDATE || DELETE || ADD" --> setState()
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
        } else if (action == "ADD") {
            this.setState((prevState, props) => ({
                tasks: prevState.tasks.concat([""])
            }));
            console.log(this.state.tasks)
        }
    }

    handleClick() {
        console.log('click add')
        this.updateTasks("ADD")
    }

    render () {
        return (
            <div className="box-container box-container-shrink" >
                <div className="to-do box">
                    <h3>
                        <span>À FAIRE</span>
                    </h3>
                    {this.renderTasks()}
                    <div className="task add-task-container">
                        <span className="add-task" onClick={this.handleClick.bind(this)}>+</span>
                    </div>
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
