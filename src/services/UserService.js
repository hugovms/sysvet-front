import client from './http'

const UserService = {
  async listarTudo () {
    // get http://localhost:8000/api/usuarios
    return await client.get('/usuarios').then(( response) => {
      return response.data
    }).catch(( error ) => {
      return error
    })

  },
}

export default UserService
