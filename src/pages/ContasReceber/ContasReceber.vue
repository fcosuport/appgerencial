<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="money" class="text-primary"/>
    Contas a Receber</p>

    <div class="row">
      <div class="col-12">
        <q-table
          dense
          title="ContasReceber"
          :data="contasreceber"
          :columns="columns"
          row-key="cdtitulo"
          :filter="filter"
          :pagination="initialPagination"
          :loading="loading"
          selection="multiple"
          :selected.sync="selected"
        >
        <template v-slot:top>
          <q-select
            outlined
            dense
            v-model="situacao"
            :options="optionsSituacao"
            map-options
            emit-value
            label="Situação"
            style="width: 120px"
            class="q-mr-md"
          />
          <q-select
            outlined
            dense
            options-dense
            v-model="revenda"
            :options="optionsRevenda"
            label="Revenda"
            :loading="loadingUsuarios"
            style="width: 200px"
            class="q-mr-md"
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
          <!-- <q-space /> -->
          <q-btn
            label="Filtrar"
            icon="filter_alt"
            color="primary"
            @click="getContasReceber"
          />
          <q-space />
          <q-btn
            v-if="selected.length > 0"
            label="Quitar Títulos"
            icon="monetization_on"
            color="secondary"
            @click="quitarTitulos"
          />
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
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

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
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
                :label="`R$: ${totalContasReceber}`"
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
import { date } from 'quasar'
export default {
  name: 'ContasReceber',

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
          name: 'cdtitulo',
          required: true,
          field: 'cdtitulo',
          label: 'Título',
          align: 'left',
          sortable: true
        },
        /* {
          name: 'emissao',
          required: true,
          field: 'emissao',
          label: 'Emissão',
          align: 'left',
          sortable: true
        }, */
        {
          name: 'vencimento',
          required: true,
          field: 'vencimento',
          label: 'Vencimento',
          align: 'left',
          format: val => date.formatDate(val, 'DD/MM/YYYY'),
          sortable: true
        },
        {
          name: 'cdcliente',
          required: true,
          field: 'cdcliente',
          label: 'Cód Cliente',
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
          label: 'Nome Fantasia',
          align: 'left',
          sortable: true
        },
        {
          name: 'manutencao',
          required: true,
          field: 'manutencao',
          label: 'Manutenção',
          align: 'left',
          format: val => val === 'F' ? 'NÃO' : 'SIM',
          sortable: true
        },
        {
          name: 'revenda',
          required: true,
          field: 'revenda',
          label: 'Revenda',
          align: 'left',
          sortable: true
        },
        {
          name: 'obs',
          required: true,
          field: 'obs',
          label: 'Módulo',
          align: 'left',
          sortable: true
        },
        {
          name: 'total',
          required: true,
          field: 'total',
          label: 'Valor',
          align: 'left',
          sortable: true
        },
        {
          name: 'situacao',
          required: true,
          field: 'situacao',
          label: 'Situação',
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
      contasreceber: [],
      optionsSituacao: [
        { label: 'ABERTO', value: 'ABERTO' },
        { label: 'PAGO', value: 'PAGO' },
        { label: 'TODOS', value: '' }
      ],
      situacao: 'ABERTO',
      optionsRevenda: [],
      revenda: { label: 'TODOS', value: '' },
      loadingUsuarios: true,
      totalContasReceber: 0,
      selected: []
    }
  },
  mounted () {
    this.getUsuarios()
  },
  methods: {
    getContasReceber () {
      this.loading = true
      this.$axios.get(`/contasreceber?=${this.situacao}&situacao=${this.situacao}&cdrevenda=${this.revenda.value}`)
        .then((suc) => {
          this.contasreceber = suc.data.titulos
          this.totalContasReceber = suc.data.total[0].total
          // this.contasreceber.emissao = date.formatDate(suc.data.emissao, 'DD/MM/YYYY')
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
    quitarTitulos () {
      const codigoTitulos = this.selected.map((titulo) => {
        return titulo.cdtitulo
      })

      const tituloPago = this.selected.filter((titulo) => {
        return titulo.situacao === 'PAGO'
      })

      if (tituloPago.length > 0) {
        this.$q.notify({
          message: 'Selecione somente Títulos ABERTOS',
          icon: 'cancel',
          color: 'negative',
          timeout: 1000
        })
        return false
      }
      this.$q.dialog({
        title: 'Quitar',
        message: 'Deseja Realmente Quitar os Titulos Selecionados?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('/contasreceber/quitar', {
          titulos: codigoTitulos
        })
          .then((suc) => {
            this.$q.notify({
              message: suc.data.message,
              icon: 'check_circle_outline',
              color: 'positive',
              timeout: 500
            })
            this.getContasReceber()
            this.selected = []
          })
          .catch((err) => {
            console.error('erro', err)
          })
          .finally(() => {
            this.loadingUsuarios = false
          })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    buscarLiberacoes (id) {
      this.$router.push({ name: 'Liberacoes', query: { cdcliente: id }, params: { paginaorigem: 'contasreceber' } })
    }
  }
}
</script>
