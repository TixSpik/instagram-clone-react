import { gql } from '@apollo/client'

export const PUBLISH = gql`
    mutation publish ($file: Upload){
      publish(file: $file){
        status,
        urlFile
      }
    }
`

export const GET_POSTS = gql`
  query getPosts($username: String!){
    getPosts(username: $username){
      id
      idUser
      typeFile
      file
    }
  }
`