<template>
	<div class="container">
	<b-row class="justify-content-md-center">
		<b-col cols="6 mt-4" >
			<b-card title="INICIO DE SESION" img-src="https://www.ma-no.org/cache/galleries/contents-1790/460-300/vuejs.jpg" img-alt="Image" img-top>
				<form  @submit.prevent="login">
			      <b-card-text>
						<input type="email" placeholder="Ingrese su E-mail" class="form-control my-2" v-model="usuario.email">
						<input type="password" placeholder="Ingrese su contraseña" class="form-control my-2" v-model="usuario.pass">
			      </b-card-text>
			      <template >
			        	<b-button class="btn-block bg-info" type="submit"> Acceder</b-button>
			      </template>
			      <div v-if="mensaje != ''">
						<p>{{ mensaje }}</p>
					</div>
			    </form>
		    </b-card>
		</b-col>
	</b-row>
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
					this.$router.push({name: 'notas'})
				}).catch(e => {
					//console.log(e.response)
					this.mensaje = e.response.data.mensaje
				})
			}
		}
	};
</script>



