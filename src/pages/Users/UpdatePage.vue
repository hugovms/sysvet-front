<template>
  <q-page >
    <div class="q-pa-md">
      <h6 class="q-ma-xs">Atualizar Usuário #{{ id }}</h6>
      <div class="row full-width">
        <div class="col-md-6 col-xs-6 q-pa-xs">
            <q-input label="Nome" type="text" v-model="form.nome" outlined/>
        </div>
        <div class="col-md-6 col-xs-6 q-pa-xs">
            <q-input label="Email" type="text" v-model="form.email" outlined/>
        </div>
        <div class="col-md-6 col-xs-6 q-pa-xs">
            <q-input mask="(##) #####-####" label="Telefone" type="text" v-model="form.telefone" outlined/>
        </div>
        <div class="col-md-6 col-xs-6 q-pa-xs">
            <q-input label="Senha" type="text" v-model="form.senha" outlined/>
        </div>
        <div class="col-md-12 col-xs-12 q-pa-xs">
          <q-btn @click="updateData()" color="green-10" label="ATUALIZAR" class="full-width" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import UserService from 'src/services/UserService';

export default {
  setup () {
    const form = ref({
      nome: '',
      telefone: '',
      email: '',
      senha: '',
    })
      return {
        form,
        id: ref(null)
      }
  },
  async mounted(){
    this.id = this.$route.params.id
    const response = await UserService.mostrar(this.id)
    this.form.nome = response.data.name
    this.form.email = response.data.email
  },
  methods: {
    async updateData () {
      const response = await UserService.atualizar(this.id, this.form)
      if(response.status == '200'){
        this.$router.push('/usuarios')
      }
    }
  }
};
</script>
