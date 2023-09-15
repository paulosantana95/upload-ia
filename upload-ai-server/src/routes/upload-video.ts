import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline);
const __dirname = `${process.cwd()}/src/routes`;

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 50, // 50MB
    }
  })

  app.post('/videos', async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({
        error: 'Missing file input.'
      })
    }

    const extension = path.extname(data.filename);

    if (extension !== '.mp3') {
      return reply.status(400).send({
        error: 'Invalid file type, please upload a MP3.'
      })
    }

    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName);

    await pump(data.file,
      createWriteStream(uploadDestination))

    return reply.send('success')

  })
}