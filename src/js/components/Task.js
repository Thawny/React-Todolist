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

    isChromeOrFirefox() {
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if (isChrome || isFirefox) return "-10px"
        else return "0px"
    }

    componentDidMount() {
        this.toggleWidgetHook = document.getElementById(this.id).querySelector('.toggleWidgetHook');
        this.taskContent = document.getElementById(this.id).querySelector('.task-content');
        this.actionWidget = document.getElementById(this.id).querySelectorAll('.action-widget')
    }

    handleMouseEnter(e) {
        this.actionWidget.forEach(widget => widget.classList.toggle('grow'))
    }

    handleMouseLeave(e) {
        this.actionWidget.forEach(widget => widget.classList.toggle('grow'))
    }

    handleEditClick(e) {
        console.log(this.taskContent.setAttribute("contenteditable",true))
        this.taskContent.addEventListener('blur', e => this.taskContent.setAttribute("contenteditable",false))
    }

    handleDeleteClick(e) {
        console.log(this.props.taskContent)
        this.props.updateTasks("DELETE", this.props.taskContent)
    }

    render () {
        const offSet = ((!!window.chrome && !!window.chrome.webstore) || (typeof InstallTrigger !== 'undefined')) ? "-10px" : "0px";
        return (
            <div id={this.id} className="task">
                <span className="task-span"
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)} >

                    <span className="task-content" contentEditable="false" style={{transform:'translateY('+ offSet +')'}}>
                        {this.props.taskContent}
                    </span>

                    <span className="toggleWidgetHook">
                        <span className="action-widget" onClick={this.handleEditClick.bind(this)}>E</span>
                        <span className="action-widget" onClick={this.handleDeleteClick.bind(this)}>X</span>
                    </span>

                </span>
            </div>
        );
    }
}
