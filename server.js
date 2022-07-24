if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express= require('express')
const app= express()
const expressLayouts= require('express-ejs-layouts')
const indexRouter= require('./routes/index.js')
const authorRouter= require('./routes/authors.js')
const bookRouter= require('./routes/books.js')
const bodyParser= require('body-parser')
const methodOverride= require('method-override')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(expressLayouts)
app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb',extended:false }))
app.use(methodOverride('_method'))

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db= mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('Connected to Mongoose...'))

app.use('/', indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)