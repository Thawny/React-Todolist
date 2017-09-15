import style from "../scss/global.scss"
import React from "react";
import ReactDom from "react-dom";
import Layout from "./components/Layout";

console.log('hello')

function renderApp(todos) {
    ReactDom.render(
      <Layout todos={todos}/>,
      document.getElementById('app')
    );
}

var todos = {
    lundi : ["faire la lessive", "promener le chier"],
    mardi: ["acheter des yaourts"],
    mercredi: [],
    jeudi: ["passer à la pharmacie"],
    vendredi: [],
    samedi: [],
    dimanche: ["se reposer", "aller au cinéma", "aller au resto"]
}

renderApp(todos);
