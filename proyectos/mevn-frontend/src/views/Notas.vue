<template>
	<div class="container">
		<h1>NOTAS</h1>
		<b-alert
	      :show="dismissCountDown"
	      dismissible
	      :variant="mensaje.color"
	      @dismissed="dismissCountDown=0"
	      @dismiss-count-down="countDownChanged"
	    >
	    {{ mensaje.texto }}
	    </b-alert>
		 <b-form inline @submit.prevent="editarNota(notaEditar)" v-if="editar">
		    <b-input-group prepend="Nombre:" class="mb-2 mr-sm-2 mb-sm-0">
			    <b-input
			      id=""
			      v-model="notaEditar.nombre"
			      placeholder="Ingrese aqui el nombre"
			    ></b-input>
			</b-input-group>
		    <b-input-group prepend="Descripción:" class="mb-2 mr-sm-2 mb-sm-0">
		      <b-input
		      		id=""
			        v-model="notaEditar.descripcion"
		      		placeholder="Ingrese aqui la Descripción">
		      	</b-input>
		    </b-input-group>
		    <b-button variant="primary" type="submit">Editar nota</b-button>
		    <b-button variant="warning" @click="editar=false">Cancelar</b-button>
		</b-form>

		<b-form inline @submit.prevent="agregarNota()" v-if="!editar">
		    <b-input-group prepend="Nombre:" class="mb-2 mr-sm-2 mb-sm-0">
			    <b-input
			      id=""
			      v-model="nota.nombre"
			      placeholder="Ingrese aqui el nombre"
			    ></b-input>
			</b-input-group>
		    <b-input-group prepend="Descripción:" class="mb-2 mr-sm-2 mb-sm-0">
		      <b-input
		      		id=""
			        v-model="nota.descripcion"
		      		placeholder="Ingrese aqui la Descripción">
		      	</b-input>
		    </b-input-group>
		    <b-button variant="info" type="submit">AGREGAR</b-button>
		</b-form>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Nombre</th>
					<th scope="col">Descripción</th>
					<th scope="col">Acciones</th>
				</tr>
			</thead>
			<tbody >
				<tr v-for="(item, index) in notas" :key="index">
					<th>{{ item._id }}</th>
					<th>{{ item.nombre }}</th>
					<th>{{ item.descripcion }}</th>
					<th>
						<b-button @click="eliminarNota(item._id)" pill class="m-1 bg-danger " size="sm">
					      Eliminar
					    </b-button>
					    <b-button @click="activarEdicion(item._id)" pill class="m-1 bg-info " size="sm">
					      Editar
					    </b-button>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				notas: [],
				dismissSecs: 5,
        		dismissCountDown: 0,
        		mensaje: {color: '',texto:''},
        		nota: {nombre: '', descripcion:''},
        		editar: false,
        		notaEditar: {}
			}
		},
		created(){
			this.listarNotas();
		},
		methods: {
			listarNotas(){
				this.axios.get('/nota')
				.then(res => {
					//console.log(res);
					this.notas = res.data;
				}).catch(e => {
					console.log(e.response);
				})
			},
			agregarNota(){
				//console.log(this.nota)
				this.axios.post('/nueva-nota', this.nota)
				.then(res => {
					this.notas.push(res.data)
					this.nota.nombre = ''
					this.nota.descripcion = ''
					this.mensaje.color ="success"
					this.mensaje.texto ="Nota Agregada correctamente"
					this.showAlert()
				}).catch(e=> {
					console.log(e.response);
					if(e.response.data.error.errors.nombre.message){
						this.mensaje.texto = e.response.data.error.errors.nombre.message
					}else{
						this.mensaje.texto = 'Error del sistema'
					}
					this.mensaje.color ="danger"
					this.showAlert()
				})
			},
			eliminarNota(id){
				this.axios.delete(`/nota/${id}`)
				.then(res => {
					console.log(res);
					//el que sea igual a eso va a retornar su index y guardada en index
					const index = this.notas.findIndex(item => item._id === res.data._id)
					this.notas.splice(index,1)
					this.mensaje.color ="success"
					this.mensaje.texto ="Nota eliminada correctamente"
					this.showAlert()
				}).catch(e => {
					console.log(e.response);
				})
			},
			activarEdicion(id){
				this.editar = true;
				console.log(id)
				this.axios.get(`/nota/${id}`)
				.then(res => {
					this.notaEditar= res.data
				}).catch(e => {
					console.log(e.response);
				})
			},
			editarNota(item){
				this.axios.put(`/nota/${item._id}`, item)
				.then(res => {
					const index = this.notas.findIndex(n => n._id === res.data._id);
					this.notas[index].nombre = res.data.nombre;
					this.notas[index].descripcion = res.data.descripcion;
					this.mensaje.color ="success";
					this.mensaje.texto ="Nota editada correctamente";
					this.showAlert();
					this.editar = false
				}).catch(e => {
					console.log(e.response);
				})
			},
			countDownChanged(dismissCountDown) {
		        this.dismissCountDown = dismissCountDown
		    },
		    showAlert() {
		        this.dismissCountDown = this.dismissSecs
		    }
		}
	};
</script>


