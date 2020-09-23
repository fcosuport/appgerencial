<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="supervisor_account" class="text-primary"/>
    Cadastro de Cliente</p>

    <q-form @submit="onSubmit">
      <div class="row q-col-gutter-md">
        <q-input
          outlined
          dense
          disable
          v-model="form.cdcliente"
          label="Codigo"
          class="col-1"
          bottom-slots
        />
        <q-select
          outlined
          dense
          v-model="form.pessoa"
          :options="options"
          label="Tipo Pessoa"
          class="col-2"
          :rules="[ val => val && val.length > 0 || 'Tipo pessoa é obrigatório']"
        />
        <q-input
          outlined
          dense
          v-model="form.nome"
          label="Nome/Razão Social"
          class="col-5"
          @input="val => { form.nome = val.toUpperCase() }"
          :rules="[ val => val && val.length > 0 || 'Razão Social é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.fantasia"
          label="Nome Fantasia"
          class="col-4"
          @input="val => { form.fantasia = val.toUpperCase() }"
          :rules="[ val => val && val.length > 0 || 'Nome Fantasia é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.cnpj_cpf"
          :label=" form.pessoa === 'Fisica' ? 'CPF': 'CNPJ'"
          class="col-3"
          :mask="form.pessoa === 'Fisica' ? '###.###.###-##' : '##.###.###/####-##'"
          unmasked-value
          :rules="[ val => val && val.length > 0 || 'Cnpj/Cpf é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.ie_rg"
          label="Inscrição Estadual "
          class="col-3"
          @input="val => { form.ie_rg = val.toUpperCase() }"
          bottom-slots
        />

        <q-input
          outlined
          dense
          v-model="form.endereco"
          label="Endereço"
          class="col-6"
          @input="val => { form.endereco = val.toUpperCase() }"
          :rules="[ val => val && val.length > 0 || 'Endereço é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.numero"
          label="Número"
          class="col-1"
          @input="val => { form.numero = val.toUpperCase() }"
          :rules="[ val => val && val.length > 0 || 'Número é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.cep"
          label="Cep"
          :mask="'#####-###'"
          unmasked-value
          class="col-2"
          :rules="[ val => val && val.length > 0 || 'Cep é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.bairro"
          label="Bairro"
          class="col-3"
          @input="val => { form.bairro = val.toUpperCase() }"
          :rules="[ val => val && val.length > 0 || 'Bairro é obrigatório']"
        />

        <q-select
          outlined
          dense
          v-model="form.cdestado"
          :options="listaestados"
          map-options
          emit-value
          option-value="cdestado"
          option-label="sigla"
          @input="filtraCidades"
          label="Estado"
          class="col-2"
          :rules="[ val => val && val!=='' || 'Estado é obrigatório']"
        />

        <q-select
          outlined
          dense
          v-model="form.cdcidade"
          :options="listacidades"
          :disable="form.cdestado ? false : true"
          map-options
          emit-value
          option-value="cdcidade"
          option-label="nome"
          label="Cidades"
          class="col-4"
          :rules="[ val => val && val!=='' || 'Cidade é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.telefones"
          label="Telefone"
          class="col-3"
          :rules="[ val => val && val.length > 0 || 'Telefone é obrigatório']"
        />

        <q-input
          outlined
          dense
          v-model="form.email"
          label="E-mail"
          class="col-3"
          @input="val => { form.email = val.toLowerCase() }"
          :rules="[ val => val && val.length > 0 || 'E-mail é obrigatório']"
        />

        <q-input
          outlined
          dense
          disable
          v-model="form.datacadastro"
          label="Data Cadastro"
          class="col-2"
          bottom-slots
        />

        <q-input
          outlined
          dense
          disable
          v-model="form.dataalteracao"
          label="Data Alteração"
          class="col-2"
          bottom-slots
        />

        <q-select
          outlined
          dense
          v-model="form.bloquearsistema"
          :options="bloquearsistema"
          map-options
          emit-value
          option-value="value"
          option-label="label"
          label="Bloquear Sistema"
          class="col-2"
          bottom-slots
          :rules="[ val => val && val!=='' || 'Escolha uma opção']"
        >
        <template v-slot:append>
          <q-icon
          name="close"
          @click.stop="form.bloquearsistema = ''"
          class="cursor-pointer" />
        </template>
        </q-select>
        <!--<q-checkbox
          v-model="manutencaomensal"
          label="Manutenção Mensal"
        />-->
        <q-input
          outlined
          dense
          v-model="form.obs"
          type="textarea"
          label="Observação"
          class="col-6"
        />

        <q-toggle
          v-model="form.manutencao"
          label="Manutenção Mensal"
          true-value="T"
          false-value="F"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        />

        <q-input
          outlined
          dense
          v-model.number="form.valormanutencao"
          label="Valor Manutenção"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          prefix="R$"
          class="col-2"
        />
        <q-checkbox
          v-model="form.inativo"
          true-value="T"
          false-value="F"
          label="Cliente Inativo"
        />

      </div>

      <br>

      <div class="col-12 column items-center">
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
          :label="form.cdcliente ? 'Atualizar' : 'Cadastrar'"
          icon="done"
          color="secondary"
          class="float-left"
          type="submit"
        />
        <q-btn
          label="Voltar"
          icon="done"
          color="amber"
          class="float-left"
          @click="Voltar"
        />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'CadCliente',
  data () {
    return {
      form: {
        cdcliente: null,
        pessoa: '',
        nome: '',
        fantasia: '',
        cnpj_cpf: '',
        ie_rg: '',
        endereco: '',
        numero: '',
        cep: '',
        bairro: '',
        cdcidade: null,
        cdestado: null,
        telefones: '',
        email: '',
        datacadastro: null,
        dataalteracao: null,
        bloquearsistema: '',
        manutencao: 'F',
        valormanutencao: null,
        obs: '',
        inativo: 'F'
      },
      options: [
        'Física',
        'Jurídica'
      ],
      listacidades: [''],
      listaestados: [''],
      cidades: [],
      bloquearsistema: [
        { label: 'Não', value: 'N' },
        { label: 'Bloquear', value: 'B' },
        { label: 'Atualizar', value: 'A' },
        { label: 'Cobrança', value: 'C' }
      ]
    }
  },
  mounted () {
    this.getCidades()
    this.getEstados()
    if (this.$route.query.cdcliente) {
      this.getClienteId()
    }
  },
  methods: {
    onSubmit () {
      if (!this.form.cdcliente) {
        this.cadastraCliente()
      } else {
        this.atualizaCliente()
      }
    },
    Voltar () {
      this.$router.push({ name: 'ListaClientes' })
    },
    getClienteId () {
      const cdcliente = this.$route.query.cdcliente
      this.$axios.get(`/clientes/${cdcliente}`)
        .then((suc) => {
          this.form = {
            ...suc.data
          }
          this.form.dataalteracao = date.formatDate(suc.data.dataalteracao, 'DD/MM/YYYY')
          this.form.datacadastro = date.formatDate(suc.data.datacadastro, 'DD/MM/YYYY')
          // console.log(suc.data)
        })
        .catch((err) => {
          console.error('erro', err)
        })
    },
    cadastraCliente () {
      const dataatual = new Date()
      this.$axios.post('clientes', {
        ...this.form,
        datacadastro: dataatual
      })
        .then(() => {
          this.$q.notify({
            message: 'Cliente Cadastrado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-clientes')
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao cadastrar Cliente.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro cliente', err)
        })
    },
    atualizaCliente () {
      const dataatual = new Date()
      const dtcadastro = date.extractDate(this.form.datacadastro, 'DD/MM/YYYY')
      this.$axios.put(`clientes/${this.form.cdcliente}`, {
        ...this.form,
        datacadastro: dtcadastro,
        dataalteracao: dataatual
      })
        .then(() => {
          this.$q.notify({
            message: 'Cliente Atualizado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-clientes')
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao Atualizar Cliente.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro cliente', err)
        })
    },
    getEstados () {
      this.$axios.get('estados')
        .then((suc) => {
          this.listaestados = suc.data
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao recuperar Estados.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro getEstados', err)
        })
    },
    getCidades () {
      this.$axios.get('cidades')
        .then((suc) => {
          this.cidades = suc.data
          this.listacidades = this.cidades
          this.filtraCidades()
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao recuperar Cidades.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro Cidades', err)
        })
    },
    filtraCidades () {
      const estadoCodigo = this.listaestados.find(est => est.cdestado === this.form.cdestado)
      if (estadoCodigo) {
        this.listacidades = this.cidades.filter(cid => cid.estado === estadoCodigo.sigla)
      }
    }
  }
}
</script>
