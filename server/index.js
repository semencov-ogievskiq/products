const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const cors = require('cors')

global.db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'bebesh7291',
    database: 'products'
})

app.use(cors())

app.get('/catalog', async (req, res) => {
    try{
        let [catalog] = await db.query("SELECT * FROM products")
        
        res.status(200).json(catalog)
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})

app.get('/catalog/:id', async (req, res) => {
    try{
        let [catalog] = await db.query("SELECT * FROM products WHERE id=?",[req.params.id])
        res.status(200).json(catalog[0])
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})

app.listen(80, ()=>{
    console.log('Сервер запущен')
})