import client from './http'
import Swal from 'sweetalert2'
const AnimalService = {
  async listarTudo () {
    // get http://localhost:8000/api/animais
    return await client.get('/animais').then(( response) => {
      return response.data
    }).catch(( error ) => {
      return error
    })
  },
  async criar(data){
    //axios POST em 127.0.0.1:8000/api/animais/criar
    return await client.post('/animais/criar', data).then( ( response ) => {
      Swal.fire({
        title: "Animal criado com sucesso!",
        icon: "success",
        timer: 2000,
      });
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao criar o Animal! ',
        text: error.response.data.message,
        icon: "error"
      });
      console.log('Deu ruim ao criar', error);
      return error;
    })
  },
  async atualizar(id, data){
    //POST /Animals/atualizar/1
    return await client.post('/animais/atualizar/' + id , data).then( ( response ) => {
      Swal.fire({
        title: "Animal atualizado com sucesso!",
        icon: "success",
        timer: 2000,
      });
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao atualizar o Animal! ',
        text: error.message,
        icon: "error"
      });
      console.log('Deu ruim ao atualizar', error);
      return error;
    })
  },
  async mostrar(id){
    return await client.get(`/animais/${id}`).then((response) => {
      console.log('USUARIO', response)
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao listar o Animal! ',
        text: error.message,
        icon: "error"
      });
      return error;
    })
  },
  async deletar(id){
    return await client.delete('/animais/' + id).then((response) => {
      return response;
    }).catch((error) => {
      Swal.fire({
        title: 'Erro ao remover o Animal! ',
        text: error.message,
        icon: "error"
      });
      return error;
    })
  }
}

export default AnimalService
