import React from 'react';
import Day from './Day';

export default class Layout extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                days : [["lundi", false],["mardi", false] , ["mercredi", false],["jeudi", false] , ["vendredi", false], ["samedi", false], ["dimanche", false]]
            }
    }
    toggleDisplayBoxes(dayToChange) {
        let currentState = this.state.days;
        let newState = currentState.map(function(day){
            if (dayToChange !== day[0]) {
                if (day[1] == true) day[1] = false;
            } else {
                day[1] == false ? day[1] = true : day[1] = false
            }
        })
        this.setState((prevState, props) => ({
        displayState: newState
        }));
    }
    renderDays() {
        const days = this.state.days.map((day, i) =>
            <Day key={i.toString()}
                 day={day[0]}
                 displayBoxes={day[1]}
                 toggleDisplayBoxes={this.toggleDisplayBoxes.bind(this)}
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
