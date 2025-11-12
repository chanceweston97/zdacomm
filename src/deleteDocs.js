
const { createClient } = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: 'i46ba7lz',
  dataset: 'production',
  apiVersion: '2025-11-12',
  token: 'skmmxD0mrwODnsMpEgH4eNlcn7DJIwOfABZfj7fMM1rlWsNjG1fQdGoqvuDGKeI9fjuSvYhEhEkjLZky3exP1IhLhDmSmSXWI2X9u9L7aCnLSOykUvi9g3EwaFDjGCQxAMsPngDzgmmPwkCMMezXJjquWJigO6dVyKfiDtpFkvTTX7xpBWrZ', // Editor/Write token
  useCdn: false,
})

const referrerId = 'e2f15353-20f1-49c0-a5f7-201d77d0497d'

async function run() {
  // 1) Unset the top-level `product` reference on the slider doc
  await client.patch(referrerId).unset(['product']).commit()
  console.log('✅ Cleared `product` reference on slider')

  // 2) Delete the product
  await client.delete(productId)
  console.log('✅ Deleted product')
}
run().catch(err => (console.error(err), process.exit(1)))
