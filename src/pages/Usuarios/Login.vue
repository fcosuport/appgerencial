<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Login do Sistema
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="form.nome"
                label="Nome"
                :rules="[ val => val && val.length > 0 || 'Nome é obrigatório']"
              />

              <q-input
                type="password"
                filled
                v-model="form.senha"
                label="Senha"
                :rules="[ val => val && val.length > 0 || 'Senha é obrigatório']"
              />

              <div class="col-12 column items-center">
                <q-btn icon="login"
                class="full-width"
                label="Logar"
                type="submit"
                color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        nome: '',
        senha: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('login', {
        ...this.form
      })
        .then((suc) => {
          if (suc.data.status === '200') {
            const { token } = suc.data
            // localStorage.setItem('appgerencial_token', token)
            sessionStorage.setItem('appgerencial_token', token)
            this.$router.replace('/')
          }
          if (suc.data.status === '100') {
            this.$q.dialog({
              dark: true,
              title: 'Login Invalido',
              message: suc.data.message
            }).onOk(() => {
              // console.log('OK')
            }).onCancel(() => {
              // console.log('Cancel')
            }).onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            })
          }
        })
        .catch((err) => {
          console.error('erro ao Logar', err)
        })
    }
  }
}
</script>

<style>
  .bg-image {
   background-image: linear-gradient(135deg, #1c55d1 0%, #d3e7d0 100%);
  }
</style>
