<template>
  <div id="app">
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
          <b-navbar-brand href="#">AppJOPE</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item to="/about">About</b-nav-item>
              <b-nav-item to="/notas" v-if="estaActivo">Notas</b-nav-item>
              <b-nav-item to="/login" v-if="!estaActivo">Login</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0 bg-success" type="submit">Search</b-button>
              </b-nav-form>

              <b-nav-item-dropdown right v-if="estaActivo">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="cerrarSesion()">Cerrar Sesion</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    <router-view/>
    <div class="footer-copyright text-center py-3">© 2020 Copyright:
      <a href="https://www.facebook.com/jorge.peralta.3576224/"> Ing. JORGE PERALTA</a>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  export default {
    methods: {
      ...mapActions(['cerrarSesion','leerToken'])
    },
    computed: {
      ...mapGetters(['estaActivo'])
    },
    created(){
      this.leerToken();
    }
  };
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
