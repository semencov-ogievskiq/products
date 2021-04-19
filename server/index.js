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
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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
        catalog = catalog[0]
        catalog.characteristic = JSON.parse((catalog.characteristic)?catalog.characteristic:null)
        res.status(200).json(catalog)
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})

app.post('/orders', async (req,res) => {
    try{
        let data = req.body
        data.products = JSON.stringify(data.products)
        
        Object.keys(data).map((key)=>{
            if( data[key] == '' ){
                data[key] = null
            }
        })
        
        let [ result] = await db.query("INSERT INTO orders SET ?",[req.body])
        if( !result.insertId ) throw new Error('Не удалось зарегистрировать заказ')
        res.status(200).end()
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})

app.listen(80, ()=>{
    console.log('Сервер запущен')
})