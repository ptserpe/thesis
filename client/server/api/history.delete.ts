import { getServerSession } from '#auth'
import { Client } from 'minio';

var minioClient = new Client({
    endPoint: process.env.MINIO_HOST!,
    port: parseInt(process.env.MINIO_PORT!),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS!,
    secretKey: process.env.MINIO_SECRET!
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

    const reqbody = await readBody(event)

    try {
        const existingExam = await $fetch<UserExam>(process.env.HISTORY! + `${reqbody.id}`, {
            method: 'GET'
        })

        if (existingExam.fileName != null && existingExam.fileName != '') {
            const objectName = Buffer.from(existingExam.fileName).toString('base64')
            
            await minioClient.removeObject(session.user.id, objectName)
            
        }

        await $fetch<UserExam>(process.env.HISTORY! + `${reqbody.id}`, {
            method: 'DELETE'
        })

    } catch (e) {
    }
    
    return {};
})