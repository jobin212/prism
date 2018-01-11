const firebase = require('firebase')
require('firebase/firestore')
require('./setup')(firebase)
var cf = require('color-functions');

const db = firebase.firestore()

const colors = require('../data/colors')

// TODO: Seed the database with colors



colors.map( (c) => {

    const {name, color: {r,g, b}} = c;
    var id = cf.rgb2hex(r, g , b);

    db.collection('colors').doc(id).set({
        red : r,
        green: g,
        blue: b,
        names: {
            [name]: true
        },
    }, {merge: true})
    .then(() => {
        console.log(`wrote ${id} as ${name}`)
    })
    .catch(console.error);
})


