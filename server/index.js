const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const cors = require('cors')
const ident = require('./identification')

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
app.use(ident.passport.initialize())
app.use('/', ident.router) 

app.get('/catalog', async (req, res) => {
    try{
        let where = []
        if( req.query.type ) where.push('type=' +mysql.escape(req.query.type))
        if( req.query.name ) where.push(`name LIKE "%${req.query.name}%"`)
        if( req.query.priceFrom && req.query.priceTo ) {
            where.push('price BETWEEN ' + mysql.escape(req.query.priceFrom) + ' and ' + mysql.escape(req.query.priceTo))
        }else{
            if( req.query.priceFrom ) where.push('price>=' +mysql.escape(req.query.priceFrom))
            if( req.query.priceTo ) where.push('price<=' +mysql.escape(req.query.priceTo))
        }
        
        where = ( where.length > 0 )? ' WHERE ' + where.join(' and ') : ''
        let limit = ( req.query.limitIndex )? req.query.limitIndex : 0

        let [catalog] = await db.query(`SELECT * FROM products ${where} LIMIT ${limit},20`)


        for( var i in catalog){
            catalog[i].id = catalog[i].id.toString()
        }
        
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
        catalog.id = catalog.id.toString()
        catalog.characteristic = JSON.parse((catalog.characteristic)?catalog.characteristic:null)
        res.status(200).json(catalog)
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})

app.put('/orders', async (req,res) => {
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

app.post('/users/:id', async (req,res) => {
    try{
        let id = req.params.id
        let [ client ] = await db.query(`SELECT * from users WHERE id=${id}`)
        if( !client[0]) throw new Error('Пользователь не найден')
        let data = req.body
        let sets = []
        let prepare = []
        Object.keys(data).map((key)=>{
            if( data[key] == '' ){
                data[key] = null
            }
            sets.push((key!=='dt_birth')? key + '=?' : key + '=STR_TO_DATE(?,"%d.%m.%Y")')
            prepare.push(data[key])
        })
        
        let [ result] = await db.query(`UPDATE users SET ${sets.join(', ')} WHERE id=${id}`,prepare)
        if( !result.changedRows ) throw new Error('Не удалось обновить данные')
        res.status(200).end()
    }catch( err ){
        console.log(err)
        res.status(400).json(err)
    }
})


app.listen(80, ()=>{
    console.log('Сервер запущен')
})