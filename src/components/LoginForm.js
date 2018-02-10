import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser, loginUserFail } from '../actions'

class LoginForm extends Component {

  onEmailChange(text){
    this.props.emailChanged(text)
  }
  onPasswordChange(text){
    this.props.passwordChanged(text)
  }
  onButtonPress(){
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }
  renderError(){
    if(this.props.error){
      return (
        <View style={{backgroundColor:'white'}}>
          <Text style={ styles.errorTextStyle }>
            { this.props.error }
          </Text>
        </View>
      )
    }
  }
  renderButton(){
    if(this.props.loading){
      return (
        <Spinner size='large'/>
      )
    }
    return (
      <Button onPress={ this.onButtonPress.bind(this) }>
        Login
      </Button>
    )
  }

  render(){
    return(
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeHolder="email@gmail.com"
            onChangeText ={ this.onEmailChange.bind(this) }
            value ={ this.props.email }
            />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeh older='password'
            onChangeText={ this.onPasswordChange.bind(this) }
            value ={ this.props.password }
            />
        </CardSection>

          { this.renderError() }

        <CardSection>

          { this.renderButton() }

        </CardSection>
      </Card>
    )
  }
}

mapStateToProps = state => {
  const { email, password, error, loading } = state.auth
  return {
    email,
    password,
    error,
    loading
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, loginUserFail })(LoginForm)

const styles = {
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color:'red',
  }
}