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

//Rotas
app.get('/', (req, res) => {
    res.json("usuarios")
})

app.use(function (err, req, res, next) {
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
  
    console.error(err.stack);
  
    res.status(500).render('500', { error: err.stack });
  });

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

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {nome, email, cpf} = req.body
        const updateUser = await pool.query("UPDATE usuario SET nome = $1, email = $2, cpf = $3 WHERE id = $4", [nome, email, cpf, id])
        res.json("Updated user.")
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