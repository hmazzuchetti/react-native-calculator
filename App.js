import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from './src/components/Buttons';
import Display from './src/components/Display'

const initialState ={
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {
  state = { ...initialState  }

  addDigit = addedDigit =>{
    // Set clear display as true if the current value os the display is 0 or if the AC button was pressed
    // This way, when the user add a new digit it will clear the last digit
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;


    // If the user press the . button AND clearDisplay is false AND the display already shows a .
    // Which means that we already have a float number on display, then -> do nothing.
    if(addedDigit === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return
    }
    
    // Set the current value to none if clearDisplay is true, else set as the displayed value
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    // Append the new digit to the displayed digit
    const displayValue = currentValue + addedDigit;
    // set state's displayValue as this new above displayValue
    this.setState({ displayValue, clearDisplay: false });


    if(addedDigit !== "."){
      // set newValue as the new displayValue converted into float
      const newValue = parseFloat(displayValue);
      // Makes a copy of the values array
      const values = [...this.state.values];
      // Set the values of the "current" position as the newValue
      values[this.state.current] = newValue;
      this.setState({ values: values });
    } 

  }

  clearMemory = () =>{
    // Simply set the current state to the initial state
    this.setState({ ...initialState });
  }

  setOperation = operation =>{
    // If the user press a operation button, 
    // change the current evaluated number from 0 to 1, if the current evaluated number is 0
    if(this.state.current === 0){
      this.setState({ operation: operation, current: 1, clearDisplay: true })
    } else{
      const equals = operation === '=';
      const values = [...this.state.values];
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch(e){
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values
      });
    }
  }

render(){
  return (
    <SafeAreaView style={styles.container}>
      <Display value = {this.state.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={this.clearMemory}/>
        <Button label="/" operation onClick={this.setOperation}/>
        <Button label="7" onClick={this.addDigit}/>
        <Button label="8" onClick={this.addDigit}/>
        <Button label="9" onClick={this.addDigit}/>
        <Button label="*" operation onClick={this.setOperation}/>
        <Button label="4" onClick={this.addDigit}/>
        <Button label="5" onClick={this.addDigit}/>
        <Button label="6" onClick={this.addDigit}/>
        <Button label="-" operation onClick={ this.setOperation}/>
        <Button label="1" onClick={this.addDigit}/>
        <Button label="2" onClick={this.addDigit}/>
        <Button label="3" onClick={this.addDigit}/>
        <Button label="+" operation onClick={this.setOperation}/>
        <Button label="0" double onClick={this.addDigit}/>
        <Button label="." onClick={this.addDigit}/>
        <Button label="=" operation onClick={this.setOperation}/>
      </View>

    </SafeAreaView>
  );
}
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'

  }
});

