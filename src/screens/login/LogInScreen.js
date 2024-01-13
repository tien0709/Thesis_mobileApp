import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View,  Button} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Logo from '../login/logo'
import  emailValidator  from '../../helpers/emailValidator'
import  passwordValidator  from '../../helpers/passwordValidator'

import { checkAccount } from "../../data/MockDataAPI";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else if(!checkAccount(email.value, password.value)) {
      setEmail({ ...email, error: 'Email hoặc mật khẩu không đúng' }) 
      return;
    }
    /*navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
      params: {
        // Thêm các prop của bạn vào đây
        email: email.value,
      },
    })*/
    const mail = email.value
    navigation.navigate('Home',{email: mail});

  }

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>WELCOME BACK TO SMART HOME</Text>
      <Text style={styles.text}>Let’s sign you in</Text>
      <View style={styles.emailContainer} >
        <TextInput
          style={styles.email}
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.password}
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          //onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer} >
        <Button title="Login" titleStyle={styles.button} mode="contained" onPress={onLoginPressed}>
        </Button>
      </View>
    </View>
  )
}

