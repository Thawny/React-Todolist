import React from 'react';
import Day from './Day';

export default class Layout extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                days : ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
            }
    }

    renderDays() {
        const days = this.state.days.map((day, i) =>
            <Day key={i.toString()}
                 day={day}
                 todos={this.props.todos}/>
        );
        return days;
    }
    render () {
        return (
            <div id="container">
                {this.renderDays()}
            </div>

        );
    }
}
