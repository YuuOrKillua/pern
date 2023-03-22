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

app.get('/usuarios', async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM usuario")

        res.json(user.rows)
    } catch (error) {
        console.log(error)
    }
})

app.post('/usuarios', async (req, res) => {
    try {
        const {nome, email, cpf} = req.body
        const newUser = await pool.query('INSERT INTO usuario (nome, email, cpf) VALUES($1, $2, $3) RETURNING *', [nome, email, cpf])
        res.json(newUser.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.delete('/usuarios', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteUser = await pool.query("DELETE FROM usuario WHERE id= $1", [id])
        res.json(deleteUser.rows)
    } catch (error) {
        console.log(error)
    }
})


app.listen(8080, () => {
    console.log('rodando e http://localhost:8080')
})