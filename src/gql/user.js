const { gql } = require("@apollo/client");

export const REGISTER_USER = gql`
    mutation register($input: UserInput){
        register(input: $input){
          id
          name
          password
          username
          createAt
        }
  }
`

export const LOGIN_USER = gql`
    mutation login($input: LoginInput){
    login(input: $input){
      token
    }
}
`

export const GET_USER = gql`
  query getUser($id: ID, $username: String ) {
    getUser(id: $id, username: $username){
      id
      name
      username
      email
      description
      website
      avatar
    }
}
`

export const UPDATE_AVATAR = gql`
    mutation updateAvtar($input: FileImage){
    updateAvatar(input: $input){
      status,
      urlAvatar
    }
  }
`

export const DELETE_AVATAR = gql`
    mutation deleteAvatar($input: AvatarInput){
    deleteAvatar(input: $input)
  }
`

export const UPDATE_USER = gql`
   mutation updateUser($input: UserUpdateInput){
   updateUser(input: $input)
  }
`

export const SEARCH = gql`
  query search($search: String){
    search(search: $search){
      name,
      username,
      avatar
    }
  }
`