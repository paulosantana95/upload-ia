import figlet from 'figlet'

import { fastify } from 'fastify'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const app = fastify()


app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);

app.listen({ port: 3333 })
  .then(() => {
    console.log(figlet.textSync('Fastify', { font: "Small" }));
    console.log(figlet.textSync('Server', { font: "Small" }));
    console.log(figlet.textSync('Running!', { font: "Small" }));
  });