<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Prático Sistemas - App Gerencial
        </q-toolbar-title>

        <!--<div>Quasar v{{ $q.version }}</div>-->
        <q-btn-dropdown color="primary" label="Francisco" unelevated>
          <q-list>
            <q-item clickable v-close-popup @click="onTrocarSenha">
               <q-item-section>
                 <q-avatar icon="vpn_key" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label >Trocar Senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onSair">
              <q-item-section>
                 <q-avatar icon="close" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="route in essentialLinks"
          :key="route.title"
          v-bind="route"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Clientes',
    caption: 'Controle de Clientes',
    icon: 'supervisor_account',
    route: 'lista-clientes'
  },
  {
    title: 'Produtos',
    caption: 'Controle de Produtos',
    icon: 'shop',
    route: 'lista-produtos'
  },
  {
    title: 'Licença',
    caption: 'Liberação de Sistemas',
    icon: 'queue_play_next',
    route: 'liberar-sistema'
  },
  {
    title: 'Contas a Receber',
    caption: 'Controle de Contas a Receber',
    icon: 'money',
    route: 'contas-receber'
  },
  {
    title: 'Usuários',
    caption: 'Controle de Usuários',
    icon: 'account_circle',
    route: 'lista-usuarios'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    onSair () {
      sessionStorage.removeItem('appgerencial_token')
      this.$router.replace('/login')
    }

  }
}
</script>
