import { getServerSession } from '#auth'
import formidable from "formidable";
import fs from "fs";
import path from "path";
import {Client} from 'minio';



export default defineEventHandler(async (event) => {


    const session = await getServerSession(event)
    if (!session) {
        return { status: 'unauthenticated!' }
    }

    const form = formidable({ multiples: false });
    const data = await new Promise((resolve, reject) => {
        form.parse(event.node.req, async (err: any, fields: any, files: any) => {
            if (err) {
                reject(err);
                return
            }

            const examFile = files.file;
            var filePath = ''
            if (examFile != null) {
                var fileStream = fs.createReadStream(examFile.filepath);

                try {
                    var minioClient = new Client({
                        endPoint: 'localhost',
                        port: 9000,
                        useSSL: false,
                        accessKey: 'minioadmin',
                        secretKey: 'minioadmin'
                    });

                    const bucketExists = await minioClient.bucketExists(session.user.id)

                    if (!bucketExists) {
                        await minioClient.makeBucket(session.user.id, '')
                    }

                    minioClient.putObject(session.user.id, examFile.originalFilename, fileStream, examFile.size)

                    filePath = examFile.originalFilename
                } catch (e) {
                    reject(e)
                    return
                }
            }

            const historyExamApiBody = {
                userId: session.user.id,
                exam: fields.exam,
                place: fields.place,
                importance: fields.importance,
                fileName: filePath,
                filePath: filePath,
            }

            try {
                await $fetch(process.env.HISTORY!, {
                    method: 'POST',
                    body: historyExamApiBody
                })

                return { status: 'success' }
            } catch (e) {
                reject(e);
            }
        });
    });


    return data;
})