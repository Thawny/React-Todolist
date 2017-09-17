import style from "../scss/global.scss"
import React from "react";
import ReactDom from "react-dom";
import Layout from "./components/Layout";

function renderApp(todos) {
    ReactDom.render(
      <Layout todos={todos}/>,
      document.getElementById('app')
    );
}

// const todosFromHTML = JSON.parse(document.getElementById('usertodos').dataset.usertasks);
// renderApp(todosFromHTML)

var todos = {
    lundi : ["faire la lessive", "promener le chier"],
    mardi: ["acheter des yaourts"],
    mercredi: [],
    jeudi: ["passer à la pharmacie"],
    vendredi: [],
    samedi: [],
    dimanche: ["se reposer", "aller au cinéma", "aller au resto"]
}
renderApp(todos)

// Fix for chrome and firefox which other
// var isChrome = !!window.chrome && !!window.chrome.webstore;
// var isFirefox = typeof InstallTrigger !== 'undefined';
//
// if (isChrome || isFirefox) {
//     console.log('is chrome')
//     var taskContent = document.getElementsByClassName('task-content');
//     for (let i = 0; taskContent.length > i; i++) {
//         console.log(taskContent[i].style)
//         taskContent[i].style.transform = "translateY(-10px)";
//     }
// }
