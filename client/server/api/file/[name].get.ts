import { getServerSession } from '#auth'
import { Client } from 'minio';
import mime from 'mime';

var minioClient = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});


export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    if (!session) {
        return { status: 'unauthenticated!' }
    }

    try {
        const decodeParam = decodeURI(event.context.params.name)
        const objectName = Buffer.from(decodeParam).toString('base64')
        const bucketName = session.user!.id
        
        const stat = await minioClient.statObject(bucketName, objectName)
        

        const mimetype = mime.getType(objectName);
        event.node.res.writeHead(200, {
            "Content-Type": mimetype,
            "Content-Disposition" : `attachment; filename=${decodeParam}`,
            "Content-length": stat.size,
        });

        const stream = await minioClient.getObject(bucketName, objectName)
        return sendStream(event, stream)
    } catch (e) {
        console.log(e)
        setResponseStatus(500)
    }
})