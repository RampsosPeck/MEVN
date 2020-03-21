import express from 'express';
const router = express.Router();

const jwt = require('jsonwebtoken');

//importar el modelo user
import User from '../models/user';

//Hash contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


router.post('/', async(req, res) => {
	//return res.json({mensaje: 'Login de acceso'})
	const body = req.body
	try {
		//Comprobamos si existe el email en la DB
		const usuarioDB = await User.findOne({email:body.email})
		if(!usuarioDB){
			return res.status(400).json({
				mensaje: 'Email no encontrado'
			})
		}
		//Aqui evaluamos la contraseña
		if(!bcrypt.compareSync(body.pass, usuarioDB.pass)){
			return res.status(400).json({
				mensaje: 'Contraseña no encontrado'
			})
		}

		//Generar TOKEN
		const token = jwt.sign({
		  	data: usuarioDB
		}, 'secret', { expiresIn: 60 * 60 }); //dura una hora
		//}, 'secret', { expiresIn: 60 * 60 * 24 * 30 }); para que dure un mes
		res.json({
			usuarioDB,
			token
		})

	}catch(error){
		return res.status(500).json({
			mensaje: 'Ocurrió un error',
			error
		})
	}
})

module.exports = router;