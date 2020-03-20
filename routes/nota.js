import express from 'express';
const router = express.Router();

//importar el modelo nota
import Nota from '../models/nota';

//Agregar nota
router.post('/nueva-nota', async(req, res) => {
	const body = req.body;
	try{
		const notaDB = await Nota.create(body);
		res.status(200).json(notaDB);
	}catch(error){
		return res.status(500).json({
			mensaje: 'Ocurrio un error',
			error: error
		})
	}
});

//Get con parametros
router.get('/nota/:id', async(req, res)=>{
	const _id = req.params.id;

	try{
		const notaDB = await Nota.findOne({_id});
		res.json(notaDB);
	}catch(error){
		return res.status(500).json({
			mensaje: 'Ocurrio un error',
			error
		})
	}
});

//Get con todos los documentos
router.get('/nota', async(req, res)=>{
	try{
		const notaDB = await Nota.find();
		res.json(notaDB);
	}catch(error){
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		})
	}
});

//Delete eliminar una nota
router.delete('/nota/:id', async(req, res)=>{
	const _id = req.params.id;
	try{
		const notaDB = await Nota.findByIdAndDelete({_id});
		if(!notaDB){
			return res.status(400).json({
				mensaje: 'Ocurrio un error',
				error
			})
		}
		res.json(notaDB);
	}catch(error){
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		})
	}
});

//PUT Actualizar una nota
router.put('/nota/:id', async(req, res)=>{
	const _id = req.params.id;
	const body = req.body;
	try{
		const notaDB = await Nota.findByIdAndUpdate(_id,body,{new:true});
		res.json(notaDB);
	}catch(error){
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		})
	}
});
//exportacion de router
module.exports = router;