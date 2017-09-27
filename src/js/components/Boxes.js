import React from 'react';
import Task from './Task';

export default class Boxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
            doings: [],
            dones: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.originBox = "";
    }

    renderTasks(targetBox) {
        var Tasks = this.state[targetBox].map((task, i) =>
            <Task boxType={targetBox} key={i.toString()} taskContent={task} updateTasks={this.updateTasks.bind(this)}/>
        );
        return Tasks;
    }

    // "taskName", "UPDATE || DELETE || ADD" --> setState()
    updateTasks(targetBox ,action, taskName, newTask) {
        if (action == "DELETE") {
            const newState = this.state[targetBox].filter(task => task !== taskName)
            this.setState((prevState, props) => ({
            [targetBox]: newState
            }));
        } else if (action == "UPDATE") {
            const newState = this.state[targetBox].map(task => {
                return task == taskName ? newTask : task
            })
            this.setState((prevState, props) => ({
            [targetBox]: newState
            }));
            console.log(this.state[targetBox])
        } else if (action == "ADD") {
            // si newtask la prendre en compte sinon tâche vide
            if (newTask) {
                this.setState((prevState, props) => ({
                    [targetBox]: prevState[targetBox].concat([newTask])
                }));
            } else {
                this.setState((prevState, props) => ({
                    [targetBox]: prevState[targetBox].concat([""])
                }));
            }
        }
    }

    handleClick() {
        this.updateTasks("todos", "ADD")
    }

    handleDrop(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const newBox = e.currentTarget.dataset['type'];
        const originBox = this.originBox;
        const movedTask = e.dataTransfer.getData("text");
        if (e.currentTarget.classList.contains('dragged-over')) {
            e.currentTarget.classList.remove('dragged-over');
        }
        // supprimer la tâche de l'ancien :
        this.updateTasks(originBox, "DELETE", movedTask);
        // ajouter la tâche dans le conteneur du drop :
        this.updateTasks(newBox, "ADD", null, movedTask);

        e.dataTransfer.clearData();
        this.originBox = "";
    }

    handleDragOver(e) {
        e.preventDefault()
        if (!e.currentTarget.classList.contains('dragged-over')) {
            e.currentTarget.classList.add('dragged-over')
        }

    }

    handleDragStart(e) {
        this.originBox = e.currentTarget.dataset['type'];
        e.dataTransfer.setData('text', e.target.querySelector('.task-content').innerHTML);
    }

    handleDropLeave(e) {
        e.stopPropagation()
        if (e.currentTarget.classList.contains('dragged-over')) {
            e.currentTarget.classList.remove('dragged-over')
        }
    }

    render () {
        return (
            <div className="box-container box-container-shrink">
                <div data-type="todos" className="to-do box" onDrop={this.handleDrop.bind(this)} onDragStart={this.handleDragStart.bind(this)} onDragLeave={this.handleDropLeave} onDragOver={this.handleDragOver}>
                    <h3>
                        <span>À FAIRE</span>
                    </h3>
                    {this.renderTasks('todos')}
                    <div className="task add-task-container" onClick={this.handleClick.bind(this)}>
                        <span className="add-task">+</span>
                    </div>
                </div>
                <div data-type="doings" className="doing box" onDragStart={this.handleDragStart.bind(this)} onDrop={this.handleDrop.bind(this)} onDragLeave={this.handleDropLeave} onDragOver={this.handleDragOver}>
                    <h3>
                        <span>EN COURS</span>
                    </h3>
                    {this.renderTasks('doings')}
                </div>
                <div data-type="dones" className="done box" onDragStart={this.handleDragStart.bind(this)} onDragOver={this.handleDragOver} onDrop={this.handleDrop.bind(this)} onDragLeave={this.handleDropLeave}>
                    <h3>
                        <span>FAIT</span>
                    </h3>
                    {this.renderTasks('dones')}
                </div>
            </div>

        );
    }
}
