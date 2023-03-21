const express = require('express')
let app = express()
const { engine } = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const usuarios = [
    
]

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

app.post('/usuarios', (req, res) => {
    res.send("Nome: " + req.body.nome + "\nEmail: " + req.body.email)
    usuarios.push(req.body)
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