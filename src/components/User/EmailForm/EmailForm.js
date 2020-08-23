import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import './EmailForm.scss'

export default function EmailForm(props) {
    const { currentEmail, setShowModal, refetch } = props
    const [updateUser] = useMutation(UPDATE_USER)
    const formik = useFormik({
        initialValues: {
            email: currentEmail || ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required()
        }),
        onSubmit: async(formData) => {
            console.log(formData)

            try {
                let result = await updateUser({
                    variables: {
                        input: formData
                    }
                })

                if (!result.data.updateUser) return toast.error('No se pudo actualizar el email')

                setShowModal(false)
                refetch()
                return toast.success('Email actualizado correctamente')
            } catch (error) {

                toast.error('Error al actualizar email')
            }
        }
    })

    return (
        <Form className='email-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name='email'
                placeholder='Ingresa el nuevo email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
            />
            <Button type='submit' className='btn-submit'>Actualizar</Button>
        </Form>
    )
}
