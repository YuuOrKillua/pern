const express = require('express')
let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const usuario = [

]

app.get('/', (req, res) => {
    res.send('entrou')
})

// app.get('/cadastro', (req, res) => {
//     res.send('tela de cadastro')
// })

// app.get('/perfil', (req, res) => {
//     res.send('perfil do usuário')
// })

app.get('/usuario', (req, res) => {
    res.json(usuario)
    console.log(req.body)
})

app.post('/usuario', (req, res) => {
    usuario.push(req.body)
    res.json({status: 'Usuario criado com sucesso'})
})

app.delete('/usuario', (req, res) => {
    usuario.pop(req.body)
    res.json({status: 'Usuario foi deletado com sucesso'})
})


app.listen(8080, () => {
    console.log('rodando e http://localhost:8080')
})