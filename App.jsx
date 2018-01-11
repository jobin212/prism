// db without {} using default
// {} check the export 
import React from 'react'
import {auth, db} from './fire'

auth.onAuthStateChanged(user => {
    console.log('Currently logged in user is:', user)
    if(!user) 
        auth.signInAnonymously();
}) 

let x = {foo: 'hello', y:3}
let y = {... x, hello: 'world', foo : 5}

//y => {foo:5, hello: 'world', y:3}

// export default () => '🔥 Ready.'
export default class Colors extends React.Component {

    // componentDidMount things we want to listening
    componentWillMount(){
        this.unsubscribe = 
            db.collection('colors5')
                .orderBy('hue')
                .onSnapshot(snap => 
                    this.setState({
                        colors: snap.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    }))

        this.unsubscribeAuth = 
            auth.onAuthStateChanged(user => this.setState({uid: user && user.id}))
    }



    // stop listening
    componentWillUnmount(){
        this.unsubscribe()
        this.unsubscribeAuth()
    }

    userLiked(id) {
        const {uid} = this.state
        if(!uid) return
        db.collection('users')
            .doc(uid)
            .set({
                faves: {
                    [id]: true,
                }
            }, {merge: true})
    }


    render(){
        if(!this.state){
            return "loading..."
        }
        const {colors} = this.state
        if(!colors) return 'Loading...'
        // show everything return <pre>{JSON.stringify(this.state,0,2)}</pre>
        return <div style ={{
            display:'flex',
            flexFlow:'row wrap',
        }}> {
            colors.map(color => 
            <div style={{
                width:'250px',
                height:'250px',
                margin: '9px',
                backgroundColor:rgb(color)
            }}
                onClick = { () => this.userLiked(color.id)}
            >
            <pre>{JSON.stringify(color.names,0,2)}</pre>
            hsl({color.hue}, {color.saturation}, {color.luminance})
        </div>)
    }</div>
    }
}

const rgb = color => `rgb(${color.red},${color.blue},${color.green}`