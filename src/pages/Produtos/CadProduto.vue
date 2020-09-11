<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="shop" class="text-primary"/>
    Cadastro de Produto</p>

  <q-form  @submit="onSubmit">
    <div class="col q-col-gutter-sm">
      <q-input
          Standard
          disable
          v-model="form.cdproduto"
          label="Codigo"
          style="max-width: 100px"
          bottom-slots
        />
      <q-input
        Standard
        v-model="form.idaplicacao"
        label="ID Aplicação"
        mask="########"
        style="max-width: 200px"
        :rules="[ val => val && val.length > 0 || 'ID Aplicação é obrigatório']"
      />
      <q-input
        Standard
        v-model="form.descricao"
        label="Descrição"
        style="max-width: 300px"
        @input="val => { form.descricao = val.toUpperCase() }"
        :rules="[ val => val && val.length > 0 || 'Descrição é obrigatório']"
      />
      <q-input
        Standard
        v-model.number="form.valor"
        label="Valor"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        prefix="R$"
        style="max-width: 150px"
        :rules="[ val => val && val > 0 || 'Descrição é obrigatório']"
      />
      <q-checkbox
        v-model="form.inativo"
        true-value="T"
        false-value="F"
        label="Produto Inativo"
      />
      <q-checkbox
        v-model="form.gerartitulo"
        true-value="T"
        false-value="F"
        label="Gerar Titulo"
      />
    </div>

    <br>

    <div class="col-12 q-pa-md q-gutter-sm">
      <q-btn
        label="Salvar"
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
  </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'CadProduto',
  data () {
    return {
      form: {
        cdproduto: null,
        idaplicacao: '',
        descricao: '',
        valor: null,
        gerartitulo: 'F',
        inativo: 'F'
      }
    }
  },
  mounted () {
    if (this.$route.query.cdproduto) {
      this.getProdutoId()
    }
  },
  methods: {
    onSubmit () {
      if (!this.form.cdproduto) {
        this.cadastraProduto()
      } else {
        this.atualizaProduto()
      }
    },
    Voltar () {
      this.$router.push({ name: 'ListaProdutos' })
    },
    getProdutoId () {
      const cdproduto = this.$route.query.cdproduto
      this.$axios.get(`/produtos/${cdproduto}`)
        .then((suc) => {
          this.form = {
            ...suc.data
          }
          // console.log(suc.data)
        })
        .catch((err) => {
          console.error('erro', err)
        })
    },
    cadastraProduto () {
      this.$axios.post('produtos', {
        ...this.form
      })
        .then(() => {
          this.$q.notify({
            message: 'Produto Cadastrado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-produtos')
        })
        .catch((err) => {
          console.log(this.form)
          this.$q.notify({
            message: 'Erro ao cadastrar Produto.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro produto', err)
        })
    },
    atualizaProduto () {
      this.$axios.put(`produtos/${this.form.cdproduto}`, {
        ...this.form
      })
        .then(() => {
          this.$q.notify({
            message: 'Produto Atualizado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-produtos')
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao Atualizar Produto.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro produto', err)
        })
    }
  }
}
</script>
