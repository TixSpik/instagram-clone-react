import React, { useCallback, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user'
import { toast } from 'react-toastify'
import './AvatarForm.scss'

export default function AvatarForm(props) {

    const { setShowModal, auth, getUser } = props
    console.log(getUser)
    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                }
            })

            cache.writeQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                },
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }
                }
            })
        }
    })

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            })

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: "" }
                }
            })
        }
    })

    const [isLooading, setIsLooading] = useState(false)

    const onDrop = useCallback(
        async (acceptedFile) => {
            const file = acceptedFile[0]
            setIsLooading(true)

            try {
                const result = await updateAvatar({
                    variables: {
                        input: {
                            urlAvatar: getUser.avatar ? getUser.avatar : '',
                            file
                        }
                    }
                })
                const { data } = result

                if (!data.updateAvatar.status) {
                    toast.error('Error al actualizar avatar')
                    setIsLooading(false)
                } else {
                    setIsLooading(false)
                    setShowModal(false)
                    // window.location.reload(false)
                }

            } catch (error) {
                console.log(error)
                setIsLooading(false)
            }

        },
        [],
    )

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const onDeleteAvatar = async () => {
        try {
            const result = await deleteAvatar({
                variables: {
                    input: {
                        urlAvatar: getUser.avatar ? getUser.avatar : ''
                    }
                }
            })
            const { data } = result

            if (!data.deleteAvatar) {
                toast.warn('Error al borrar avatar')
            } else {
                setShowModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='avatar-form'>
            <Button {...getRootProps()} loading={isLooading}>Cargar foto</Button>
            <Button onClick={onDeleteAvatar}>Eliminar foto</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
