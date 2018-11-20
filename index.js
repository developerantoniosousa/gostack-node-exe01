const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

app.use(express.urlencoded({ extended: true }))

// Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

// Middlewares
const verifyParamSet = (req, res, next) => {
  if (req.query.age === undefined || req.query.age === '') {
    return res.redirect('/')
  }

  return next()
}

// routes
app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const age = req.body.age

  if (age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.use(verifyParamSet)

app.get('/major', (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor/', (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)
