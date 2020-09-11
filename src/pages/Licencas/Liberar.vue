<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="queue_play_next" class="text-primary"/>
      Licença</p>

    <div class="col-12 column">
      <div class="row q-col-gutter-xs">
        <q-input
          outlined
          dense
          v-model="codigo_cnpj"
          mask="##############"
          label="Buscar por Código ou CNPJ"
          class="col-4"
          :rules="[ val => val && val.length > 0 || 'Código ou CNPJ é obrigatório']"
        >
          <template v-slot:after>
            <q-btn
            label="Buscar"
            icon="search"
            color="orange"
            class="float-left"
             @click="BuscarCliente(codigo_cnpj)"
          />
          </template>
        </q-input>
        <p class="text-h5">&nbsp;&nbsp;{{dadoscliente}}</p>
      </div>
    </div>

      <br>

    <q-form  @submit="onSubmit" ref="myForm">
      <div class="col q-col-gutter-xs">
        <q-input
          outlined
          dense
          disable
          v-model="form.cdcliente"
          label="Código Cliente"
          style="max-width: 220px"
          :rules="[ val => !!val || 'Código do Cliente é Obrigatório']"
        >
        </q-input>
        <q-select
          outlined
          dense
          options-dense
          v-model="form.cdproduto"
          :options="modulos"
          map-options
          emit-value
          option-value="cdproduto"
          option-label="descricao"
          label="Módulo"
          style="max-width: 220px"
          :rules="[ val => !!val || 'Modulo é Obrigatório']"
        />
        <q-select
          outlined
          dense
          @input="setData"
          v-model="form.tipoliberacao"
          :options="tipoliberacao"
          map-options
          emit-value
          option-value="value"
          option-label="label"
          label="Tipo Liberação"
          style="max-width: 220px"
          bottom-slots
        />
        <q-input
          outlined
          dense
          :disable="disableData"
          v-model="form.data"
          label="Data"
          :mask="'##/##/####'"
          style="max-width: 220px"
          bottom-slots
        />
        <q-input
          outlined
          dense
          v-model="form.chave"
          label="Chave"
          style="max-width: 450px"
          :rules="[ val => val && val.length > 0 || 'Chave é obrigatório']"
        />

        <!--<q-input
          outlined
          dense
          v-model="chave"
          label="Código de LIberação"
          style="max-width: 450px"
        >
          <template v-slot:before>
          <q-btn
            label="Gerar Chave"
            icon="loop"
            color="secondary"
            class="float-left"
            type="submit"
          />
          </template>
        </q-input>-->
        <div class="row">
          <div class="col-12 q-gutter-sm">
            <q-btn
              label="Gerar Chave"
              icon="loop"
              color="secondary"
              class="float-left"
              type="submit"
            />
          </div>
        </div>
    </div>
    </q-form>

    <br>
    <div class="row">
      <div class="col-12 q-gutter-sm">
        <p class="text-h7">{{chaveliberacao}}</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Liberar',
  data () {
    return {
      form: {
        cdcliente: null,
        cdproduto: null,
        tipoliberacao: 0,
        data: '',
        chave: ''
      },
      codigo_cnpj: '',
      campobuscarcliente: '',
      dadoscliente: '',
      chaveliberacao: '',
      tipoliberacao: [
        { label: 'DEFINITIVO', value: 0 },
        { label: 'POR DATA', value: 1 }
      ],
      modulos: [''],
      disableData: true
    }
  },

  mounted () {
    this.getModulos()
  },

  methods: {
    setData () {
      if (this.form.tipoliberacao) {
        this.disableData = false
      } else {
        this.disableData = true
        this.form.data = ''
      }
    },
    onSubmit () {
      this.$axios.post('licenca', {
        ...this.form
      })
        .then((suc) => {
          const cor = suc.data.status === '200' ? 'positive' : 'negative'
          const msg = suc.data.status === '200' ? 'Licença Gerada com Sucesso' : suc.data.message
          const icone = suc.data.status === '200' ? 'check_circle_outline' : 'cancel'
          this.$q.notify({
            message: msg,
            icon: icone,
            color: cor,
            timeout: 200
          })
          if (suc.data.status === '200') {
            this.chaveliberacao = suc.data.message
            this.form.cdproduto = null
            // this.form.tipoliberacao = ''
            this.form.data = ''
            this.form.chave = ''
            this.$nextTick(() => {
              this.$refs.myForm.resetValidation()
            })
          } else {
            this.chaveliberacao = suc.data.message
          }
        })
        .catch((err) => {
          console.log(this.form)
          this.$q.notify({
            message: 'Erro ao Gerar Licença',
            icon: 'cancel',
            color: 'negative'
          })
          console.error('erro Gerar Licença', err)
        })
    },
    getModulos () {
      this.$axios.get('produtos?inativo=F')
        .then((suc) => {
          this.modulos = suc.data
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao carregar Modulos.',
            icon: 'cancel',
            color: 'negative'
          })
          console.error('erro getModulos', err)
        })
    },
    BuscarCliente (campo) {
      if (campo.length === 14) {
        this.campobuscarcliente = `clientes/cnpj_cpf/${campo}`
      } else {
        this.campobuscarcliente = `clientes/${campo}`
      }
      this.$axios.get(this.campobuscarcliente)
        .then((suc) => {
          this.dadoscliente = suc.data.nome
          this.form.cdcliente = suc.data.cdcliente
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao Buscar Cliente.',
            icon: 'cancel',
            color: 'negative'
          })
          console.error('erro BuscarCliente', err)
        })
    }
  }
}
</script>
