<template>
  <q-page class="container" padding>
    <p class="text-h5">
      <q-icon name="shop" class="text-primary"/>
    Cadastro de Usuário</p>

  <q-form  @submit="onSubmit">
    <div class="col q-col-gutter-sm">
      <q-input
          outlined
          disable
          dense
          v-model="form.cdusuario"
          label="Codigo"
          style="max-width: 100px"
          bottom-slots
        />
      <q-input
        outlined
        dense
        v-model="form.nome"
        label="Nome"
        style="max-width: 200px"
        @input="val => { form.nome = val.toUpperCase() }"
        :rules="[ val => val && val.length > 0 || 'Nome é obrigatório']"
      />
      <q-input
        outlined
        dense
        v-model="form.email"
        label="E-mail"
        style="max-width: 200px"
        @input="val => { form.email = val.toLowerCase() }"
        :rules="[ val => val && val.length > 0 || 'E-mail é obrigatório']"
      />
      <q-input
        outlined
        dense
        v-model="form.senha"
        label="Senha"
        style="max-width: 200px"
        type="password"
        :rules="[ val => val && val.length > 0 || 'Senha é obrigatório']"
      />
      <q-select
        outlined
        dense
        v-model="form.tipousuario"
        :options="options"
        label="Tipo Usuário"
        style="max-width: 200px"
        :rules="[ val => val && val.length > 0 || 'Tipo pessoa é obrigatório']"
        />
      <q-checkbox
        v-model="form.inativo"
        true-value="T"
        false-value="F"
        label="Usuário Inativo"
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
  name: 'CadUsuario',
  data () {
    return {
      form: {
        cdusuario: null,
        nome: '',
        email: '',
        senha: '',
        inativo: 'F',
        tipousuario: ''
      },
      options: [
        'MASTER',
        'REVENDA'
      ]
    }
  },
  mounted () {
    if (this.$route.query.cdusuario) {
      this.getUsuarioId()
    }
  },
  methods: {
    onSubmit () {
      if (!this.form.cdusuario) {
        this.cadastraUsuario()
      } else {
        this.atualizaUsuario()
      }
    },
    Voltar () {
      this.$router.push({ name: 'ListaUsuarios' })
    },
    getUsuarioId () {
      const cdusuario = this.$route.query.cdusuario
      this.$axios.get(`/usuarios/${cdusuario}`)
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
    cadastraUsuario () {
      this.$axios.post('usuarios', {
        ...this.form
      })
        .then(() => {
          this.$q.notify({
            message: 'Usuario Cadastrado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-usuarios')
        })
        .catch((err) => {
          console.log(this.form)
          this.$q.notify({
            message: 'Erro ao cadastrar Usuario.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro usuario', err)
        })
    },
    atualizaUsuario () {
      this.$axios.put(`usuarios/${this.form.cdusuario}`, {
        ...this.form
      })
        .then(() => {
          this.$q.notify({
            message: 'Usuario Atualizado com Sucesso.',
            icon: 'check_circle_outline',
            color: 'positive',
            timeout: 500
          })
          this.$router.push('lista-usuarios')
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Erro ao Atualizar Usuario.',
            icon: 'check_circle_outline',
            color: 'negative'
          })
          console.error('erro cadastro usuario', err)
        })
    }
  }
}
</script>
