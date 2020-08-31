import React, { useCallback, useState } from 'react'
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { PUBLISH } from '../../../gql/post'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import './ModalUpload.scss'

export default function ModalUpload({ show, setShow }) {

    const [fileUpload, setFileUpload] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [publish] = useMutation(PUBLISH)

    const onClose = () => {
        setIsLoading(false)
        setFileUpload(null)
        setShow(false)
    }

    const onDrop = useCallback(
        (acceptedFile) => {
            const file = acceptedFile[0]
            setFileUpload({
                type: 'image',
                file,
                preview: URL.createObjectURL(file)
            })
        }
    )

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const onPublish = async () => {
        try {
            setIsLoading(true)
            const result = await publish({
                variables: {
                    file: fileUpload.file
                }
            })
            console.log(result)
            if (!result.data.publish.status) {
                toast.error('No se pudo crear la publicación')
                isLoading(false)
            } else {
                onClose()
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <Modal size='small' open={show} onClose={onClose} className='modal-upload'>
            <div {...getRootProps()} className='dropzone' style={fileUpload && { border: 0 }}>
                <Icon name='cloud download' />
                <p>Arrasta tu foto para publicar</p>
                <input {...getInputProps()} />
            </div>
            {fileUpload?.type === 'image' && (
                <div className='image' style={{ backgroundImage: `url("${fileUpload.preview}")` }} />
            )}
            {fileUpload && (
                <Button className='btn-upload btn-action' onClick={onPublish}>Publicar</Button>
            )}
            {isLoading && (
                <Dimmer active className='publishing'>
                    <Loader />
                    <p>Publicando...</p>
                </Dimmer>
            )}
        </Modal>
    )
}
