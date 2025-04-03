require('dotenv').config()

// requerer o objeto api
const api = require('./src/api')

//porta
//const porta = 4040

//inicializar o servidor:
api.listen(process.env.PORT,()=>{
    console.log('\n Api inicializada!')
})
