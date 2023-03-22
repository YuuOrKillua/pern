const express = require('express')
let app = express()
const cors = require('cors')
const { engine } = require('express-handlebars')
const pool = require('./db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// Código   
const usuarios = [
    
]

//Rotas
app.get('/', (req, res) => {
    res.json(usuarios)
})

// app.get('/cadastro', (req, res) => {
//     res.send('tela de cadastro')
// })

// app.get('/perfil', (req, res) => {
//     res.send('perfil do usuário')
// })

app.get('/usuarios', (req, res) => {
    res.render('usuarios')
    // res.json(usuarios)
    console.log(req.body)
})

app.post('/usuarios', async (req, res) => {
    try {
        const {nome, email, cpf} = req.body
        const newUser = await pool.query('INSERT INTO usuario (nome, email, cpf) VALUES($1, $2, $3) RETURNING *', [nome, email, cpf])
        res.json(newUser.rows[0])
    } catch (error) {
        console.log(error)
    }
    // res.send("Nome: " + req.body.nome + "\nEmail: " + req.body.email)
    // usuarios.push(req.body)
    // usuarios.push(req.body)
    // res.json({status: 'Usuario criado com sucesso'})
})

app.delete('/usuarios', (req, res) => {
    usuarios.pop(req.body)
    res.json({status: 'Usuario foi deletado com sucesso'})
})


app.listen(8080, () => {
    console.log('rodando e http://localhost:8080')
})