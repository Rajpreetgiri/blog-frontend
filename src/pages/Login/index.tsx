import React, { useState } from 'react'
import AuthWrapper from '../../components/wrappers';

// ** Third-party
import { SubmitHandler, useForm } from "react-hook-form"


// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TLoginForm } from '../../types';
import { login } from '../../http';
import { useNavigate } from 'react-router-dom';


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))


const Login = () => {

  // ** Hooks
  const navigation = useNavigate()

  // ** State
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // form handler
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginForm>({
    shouldUseNativeValidation: true,
  })

  const onSubmit: SubmitHandler<TLoginForm> = async (data: any) => {
    setLoading(true)
    try {
      // console.log(data)
      const resp = await login(data)
      const { data: { username }, accessToken } = resp.data
      window.localStorage.setItem('accessToken', accessToken)
      window.localStorage.setItem('userData', JSON.stringify({username}))
      navigation('/')
      console.log(resp, "rep")
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }


  return (
    <Box className='content-center'>
      <AuthWrapper>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5, color: '#2f2b3dc7' }}>
                {`Welcome`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  mb: 1.75
                }}
              >
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  helperText={errors.email?.message || ''}
                  error={!!errors.email}
                  label="Email"
                  sx={{ width: "100%" }}
                  type='email'
                />

                <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    {...register('password', { required: "Password is required", minLength: 8 })}
                    error={!!errors.password}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {!!errors.password && (
                    <FormHelperText error>{errors.password.type ? "Password length minimum is 8" : errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button disabled={loading} fullWidth type='submit' variant='contained' sx={{ mb: 4, py: 1 }}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthWrapper>
    </Box>
  )
}

export default Login
