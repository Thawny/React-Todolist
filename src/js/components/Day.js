import React from 'react'
import Boxes from './Boxes'
import {TweenMax} from "gsap";

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.displaySize = "small";
    }

    componentDidMount() {
        this.domElement = document.getElementById(this.props.day)
    }

    shrinkAllExcept(dayNotToShrink) {
        let sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.id !== dayNotToShrink) {
                TweenMax.to(section, 0.7, {height: "14.29vh"});
                section.dataset['displaystate'] = "small"
            }
        })
    }

    handleClick(e) {
        console.log(e.target)
        this.props.toggleDisplayBoxes(e.target.id)
        if (this.domElement.dataset['displaystate'] == "large") {
            TweenMax.to(this.domElement, 0.7, {height: "14.29vh"});
            this.domElement.dataset['displaystate'] = "small";
        } else if (this.domElement.dataset['displaystate'] == "small" || this.domElement.dataset['displaystate'] == "medium") {
            TweenMax.to(this.domElement, 0.7, {height: "160vh"});
            this.domElement.dataset['displaystate'] = "large";
            this.shrinkAllExcept(this.props.day);
        }
    }

    handleMouseLeave(e) {
        if (this.domElement.dataset['displaystate'] !== "large") {
            TweenMax.to(this.domElement, 0.7, {height: "14.29vh"});
            this.domElement.dataset['displaystate'] = "small";
        }
    }

    handleMouseenter(e) {
        if (this.domElement.dataset['displaystate'] !== "large") {
            TweenMax.to(this.domElement, 0.7, {height: "25vh"});
            this.domElement.dataset['displaystate'] = "medium";
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
