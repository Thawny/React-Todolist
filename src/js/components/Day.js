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

    toggleDisplayBoxes(dayToChange) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // grow box-container and hide day name
            if (section.dataset['displaystate'] == "large") {
                // hide day name
                section.childNodes[1].classList.add('hidden');
                // section.childNodes[0].classList.remove('hidden');
                section.childNodes[0].classList.add('box-container-grow');
                // section.childNodes[0].classList.add('box-container-grow');

            }
            else {
                // shrink box-container and show day name
                if (section.childNodes[0].classList.contains('box-container-grow')) {
                    // section.childNodes[0].classList.add('hidden');
                    section.childNodes[0].classList.remove('box-container-grow');
                    // show day name once the shrinking boxes animation is over
                    setTimeout(() => section.childNodes[1].classList.remove('hidden'), 400)

                }
            }
        });
    }

    handleClick(e) {
        if (!e.target.classList.contains('box-container') && !(e.target.tagName == "SECTION")) return;
        if (this.domElement.dataset['displaystate'] == "large") {
            TweenMax.to(this.domElement, 0.7, {height: "14.29vh"});
            this.domElement.dataset['displaystate'] = "small";
            this.toggleDisplayBoxes(e.target.id)
        } else if (this.domElement.dataset['displaystate'] == "small" || this.domElement.dataset['displaystate'] == "medium") {
            TweenMax.to(this.domElement, 0.7, {height: "160vh"});
            this.domElement.dataset['displaystate'] = "large";
            this.shrinkAllExcept(this.props.day);
            this.toggleDisplayBoxes(e.target.id)
        }
    }

    handleMouseLeave(e) {
        if (this.domElement.dataset['displaystate'] !== "large") {
            TweenMax.to(this.domElement, 0.7, {height: "14.29vh"});
            this.domElement.dataset['displaystate'] = "small";
        }
    }

    handleMouseEnter(e) {
        if (this.domElement.dataset['displaystate'] !== "large") {
            TweenMax.to(this.domElement, 0.7, {height: "25vh"});
            this.domElement.dataset['displaystate'] = "medium";
        }
    }

    render () {

        return (
            <section id={this.props.day}
                     onClick={this.handleClick.bind(this)}
                     onMouseEnter={this.handleMouseEnter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}
                     data-displaystate="small">

                <Boxes todos={this.props.todos[this.props.day]}/>
                <h3 className="day-name">{this.props.day}</h3>

            </section>
        );
    }
}
