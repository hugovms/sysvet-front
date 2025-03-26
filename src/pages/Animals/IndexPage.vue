<template>
  <q-page >
    <div class="q-pa-md">
    <div class="row full-width">
      <q-btn color="blue" label="Criar Animal" icon="add" to="/animais/criar" />
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">Telefone</th>
          <th class="text-left">Criação</th>
          <th class="text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in users" :key="i">
          <td class="text-left">{{ item.id }}</td>
          <td class="text-left"> {{ item.name }}</td>
          <td class="text-left"> {{ item.email }}</td>
          <td class="text-left"> {{ item.created_at }}</td>
          <td class="text-left">
            <q-btn color="purple" icon="edit" :to="'/animais/editar/' + item.id" />
            <q-btn class="q-ml-sm" @click="deletar(item.id)" color="red" icon="delete" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  </q-page>
</template>

<script>
import AnimalService from 'src/services/AnimalService';
import { ref } from 'vue';
import Swal from 'sweetalert2'

export default{
  setup(){
    return {
      users: ref([])
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      const animais = await AnimalService.listarTudo()
      this.users = animais.data
    },
    async deletar(id){
      Swal.fire({
        title: "Você tem certeza?",
        text: "Essa ação será irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!"
      }).then( async (result) => {
        if (result.isConfirmed) {
          const response = await AnimalService.deletar(id)
          if(response.status == '200'){
            Swal.fire({
              title: "Removido com sucesso!",
              text: "O registro foi excluído.",
              icon: "success"
            });
          }else{
            Swal.fire({
              title: "Erro ao remover o item!",
              text: "O registro não foi excluído.",
              icon: "error"
            });
          }
          this.getData()

        }
      });

    }
  }
};
</script>
