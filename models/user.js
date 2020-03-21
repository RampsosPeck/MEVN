import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles = {
	values: ['ADMIN', 'USER'],
	message: '{VALUE} rol no válido'
}

const userSchema = new Schema({
	nombre: {type: String, required: [true, 'El nombre de es necesario']},
	email: {
		type: String,
		required: [true, 'El email de es necesario'],
		unique: true
	},
	pass: {
		type: String,
		required: [true, 'Password obligatorio']

	},
	date: {type: Date, default: Date.now},
	role: {type: String, default: 'USER', enum: roles },
	activo: {type: Boolean, default: true },
});

userSchema.plugin(uniqueValidator, {message: 'Error, esperaba {PATH} que sea único'});

//Ocultar la contraseña
userSchema.methods.toJSON = function(){
	const obj = this.toObject();
	delete obj.pass;
	return obj;
}

//Convertir a un modelo
const User = mongoose.model('User', userSchema);
export default User;


