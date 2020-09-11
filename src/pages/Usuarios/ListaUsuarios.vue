<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="account_circle" class="text-primary"/>
      Lista de Usuários</p>

    <div class="row">
      <div class="col-12">
        <q-table
          title="Usuarios"
          :data="usuarios"
          :columns="columns"
          row-key="cdusuario"
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
            label="Novo Usuário"
            @click="cadastrarUsuario"
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
              @click="editarUsuario(props.row.cdusuario)"
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
  name: 'ListaUsuarios',

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
          name: 'cdusuario',
          required: true,
          field: 'cdusuario',
          label: 'Código',
          align: 'left',
          sortable: true
        },
        {
          name: 'nome',
          required: true,
          field: 'nome',
          label: 'Nome',
          align: 'left',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          field: 'email',
          label: 'E-mail',
          align: 'left',
          sortable: true
        },
        {
          name: 'tipousuario',
          required: true,
          field: 'tipousuario',
          label: 'Tipo',
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
      usuarios: []
    }
  },

  mounted () {
    this.getUsuarios()
  },

  methods: {
    getUsuarios () {
      this.loading = true
      this.$axios.get('/usuarios')
        .then((suc) => {
          this.usuarios = suc.data
        })
        .catch((err) => {
          console.error('erro', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    cadastrarUsuario () {
      this.$router.push({ name: 'CadUsuario' })
    },
    editarUsuario (id) {
      this.$router.push({ name: 'CadUsuario', query: { cdusuario: id } })
    }
  }
}
</script>
