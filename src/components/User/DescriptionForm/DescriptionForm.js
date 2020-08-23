import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import './DescriptionForm.scss'

export default function DescriptionForm(props) {

    const { setShowModal, currentDescription, refetch } = props

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            description: currentDescription || ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required()
        }),
        onSubmit: async(formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: formData
                    }
                })

                if (!result.data.updateUser) return toast.error('No se pudo actualizar la descripcón')

                setShowModal(false)
                refetch()
                return toast.success('Descripción actualizada correctamente')

            } catch (error) {
                toast.error('Error al actualzar la biografía')
            }
        }
    })

    return (
        <Form className='form-description' onSubmit={formik.handleSubmit}>
            <Form.TextArea
                rows={6}
                placeholder='Description'
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
            />
            <Button type='submit' className='btn-submit'>Actualizar</Button>
        </Form>
    )
}
