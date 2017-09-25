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
        this.actionWidget = document.getElementById(this.id).querySelectorAll('.action-widget');
        this.draggableDiv = document.getElementById(this.id);
    }

    handleMouseEnter(e) {
        this.actionWidget.forEach(widget => widget.classList.toggle('grow'))
    }

    handleMouseLeave(e) {
        this.actionWidget.forEach(widget => widget.classList.toggle('grow'))
    }

    handleEditClick(e) {
        // turn off draggable
        this.draggableDiv.setAttribute('draggable', false);

        this.taskContent.setAttribute("contenteditable",true);
        this.taskContent.focus();

    }

    handleDeleteClick(e) {
        console.log(this.props.taskContent)
        this.props.updateTasks("todos" ,"DELETE", this.props.taskContent)
    }

    handleDragStart(e) {
        console.log('drag started')
    }

    handleBlur(e) {
        e.target.setAttribute("contenteditable",false);
        this.draggableDiv.setAttribute('draggable', true);
    }

    render () {
        const offSet = ((!!window.chrome && !!window.chrome.webstore) || (typeof InstallTrigger !== 'undefined')) ? "-10px" : "0px";
        return (
            <div id={this.id} className="task" draggable onDragStart={this.handleDragStart}>
                <span className="task-span"
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)} >

                    <span className="task-content" contentEditable="false" onBlur={this.handleBlur.bind(this)} style={{transform:'translateY('+ offSet +')'}}>
                        {this.props.taskContent}
                    </span>

                    <span className="toggleWidgetHook">
                        <span className="action-widget" onClick={this.handleEditClick.bind(this)}>

                            <svg x="0px" y="0px"
                            	 width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899"
                            	>
                            <g>
                            	<path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                            		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                            		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                            		L27.473,390.597L0.3,512.69z"/>
                            </g>
                            </svg>

                        </span>
                        <span className="action-widget" onClick={this.handleDeleteClick.bind(this)}>X</span>
                    </span>

                </span>
            </div>
        );
    }
}
