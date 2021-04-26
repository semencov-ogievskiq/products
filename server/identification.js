/**
 * Модуль формирует набор методов и маршрутов, реализующих систему идентификации пользователя.
 */
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const moment = require('moment')

const config = {
    jwt_options: {
        issuer: 'server',
    },
    secret: 'secret'
}

async function identification(jwt_payload){
    if(!jwt_payload.aud){
        // Ошибка, токен не содержит требуемых данных
        return false
    }else{
        // если в токене есть id сессии запрашиваем ее и проверяем токен
        let [ [ client ] ] = await db.query("SELECT id,mail,f,i,o,DATE_FORMAT(dt_birth,'%d.%m.%Y') dt_birth FROM users WHERE id=?",[jwt_payload.aud])
        if( client ){
            return {...client}
        }else{
            return false
        }
    }
}

// Стратегия проверки passport js
passport.use(
    new JwtStrategy(
        { 
            secretOrKey: config.secret, 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: config.jwt_options.issuer
        },
        async function(jwt_payload, next){
            let client = await identification(jwt_payload)
            if(typeof client === "object"){
                next(null, client)
            }else{
                next(null, false)
            }
        }
    )
)

// --------------------------------------------------
// Объявление методов модуля
// --------------------------------------------------

/**
 * Метод формирования токена.
 * 
 * @param {Number} _audience id пользователя в БД
 * @returns {String} Сформированный JWT
 */
const createToken = function(_audience){
    let options = { 
        ...config.jwt_options,
        audience: _audience,
    }
    return jwt.sign({},config.secret,options)
}

// --------------------------------------------------
// Объявление маршрутов модуля
// --------------------------------------------------

router.post('/login', async function(req, res){
    let hash_password = crypto.SHA512(req.body.password)
    var [row] = await db.query("SELECT id FROM users WHERE mail=? and hash_password=?",[req.body.mail,hash_password.toString()])
    if(!row.length){
        res.status(400).json({
            status: false,
            typeErr: 2,
            err: 'Пользователь не найден'
        })
    }else{
        let id_user = row[0].id.toString()
        res.status(200).json({
            status: true,
            token: createToken( id_user )
        })
    }
})


/**
 * Маршрут получения данных текущего пользователя
 * # Только для авторизованных пользователей
 */
router.get('/clientData', passport.authenticate('jwt',{session: false}), async function(req, res){
    try{
        res.status(200).json( {client: req.user} )
    }catch( err ){
        console.log(err)
        res.status(400).json( err )
    }
})


module.exports = {
    router: router,             // Маршруты авторизации/идентитификации
    passport: passport,         // Настроенный passport.js
}