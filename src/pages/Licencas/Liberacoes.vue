<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="queue_play_next" class="text-primary"/>
      Lista de Liberações</p>

      <div class="row">
      <div class="col-12">
        <q-table
          :data="liberacoes"
          :columns="columns"
          row-key="cdliberacao"
          :filter="filter"
          :pagination="initialPagination"
          :loading="loading"
        >
        <template v-slot:top>
          <q-btn
            color="primary"
            icon="reply"
            label="Voltar"
            @click="Voltar"
          />
        </template>
      </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'Liberacoes',
  props: {
    paginaorigem: String
  },

  data () {
    return {
      filter: '',
      loading: false,
      initialPagination: {
        page: 1,
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'CDCLIENTE',
          required: true,
          field: 'CDCLIENTE',
          label: 'Cód Cliente',
          align: 'left',
          sortable: true
        },
        {
          name: 'NOME',
          required: true,
          field: 'NOME',
          label: 'Cliente',
          align: 'left',
          sortable: true
        },
        {
          name: 'USUARIO',
          required: true,
          field: 'USUARIO',
          label: 'Revenda',
          align: 'left',
          sortable: true
        },
        {
          name: 'PRODUTO',
          required: true,
          field: 'PRODUTO',
          label: 'Módulo',
          align: 'left',
          sortable: true
        },
        {
          name: 'SERIALHD',
          required: true,
          field: 'SERIALHD',
          label: 'Serial HD',
          align: 'left',
          sortable: true
        },
        {
          name: 'DATA',
          required: true,
          field: 'DATA',
          label: 'Data',
          align: 'left',
          format: val => date.formatDate(val, 'DD/MM/YYYY'),
          sortable: true
        }
      ],
      liberacoes: []

    }
  },

  mounted () {
    this.getLiberacoes()
    console.log(this.props)
  },

  methods: {
    getLiberacoes () {
      const cdcliente = this.$route.query.cdcliente
      this.loading = true
      this.$axios.get(`/liberacoes/${cdcliente}`)
        .then((suc) => {
          console.log(suc.data)
          this.liberacoes = suc.data
        })
        .catch((err) => {
          console.error('erro', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    Voltar () {
      if (this.paginaorigem === 'listaclientes') {
        this.$router.push({ name: 'ListaClientes' })
      }
      if (this.paginaorigem === 'contasreceber') {
        this.$router.push({ name: 'ContasReceber' })
      }
    }
  }

}
</script>
