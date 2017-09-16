var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const userTasks = {lundi : ['faire la lessive', 'promener le chier'],mardi: ['acheter des yaourts'],mercredi: [],jeudi: ['passer à la pharmacie'],vendredi: [],samedi: [],dimanche: ['se reposer', 'aller au cinéma', 'aller au resto']}
    res.render('index', { userTasks: JSON.stringify(userTasks) });
});

module.exports = router;
