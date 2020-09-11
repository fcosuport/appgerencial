<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="shop" class="text-primary"/>
      Lista de Produtos</p>

  <div class="row">
      <div class="col-12">
        <q-table
          title="Produtos"
          :data="produtos"
          :columns="columns"
          row-key="cdproduto"
          :filter="filter"
          :pagination="initialPagination"
          :loading="loading"
        >
        <template v-slot:top>
          <q-input outlined dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space />

          <q-btn
            color="primary"
            icon="add_box"
            label="Novo Produto"
            @click="cadastrarProduto"
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
              @click="editarProduto(props.row.cdproduto)"
            />
            <q-btn
              icon="delete"
              color="negative"
              size="sm"
              dense
              @click="excluirProduto(props.row.cdproduto)"
            />
          </div>
        </q-td>
      </template>

      </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ListaProdutos',

  data () {
    return {
      filter: '',
      loading: false,
      initialPagination: {
        page: 1,
        rowsPerPage: 5
      },
      columns: [
        {
          name: 'cdproduto',
          required: true,
          field: 'cdproduto',
          label: 'Código',
          align: 'left',
          sortable: true
        },
        {
          name: 'idaplicacao',
          required: true,
          field: 'idaplicacao',
          label: 'ID Aplicação',
          align: 'left',
          sortable: true
        },
        {
          name: 'descricao',
          required: true,
          field: 'descricao',
          label: 'Descrição',
          align: 'left',
          sortable: true
        },
        {
          name: 'valor',
          required: true,
          field: 'valor',
          label: 'Valor',
          align: 'left',
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
      produtos: []
    }
  },

  mounted () {
    this.getProdutos()
  },

  methods: {
    getProdutos () {
      this.loading = true
      this.$axios.get('/produtos')
        .then((suc) => {
          this.produtos = suc.data
        })
        .catch((err) => {
          console.error('erro', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    cadastrarProduto () {
      this.$router.push({ name: 'CadProduto' })
    },
    editarProduto (id) {
      this.$router.push({ name: 'CadProduto', query: { cdproduto: id } })
    },
    excluirProduto (id) {
      this.$q.dialog({
        title: 'Excluir',
        message: 'Deseja Realmente Excluir o Produto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`produtos/${id}`)
          .then((res) => {
            const cor = res.data.status === '200' ? 'positive' : 'negative'
            this.$q.notify({
              message: res.data.message,
              icon: 'check_circle_outline',
              color: cor,
              timeout: 1000
            })
            this.getProdutos()
          })
          .catch((err) => {
            this.$q.notify({
              message: 'Erro ao Excluir Produto.',
              icon: 'check_circle_outline',
              color: 'negative'
            })
            console.error('erro excluir produto', err)
          })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
