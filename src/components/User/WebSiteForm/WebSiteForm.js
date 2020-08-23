import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import './WebSiteForm.scss'

export default function WebSiteForm(props) {

    const { setShowModal, currentWebSite, refetch } = props

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            WebSite: currentWebSite || ''
        },
        validationSchema: Yup.object({
            WebSite: Yup.string().required()
        }),
        onSubmit: async(formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            website: formData.WebSite
                        }
                    }
                })

                if (!result.data.updateUser) return toast.error('No se pudo actualizar el sitio web')

                setShowModal(false)
                refetch()
                return toast.success('Sitio web actualizado correctamente')

            } catch (error) {
                toast.error('Error al actualzar el sitio web')
            }
        }
    })

    return (
        <Form className='form-website' onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder='Website'
                name='WebSite'
                value={formik.values.WebSite}
                onChange={formik.handleChange}
            />
            <Button type='submit' className='btn-submit'>Actualizar</Button>
        </Form>
    )
}
