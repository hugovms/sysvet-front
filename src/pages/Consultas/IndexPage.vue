  <template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-md-12 text-center">
        <h5 class="q-ma-xs">Agendar Consulta</h5>
      </div>
      <div class="col-md-6 q-pa-md">
        <q-uploader
          @uploaded="arquivoEnviado"
          url="http://localhost:8000/api/upload"
          class="full-width"
          max-files="1"
          auto-upload
        />
      </div>
      <div class="col-md-6 q-pa-md">
        <q-input filled v-model="form.data" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.data">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-4 q-pa-sm">
        <q-select label="Selecione o Cliente" v-model="form.cliente"  :options="clientesOptions" filled/>
      </div>

      <div class="col-md-4 q-pa-sm">
        <q-select label="Selecione o Veterinário" v-model="form.veterinario"  :options="veterinarioOptions" filled/>
      </div>

      <div class="col-md-4 q-pa-sm">
        <q-select label="Selecione o Animal" v-model="form.animal" :options="animalOptions" filled/>
      </div>

      <div class="col-md-12 q-pa-sm">
        <q-input label="Valor (R$)" filled v-model="form.valor"/>
      </div>

      <div class="col-md-12 q-pa-sm">
        <q-editor v-model="form.descricao" min-height="5rem" />
      </div>

      <div class="col-md-12 q-pa-sm">
        <q-btn color="green-10" @click="createConsulta" label="AGENDAR CONSULTA" class="full-width"/>
      </div>
    </div>




  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import AnimalService from '../../services/AnimalService'
import UserService from 'src/services/UserService';
import ConsultaService from 'src/services/ConsultaService';

import Swal from 'sweetalert2';
export default{
  setup(){
    const $q = useQuasar()
    const form = ref({
      imagem: null,
      animal: null,
      veterinario: null,
      data: null,
      cliente: null,
      descricao: null,
      valor: null,
    })
    return {
      veterinarioOptions: ref([]),
      animalOptions: ref([]),
      clientesOptions: ref([]),
      date: ref(''),
      editor: ref(''),
      form,
      $q,
    }
  },
  mounted(){
    this.getAnimais();
    this.getVeterinarios();
    this.getClientes();
  },
  methods: {
    async createConsulta(){
      console.log(this.form)
      if(
         this.form.imagem == null ||
         this.form.animal == null ||
         this.form.veterinario == null ||
         this.form.data == null ||
         this.form.descricao == null ||
         this.form.valor == null ||
         this.form.cliente == null
      ){
        Swal.fire({
          title: 'Erro no formulário!',
          text: 'Por favor, preencha todas as informações corretamente',
          icon: 'error'
        })
        return;
      }

      if(this.form.valor <= 0){
        Swal.fire({
          title: 'Erro no formulário!',
          text: 'O valor da consulta deve ser maior que zero!',
          icon: 'error'
        })
        return;
      }

      Swal.fire({
        title: "Você tem certeza?",
        text: "Ao continuar você confirma todas as informações!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, agendar consulta!",
        cancelButtonText: 'Não'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await ConsultaService.createConsulta(this.form);
          if(res.status == 200){
            Swal.fire({
              title: "Sucesso!",
              text: "Sua consulta foi agendada com sucesso!",
              icon: "success"
            });
          }else{
            Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao agendar a consulta, por favor tente novamente mais tarde.',
              icon: 'error'
            })
          }

        }
      });
      console.log(this.form)
    },
    async getAnimais(){
      const res = await AnimalService.listarTudo();
      this.animalOptions = res.data.map( (item) => {
        return { label: item.nome, value: item.id}
      })

    },
    async getVeterinarios(){
      const res = await UserService.listarTudo()
      this.veterinarioOptions = res.data.map((item) => {
        return {label: item.name, value: item.id}
      })
    },
    async getClientes(){
      const res = await UserService.listarTudo()
      this.clientesOptions = res.data.map((item) => {
        return {label: item.name, value: item.id}
      })
    },
    arquivoEnviado(info){
      const formatedData = JSON.parse(info.files[0].xhr.response);
      this.form.imagem = formatedData.file;
      this.$q.notify({
        'type': 'positive',
        'message': 'O arquivo foi enviado com sucesso!',
        'position': 'top-right'
      })
    },
  }
};
</script>
