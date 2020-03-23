<template>
	<div class="container">
	<h1>INICIO DE SESION</h1>
	<form  @submit.prevent="login">
		<input type="email" placeholder="Ingrese su E-mail" class="form-control my-2" v-model="usuario.email">
		<input type="text" placeholder="Ingrese su contraseña" class="form-control my-2" v-model="usuario.pass">
		<b-button class="btn-block bg-info" type="submit"> Acceder</b-button>
	</form>
	<div v-if="mensaje != ''">
		<p>{{ mensaje }}</p>
	</div>
	</div>
</template>

<script>
	import {mapActions} from "vuex"
	export default {
		data() {
			return {
				usuario:{email:'', pass:''},
				mensaje: ''
			}
		},
		methods: {
			...mapActions(['guardarUsuario']),
			login(){
				//console.log(this.usuario);
				this.axios.post('/login', this.usuario)
				.then(res => {
					//console.log(res.data)
					const token = res.data.token;
					this.guardarUsuario(token);
				}).catch(e => {
					//console.log(e.response)
					this.mensaje = e.response.data.mensaje
				})
			}
		}
	};
</script>



