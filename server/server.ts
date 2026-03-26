import express from 'express'
import * as Path from 'node:path'

import checkoutRoutes from './routes/checkout.js'
import productCategoriesRoutes from './routes/product-categories.js'
import productsRoutes from './routes/products.js'
import participantsRoutes from './routes/participants.js'
import storesRoutes from './routes/stores.js'

const server = express()

server.use(express.json())

server.use('/api/v1/checkout', checkoutRoutes)
server.use('/api/v1/product-categories', productCategoriesRoutes)
server.use('/api/v1/products', productsRoutes)
server.use('/api/v1/participants', participantsRoutes)
server.use('/api/v1/stores', storesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
