<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="supervisor_account" class="text-primary" style="font-size: 1.3em;"/>
      Lista de Clientes</p>

    <div class="row">
      <div class="col-12">
        <q-table
          title="Clientes"
          :data="clientes"
          :columns="columns"
          row-key="cdcliente"
          :filter="filter"
          :pagination="initialPagination"
          :loading="loading"
        >

        <template v-slot:top>
          <q-option-group
            dense
            v-model="radiogroup"
            :options="radiooptions"
            color="primary"
          />
          <q-input
            outlined
            dense
            v-model="imputpesquisa"
            debounce="300"
            color="primary"
            class="q-mr-sm">
          </q-input>
          <q-btn
            label="Pesquisar"
            icon="search"
            color="primary"
            class="q-mr-sm"
            @click="getClientes"
          />
          <q-select
            outlined
            dense
            options-dense
            v-model="revenda"
            :options="optionsRevenda"
            label="Revenda"
            :loading="loadingUsuarios"
            style="width: 150px"
            class="q-mr-sm"
          >
          <template v-slot:append>
              <q-icon
                v-if="revenda.value !== ''"
                class="cursor-pointer"
                name="clear"
                @click.stop="revenda = {label: 'TODOS', value: ''}"
              />
            </template>
          </q-select>
          <q-select
            outlined
            dense
            v-model="manutencao"
            :options="optionsManutencao"
            map-options
            emit-value
            label="Manutenção"
            style="width: 120px"
            class="q-mr-sm"
          />
          <q-select
            outlined
            dense
            v-model="mensagem"
            :options="optionsMensagem"
            map-options
            emit-value
            label="Mensagem"
            style="width: 120px"
            class="q-mr-sm"
          />
          <q-select
            outlined
            dense
            v-model="situacao"
            :options="optionsSituacao"
            map-options
            emit-value
            label="Situação"
            style="width: 120px"
            class="q-mr-sm"
          />
        </template>

        <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <!--<q-btn
              icon="search"
              color="secondary"
              size="sm"
              dense
            />-->
            <q-btn
              icon="create"
              color="primary"
              size="sm"
              dense
              @click="editarCliente(props.row.cdcliente)"
            > <q-tooltip
                anchor="top middle" self="bottom middle"
                content-class="bg-amber  text-black"
                content-style="font-size: 12px">
                  Editar Cliente
                </q-tooltip>
            </q-btn>
           <q-btn
                icon="queue_play_next"
                color="secondary"
                size="sm"
                dense
                @click="buscarLiberacoes(props.row.cdcliente)"
              > <q-tooltip
                anchor="top middle" self="bottom middle"
                content-class="bg-amber  text-black"
                content-style="font-size: 12px">
                  Visualizar Liberações
                </q-tooltip>
              </q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:bottom-row>
          <q-tr>
            <q-td colspan="100%">
              <q-chip
                class="text-body1 float-right"
                outline
                square
                color="primary"
                text-color="white"
                :label="`Total Manutenção R$: ${totalManutencao}`"
              />
            </q-td>
          </q-tr>
        </template>

      </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ListaClientes',
  data () {
    return {
      filter: '',
      loading: false,
      initialPagination: {
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      radiogroup: 'nome',
      radiooptions: [
        {
          label: 'Razão Social',
          value: 'nome'
        },
        {
          label: 'Fantasia',
          value: 'fantasia'
        },
        {
          label: 'CNPJ',
          value: 'cnpj'
        },
        {
          label: 'Código',
          value: 'codigo'
        }
      ],
      columns: [
        {
          name: 'cdcliente',
          required: true,
          field: 'cdcliente',
          label: 'Código',
          align: 'left',
          sortable: true
        },
        {
          name: 'nome',
          required: true,
          field: 'nome',
          label: 'Razão Social',
          align: 'left',
          sortable: true
        },
        {
          name: 'fantasia',
          required: true,
          field: 'fantasia',
          label: 'Fantasia',
          align: 'left',
          sortable: true
        },
        {
          name: 'cnpj_cpf',
          required: true,
          field: 'cnpj_cpf',
          label: 'Cnpj',
          align: 'left',
          sortable: true
        },
        {
          name: 'valormanutencao',
          required: true,
          field: 'valormanutencao',
          label: 'Valor',
          align: 'center',
          sortable: true
        },
        {
          name: 'revenda',
          required: true,
          field: 'revenda',
          label: 'Revenda',
          align: 'center',
          sortable: true
        },
        {
          name: 'action',
          // required: true,
          field: 'action',
          label: 'Ações',
          align: 'center'
          // sortable: true
        }
      ],
      clientes: [],
      optionsRevenda: [],
      revenda: { label: 'TODOS', value: '' },
      loadingUsuarios: true,
      totalManutencao: 0,
      optionsManutencao: [
        { label: 'Todos', value: '' },
        { label: 'Sim', value: 'T' },
        { label: 'Não', value: 'F' }
      ],
      optionsMensagem: [
        { label: 'Todos', value: '' },
        { label: 'Bloquear', value: 'B' },
        { label: 'Atualizar', value: 'A' },
        { label: 'Cobrança', value: 'C' }
      ],
      optionsSituacao: [
        { label: 'Todos', value: '' },
        { label: 'Ativos', value: 'F' },
        { label: 'Inativos', value: 'T' }
      ],
      manutencao: '',
      mensagem: '',
      situacao: '',
      imputpesquisa: ''
    }
  },
  mounted () {
    this.getUsuarios()
    // this.getClientes()
  },
  methods: {
    getClientes () {
      this.loading = true
      this.$axios.get(`/clientes?${this.radiogroup}=${this.imputpesquisa}&manutencao=${this.manutencao}&cdrevenda=${this.revenda.value}&bloquearsistema=${this.mensagem}&inativo=${this.situacao}`)
        .then((suc) => {
          this.clientes = suc.data.clientes
          this.totalManutencao = suc.data.totalmanutencao[0].totalmanutencao
        })
        .catch((err) => {
          console.error('erro', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getUsuarios () {
      this.loadingUsuarios = true
      this.$axios.get('/usuarios')
        .then((suc) => {
          this.optionsRevenda = suc.data.map((usuario) => {
            return {
              value: usuario.cdusuario,
              label: usuario.nome
            }
          })
        })
        .catch((err) => {
          console.error('erro', err)
        })
        .finally(() => {
          this.loadingUsuarios = false
        })
    },
    cadastrarCliente () {
      this.$router.push({ name: 'CadCliente' })
    },
    editarCliente (id) {
      this.$router.push({ name: 'CadCliente', query: { cdcliente: id } })
    },
    buscarLiberacoes (id) {
      this.$router.push({ name: 'Liberacoes', query: { cdcliente: id }, params: { paginaorigem: 'listaclientes' } })
    }
  }
}
</script>
