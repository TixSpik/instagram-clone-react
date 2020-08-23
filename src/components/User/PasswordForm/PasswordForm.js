import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useApolloClient } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import './PasswordForm.scss'

//TODO: Eliminar la cache cuando se haga el cambio de contraseña

export default function PasswordForm() {
    const { logOut } = useAuth()
    const client = useApolloClient()
    const [updateUser] = useMutation(UPDATE_USER)
    const [eyeStateConfirm, setEyeStateConfrim] = useState(false)
    const [eyeNew, setEyeNew] = useState(false)
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('confirmPassword')]),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')]),
        }),
        onSubmit: async (formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }
                    }
                })

                if (!result.data.updateUser) {
                    toast.error('Error al cambiar la contraseña')

                } else {
                    toast.success('El cambio de contraseña fue exitoso')
                    client.clearStore()
                    logOut()
                }

            } catch (error) {
                toast.error('Error al cambiar la contraseña')
            }
        }
    })

    return (
        <Form className='password-form ' onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder='Contraseña actual'
                name='currentPassword'
                type='password'
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input
                action={{ icon: eyeNew ? 'eye' : 'eye slash', onClick: () => setEyeNew(!eyeNew) }}
                placeholder='Nueva contraseña'
                name='newPassword'
                type={eyeNew ? 'text' : 'password'}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />
            <Form.Input
                action={{ icon: eyeStateConfirm ? 'eye' : 'eye slash', onClick: () => setEyeStateConfrim(!eyeStateConfirm) }}
                placeholder='Repetir nueva contraseña'
                name='confirmPassword'
                type={eyeStateConfirm ? 'text' : 'password'}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.errors.confirmPassword && true}
            />
            <Button className='btn-submit' type='submit'>Actualizar</Button>
        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
}