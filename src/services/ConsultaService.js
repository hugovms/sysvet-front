import client from './http'
// import Swal from 'sweetalert2'
const ConsultaService = {
  async createConsulta(data){
    return client.post('consultas/create-consulta', data).then(( response) => {
      return response
    }).catch(( error ) => {
      console.log('Erro ao criar consulta!', error)
      return error
    })
  }
}

export default ConsultaService
