import figlet from 'figlet'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors';
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { create } from 'domain'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAICompletionRoute } from './routes/generate-ai-completion'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAICompletionRoute);

app.listen({ port: 3333 })
  .then(() => {
    console.log(figlet.textSync('Fastify', { font: "Small" }));
    console.log(figlet.textSync('Server', { font: "Small" }));
    console.log(figlet.textSync('Running!', { font: "Small" }));
  });