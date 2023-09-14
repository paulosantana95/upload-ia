import { fastify } from 'fastify'
import figlet from 'figlet'
import { getAllPromptsRoute } from './routes/get-all-prompts'

const app = fastify()

app.register(getAllPromptsRoute)

app.listen({ port: 3333 })
  .then(() => {
    console.log(figlet.textSync('Fastify', { font: "Small" }));
    console.log(figlet.textSync('Server', { font: "Small" }));
    console.log(figlet.textSync('Running!', { font: "Small" }));
  });