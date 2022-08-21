import { Button, FormControl, TextField, Typography } from '@material-ui/core'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import styles from '../style/Login.module.css'

import { useNavigate } from 'react-router-dom'

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      // user && props.history.push('/')
      user && navigate('/')
    })
    return () => unSub()
  }, [navigate, props.history])

  const moveRoot = () => {
    navigate('/')
  }

  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await signInWithEmailAndPassword(auth, email, password)
                  // props.history.push('/')
                  moveRoot()
                } catch (error: any) {
                  alert(error.message)
                }
              }
            : async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await createUserWithEmailAndPassword(auth, email, password)
                  // props.history.push('/')
                  moveRoot()
                } catch (error: any) {
                  alert(error.message)
                }
              }
        }
      >
        {isLogin ? 'login' : 'register'}
      </Button>
      <br />
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create new account ?' : 'Back to login'}
        </span>
      </Typography>
    </div>
  )
}

export default Login
