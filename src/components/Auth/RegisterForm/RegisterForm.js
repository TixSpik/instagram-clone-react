import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REGISTER_USER } from '../../../gql/user'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import "./RegisterForm.scss"

export default function RegisterForm(props) {
    const { setShowLogin } = props

    const [register] = useMutation(REGISTER_USER)

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio").required('Campo obligatorio'),
            email: Yup.string().email('Email no valido').required('Campo obligatorio'),
            password: Yup.string().required('Campo obligatorio').oneOf([Yup.ref('passwordConfirm')], 'La contraseña no son iguales'),
            passwordConfirm: Yup.string().required('Campo obligatorio').oneOf([Yup.ref('password')], 'La contraseña no son iguales')
        }),
        onSubmit: async (formData, {setValues}) => {
            try {
                const newUser = formData

                delete newUser.passwordConfirm

                const result = await register({
                    variables: {
                        input: newUser
                    }
                })

                toast.success('Usuario Registrado')
                setShowLogin(true)
            } catch (error) {
                setValues({...formData, password: "", passwordConfirm: "" })
                toast.error(error.message)
            }
        }
    })

    function initialValue() {
        return {
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: ""
        }
    }

    return (
        <>
            <h2 className='register-form-title'>Registrate 👋</h2>
            <Form className='register-form' onSubmit={formik.handleSubmit}>
                <Form.Input
                    type='text'
                    placeholder="Nombre y apellidos"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
                <Form.Input
                    type='email'
                    placeholder="Correo electronico"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Form.Input
                    type='text'
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                />
                <Form.Input
                    type='password'
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <Form.Input
                    type='password'
                    placeholder="Confirmar contraseña"
                    name="passwordConfirm"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    error={formik.errors.passwordConfirm}
                />
                <Button type='submit' className='btn-submit'>Registrar Cuenta</Button>
            </Form>
        </>
    )
}
