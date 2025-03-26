<template>
  <q-page >
    <div class="q-pa-md">
      <q-card class="q-pa-md q-pb-xl">
        <q-card-header >
          <q-toolbar-title>
            <q-icon name="fa fa-dog" class="q-mr-sm" />
            Criar Animal
          </q-toolbar-title>
          </q-card-header>
        <q-card-content>
          <div class="row full-width">
            <q-form
            class="row full-width"
             @submit="saveData()"
            >
            <div class="col-md-12 q-pa-xs q-mt-md q-mb-md">
              <q-uploader
                  @uploaded="arquivoEnviado()"
                  url="http://localhost:8000/api/upload"
                  class="full-width"
                />
            </div>
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
                  <q-select
                    :rules="[ val => val && val.length > 0 || 'A raça não pode ser vazio!']"
                    outlined
                    v-model="form.raca"
                    :options="optionsRaca"
                  />
              </div>
              <div class="col-md-3 col-xs-3 q-pa-xs">
                  <q-input
                          lazy-rules
                          :rules="[val => val && val.length > 0 || 'A idade não pode ser vazia!']"
                          mask="##"
                          label="Idade"
                          suffix="Anos"
                          type="text"
                          v-model="form.telefone" outlined/>
              </div>
              <div class="col-md-3 col-xs-3 q-pa-xs">
                  <q-input
                            lazy-rules
                            :rules="[val => val && val.length > 0 || 'O peso não pode ser vazio!']"
                            label="Peso"
                            type="text"
                            mask="###"
                            suffix="Kg"
                            v-model="form.peso"
                            outlined/>
              </div>
              <div class="col-md-6 col-xs-6 q-pa-xs">
                  <q-select
                    :rules="[ val => val && val.length > 0 || 'O dono não pode ser vazio!']"
                    outlined
                    v-model="form.dono"
                    :options="optionsDono"
                  />
              </div>
              <div class="col-md-12 col-xs-3 q-pa-xs">
                  <q-input
                            lazy-rules
                            :rules="[val => val && val.length > 0 || 'A descrição não pode ser vazio!']"
                            label="Descrição"
                            type="text"
                            v-model="form.decricao"
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
import AnimalService from 'src/services/AnimalService';
import UserService from 'src/services/UserService'


export default {
  setup () {
    const optionsRaca = [
        'Labrador',
        'Pinscher',
        'Maltês',
        'Pastor Alemão'
    ]

    const form = ref({
      imagem: '',
      nome: '',
      tipo_animal: '',
      raca: 'Selecione....',
      idade: '',
      peso: '',
      descricao: '',
      dono_id: '',
    })
      return {
        form,
        optionsRaca,
        optionsDono: ref([])
      }
  },
  mounted(){
    this.getUsers()
  },
  methods: {
    arquivoEnviado(){
      alert('Imagem enviada com sucesso!');
    },
    // axios
    async getUsers(){
      const res = await UserService.listarTudo();
      //foreach com retorno
      this.optionsDono = res.data.map( (item) => {
        // { label: 'Gustavo', value: 1 }
        return { label: item.name, value: item.id }
      })
    },
    async saveData () {
      const response = await AnimalService.criar(this.form)
      if(response.status == '201'){
        this.$router.push('/animais')
      }
    }
  }
};
</script>
