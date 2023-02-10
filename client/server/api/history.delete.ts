import { getServerSession } from '#auth'
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