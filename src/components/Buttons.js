import React from 'react';
import{
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';


const styles = StyleSheet.create({
    button:{
        fontSize: 40,
        height: Dimensions.get('window').height / 8,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operationButton:{
        color: "#fff",
        backgroundColor: 'rgba(255,0,0,0.3)',
    },
    buttonDoubleSpace:{
        width: (Dimensions.get('window').width / 4)*2,
    },
    buttonTripleSpace:{
        width: (Dimensions.get('window').width / 4)*3
    }
})

export default props =>{
    //Array dos styles que o botão pode receber
    const stylesButton = [styles.button];
    //Se se passado double como props, adicionar à lista de styles o style buttonDoubleSpace
    if(props.double) stylesButton.push(styles.buttonDoubleSpace);
    if(props.triple) stylesButton.push(styles.buttonTripleSpace); 
    if(props.operation) stylesButton.push(styles.operationButton);
    return(
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}