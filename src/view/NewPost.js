import React from 'react'
import {View, Text, SafeAreaView} from 'react-native'
import AddNewPost from '../component/newPost/AddNewPost'
class NewPostScreen extends React.Component {
    
    // componentDidMount(){
    //     console.log(this.props.route.params.trace)
    // }
    render(){
        return(
        <SafeAreaView style={{backgroundColor:'black',flex:1}}>
            <AddNewPost navigation={this.props.navigation} trace={this.props.route.params.trace}/>
        </SafeAreaView>
    )
    }
    
}

export default NewPostScreen

