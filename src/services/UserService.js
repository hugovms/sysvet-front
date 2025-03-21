import client from './http'
import Swal from 'sweetalert2'
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
      Swal.fire({
        title: "Usuário criado com sucesso!",
        icon: "success",
        timer: 2000,
      });
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao criar o usuário! ',
        text: error.response.data.message,
        icon: "error"
      });
      console.log('Deu ruim ao criar', error);
      return error;
    })
  },
  async atualizar(id, data){
    //POST /usuários/atualizar/1
    return await client.post('/usuarios/atualizar/' + id , data).then( ( response ) => {
      Swal.fire({
        title: "Usuário atualizado com sucesso!",
        icon: "success",
        timer: 2000,
      });
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao atualizar o usuário! ',
        text: error.message,
        icon: "error"
      });
      console.log('Deu ruim ao atualizar', error);
      return error;
    })
  },
  async mostrar(id){
    return await client.get(`/usuarios/${id}`).then((response) => {
      console.log('USUARIO', response)
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao listar o usuário! ',
        text: error.message,
        icon: "error"
      });
      return error;
    })
  },
  async deletar(id){
    return await client.delete('/usuarios/' + id).then((response) => {
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao remover o usuário! ',
        text: error.message,
        icon: "error"
      });
      return error;
    })
  }
}

export default UserService
