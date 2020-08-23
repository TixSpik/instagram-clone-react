import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../../gql/user'
import { setToken, decodeToken } from '../../../utils/token'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import './LoginForm.scss'

export default function LoginForm() {

    const [login] = useMutation(LOGIN_USER)

    const { setUser } = useAuth()

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            email: Yup.string().email("Email no valido").required('Campo requerido'),
            password: Yup.string().required('Campo requerido'),
        }),
        onSubmit: async (formData) => {
            try {
                const result = await login({
                    variables: {
                        input: formData
                    }
                })

                const { token } = result.data.login
                setToken(token)
                setUser(decodeToken(token))
            } catch (error) {
                toast.error(error.message)
            }
        }

    })

    function initialValue() {
        return {
            email: "",
            password: ""
        }
    }

    return (
        <>
            <h2 className='login-title'>Inicia sesión 😎</h2>
            <Form className='login-form' onSubmit={formik.handleSubmit}>
                <Form.Input
                    type='text'
                    placeholder='Correo electronico'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Input
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <Button type='submit' className='btn-submit'>Iniciar sesión</Button>
            </Form>
        </>
    )
}
