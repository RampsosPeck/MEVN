const jwt = require('jsonwebtoken');
const verificarAuth = async (req, res, next) => {
	/*res.json({
		mensaje:'Dentro del middleware'
	})*/
	const token = req.get('token')
	jwt.verify(token, 'secret',(err, decoded)=>{
		if(err){
			return res.status(401).json({
				mensaje: 'Usuario no valido',
				err
			})
		}
		req.usuario = decoded.data;
		next();
	})
}

const verificarAdministrador = async (req, res, next) => {

	const rol = req.usuario.role;
	if(rol === 'ADMIN'){
		next();
	}else{
		return res.status(401).json({
			mensaje: 'Usuario no valido'
		})
	}
}

module.exports = { verificarAuth, verificarAdministrador }

