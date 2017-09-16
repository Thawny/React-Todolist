import React from 'react'
import Boxes from './Boxes'
import {TweenMax} from "gsap";

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayState: "small",
        }
        this.displaySize = "small"
    }

    shrinkAllExcept(dayNotToShrink) {
        var sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.id !== dayNotToShrink) {
                TweenMax.to(section, 0.7, {height: "14.29vh"});
                section.dataset['displaystate'] = "small"
            }
        })
    }

    handleClick(e) {
        console.log(e.target)
        let domEl = document.getElementById(this.props.day)
        this.props.toggleDisplayBoxes(e.target.id)
        if (domEl.dataset['displaystate'] == "large") {
            TweenMax.to(domEl, 0.7, {height: "14.29vh"});
            this.displaySize = "small";
        } else if (domEl.dataset['displaystate'] == "small" || domEl.dataset['displaystate'] == "medium") {
            TweenMax.to(domEl, 0.7, {height: "160vh"});
            domEl.dataset['displaystate'] = "large";
            this.shrinkAllExcept(this.props.day);
        }
    }

    handleMouseLeave(e) {
        let domEl = document.getElementById(this.props.day)
        if (domEl.dataset['displaystate'] !== "large") {
            TweenMax.to(domEl, 0.7, {height: "14.29vh"});
            domEl.dataset['displaystate'] = "small";
        }
    }

    handleMouseenter(e) {
        let domEl = document.getElementById(this.props.day)
        if (domEl.dataset['displaystate'] !== "large") {
            TweenMax.to(domEl, 0.7, {height: "25vh"});
            domEl.dataset['displaystate'] = "medium";
        }
    }

    render () {

        let content = this.props.displayBoxes ? <Boxes todos={this.props.todos[this.props.day]}/> : <h3>{this.props.day}</h3>;
        return (
            <section id={this.props.day}
                     onClick={this.handleClick.bind(this)}
                     onMouseEnter={this.handleMouseenter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}
                     data-displaystate="small">
                {content}
            </section>
        );
    }
}
