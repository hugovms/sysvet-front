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
        <q-input filled v-model="date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
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
        <q-select label="Selecione o Veterinário" filled/>
      </div>

      <div class="col-md-4 q-pa-sm">
        <q-select label="Selecione o Animal" filled/>
      </div>

      <div class="col-md-4 q-pa-sm">
        <q-input label="Valor (R$)" filled/>
      </div>

      <div class="col-md-12 q-pa-sm">
        <q-editor v-model="editor" min-height="5rem" />
      </div>

      <div class="col-md-12 q-pa-sm">
        <q-btn color="green-10" label="AGENDAR CONSULTA" class="full-width"/>
      </div>
    </div>




  </q-page>
</template>

<script>
import { ref } from 'vue';

export default{
  setup(){
    return {
      date: ref(''),
      editor: ref('')
    }
  },
  mounted(){
  },
  methods: {
  }
};
</script>
