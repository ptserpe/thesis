import { getServerSession } from '#auth'
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Client } from 'minio';

var minioClient = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});


interface UserExam{
    id:string;
    exam:string;
    importance?:string;
    place?:string;
    fileName?:string;
    filePath?:string;
    creationDate:string
}

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

                    const bucketExists = await minioClient.bucketExists(session.user.id)

                    if (!bucketExists) {
                        await minioClient.makeBucket(session.user.id, '')
                    }

                    minioClient.putObject(session.user.id, Buffer.from(examFile.originalFilename).toString('base64'), fileStream, examFile.size)

                    filePath = examFile.originalFilename
                } catch (e) {
                    reject(e)
                    return
                }
            } else {
                if (fields.id != undefined && fields.id != '') {
                    try {
                        let existingExam = await $fetch<UserExam>(process.env.HISTORY! + `/${fields.id}`, {
                            method: 'GET'
                        })
                        
                        if (existingExam.fileName != undefined && existingExam.fileName != '') {
                            await minioClient.removeObject(session.user.id, examFile.originalFilename)
                        }

                    } catch (e) {
                    }
                }
            }

            const historyExamApiBody = {
                userId: session.user.id,
                exam: fields.exam,
                place: fields.place,
                date: fields.date,
                importance: fields.importance,
                fileName: filePath,
                filePath: filePath,
            }

            let queries = {}
            if (fields.id != undefined && fields.id != '') {
                queries = {
                    id: fields.id
                }
            }

            try {
                await $fetch(process.env.HISTORY!, {
                    method: 'POST',
                    body: historyExamApiBody,
                    query:  queries
                })
                resolve({ status: 'success' })
            } catch (e) {
                reject(e);
            }
        });
    });
    return data;
})