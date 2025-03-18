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
  async criar(data){
    //axios POST em 127.0.0.1:8000/api/usuarios/criar
    return await client.post('/usuarios/criar', data).then( ( response ) => {
      alert('Usuário criado com sucesso!')
      return response;
    }).catch((error) => {
      alert('Erro ao criar o usuário! ' + error.message)
      console.log('Deu ruim ao criar', error);
      return error;
    })
  },
  async atualizar(id, data){
    //POST /usuários/atualizar/1
    return await client.post('/usuarios/atualizar/' + id , data).then( ( response ) => {
      alert('Usuário atualizado com sucesso!')
      return response;
    }).catch((error) => {
      alert('Erro ao atualizar o usuário! ' + error.message)
      console.log('Deu ruim ao atualizar', error);
      return error;
    })
  },
  async mostrar(id){
    return await client.get(`/usuarios/${id}`).then((response) => {
      console.log('USUARIO', response)
      return response;
    }).catch((error) => {
      alert('Erro ao obter o usuário ' + id);
      return error;
    })
  },
  async deletar(id){
    return await client.delete('/usuarios/' + id).then((response) => {
      return response;
    }).catch((error) => {
      alert('Erro ao remover o usuário ' + id)
      return error;
    })
  }
}

export default UserService
