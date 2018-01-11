// db without {} using default
// {} check the export 
import React from 'react'
import {db} from './fire'

// export default () => '🔥 Ready.'
export default class Colors extends React.Component {

    // componentDidMount things we want to listening
    componentWillMount(){
        this.unsubscribe = 
            db.collection('colors4')
                .onSnapshot(snap => 
                    this.setState({
                        colors: snap.docs.map(doc => doc.data())
                    }))
    }

    // stop listening
    componentWillUnmount(){
        this.unsubscribe()
    }


    render(){
        if(!this.state){
            return "loading..."
        }
        const {colors} = this.state
        // show everything return <pre>{JSON.stringify(this.state,0,2)}</pre>
        return <div style ={{
            display:'flex',
            flexFlow:'row wrap',
        }}> {
                colors.map(color => <div style={{
                width:'250px',
                height:'250px',
                margin: '9px',
                backgroundColor:rgb(color)
            }}>
            <pre>{JSON.stringify(color.names,0,2)}</pre>
            hsl({color.hue}, {color.saturation}, {color.luminance})
        </div>)
    }</div>
    }
}

const rgb = color => `rgb(${color.red},${color.blue},${color.green}`