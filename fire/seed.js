const firebase = require('firebase')
require('firebase/firestore')
require('./setup')(firebase)
var cf = require('color-functions');

const db = firebase.firestore()

const colors = require('../data/colors')
const small_colors = require('../data/small-colors')
const ref = db.collection('colors4')

// TODO: Seed the database with colors



small_colors.map( (c) => {

    const {name, color: {r,g, b}} = c;
    var id = cf.rgb2hex(r, g , b);
    const hsv = cf.rgb2hsv(r, g, b);
    const {h, s, l} = cf.hsv2hsl(hsv.h, hsv.s, hsv.v);

    ref.doc(id).set({
        red : r, green: g, blue: b,
        hue : h, saturation: s, luminance: l,
        names: {
            [name]: true
        },
    }, {merge: true})
    .then(() => {
        console.log(`wrote ${id} as ${name}`)
    })
    .catch(console.error);
})


