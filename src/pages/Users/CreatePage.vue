<template>
  <q-page >
    <div class="q-pa-md">
      <q-card class="q-pa-md q-pb-xl">
        <q-card-header >
          <q-toolbar-title>
            <q-icon name="person_add" class="q-mr-sm" />
            Criar Usuário
          </q-toolbar-title>
          </q-card-header>
        <q-card-content>
          <div class="row full-width">
            <q-form
            class="row full-width"
             @submit="saveData()"
            >
              <div class="col-md-6 col-xs-6 q-pa-xs">
                  <q-input
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'O nome não pode ser vazio!']"
                          label="Nome"
                          type="text"
                          v-model="form.nome"
                          outlined/>
              </div>
              <div class="col-md-6 col-xs-6 q-pa-xs">
                  <q-input
                            lazy-rules
                            :rules="[val => val && val.length > 0 || 'O e-mail não pode ser vazio!']"
                            label="Email"
                            type="text"
                            v-model="form.email"
                            outlined
                            />
              </div>
              <div class="col-md-6 col-xs-6 q-pa-xs">
                  <q-input
                          lazy-rules
                          :rules="[val => val && val.length > 0 || 'O telefone não pode ser vazio!']"
                          mask="(##)#####-####"
                          label="Telefone"
                          type="text"
                          v-model="form.telefone" outlined/>
              </div>
              <div class="col-md-6 col-xs-6 q-pa-xs">
                  <q-input
                            lazy-rules
                            :rules="[val => val && val.length > 0 || 'A senha não pode ser vazia!']"
                            label="Senha"
                            type="text"
                            v-model="form.senha"
                            outlined/>
              </div>
              <div class="col-md-12 col-xs-12 q-pa-xs">
                <q-btn
                        type="submit"
                        color="green-10"
                        label="SALVAR"
                        class="full-width" />
              </div>
            </q-form>
          </div>
        </q-card-content>
      </q-card>
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
        form
      }
  },
  methods: {
    // axios
    async saveData () {
      const response = await UserService.criar(this.form)
      if(response.status == '201'){
        this.$router.push('/usuarios')
      }
    }
  }
};
</script>
