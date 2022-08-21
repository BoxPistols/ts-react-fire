import { Button, FormControl, TextField, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
// useState
import auth from '../firebase'
import styles from '../style/Login.module.css'

export const Login = (props: any) => {
  const [isLogin, SetIsLogin] = useState(true)
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push('/')
    })
    return () => unSub()
  }, [props.history])

  return (
    <>
      <div className={styles.login}>
        <h2>{isLogin ? 'Login' : 'Resister'}</h2>
        <br />
        <FormControl>
          <TextField
            name="email"
            label="E-mail"
            value={email}
            className={styles.mt}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              SetEmail(e.target.value)
            }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            className={styles.mt}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              SetPassword(e.target.value)
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={
              isLogin
                ? async () => {
                    try {
                      await auth.signInWithEmailAndPassword(email, password)
                      props.history.push('/')
                      // alert(password)
                    } catch (error: any) {
                      alert(error.message)
                    }
                  }
                : async () => {
                    try {
                      await auth.createUserWithEmailAndPassword(email, password)
                      props.history.push('/')
                    } catch (error: any) {
                      alert(error.message)
                    }
                  }
            }
          >
            {isLogin ? 'Login' : 'Resister'}
          </Button>
          <Typography align="center">
            <span onClick={() => SetIsLogin(!isLogin)}>
              {isLogin ? 'Create New Accont' : 'Back To Login'}
            </span>
          </Typography>
        </FormControl>
      </div>
    </>
  )
}
