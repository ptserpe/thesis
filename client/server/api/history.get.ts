import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    

    interface UserExam{
        id:string;
        exam:string;
        importance?:string;
        place?:string;
        fileName?:string;
        filePath?:string;
        creationDate:string
    }

    const session = await getServerSession(event)
    if (!session) {
        return { status: 'unauthenticated!' }
    }

    try {
        var res = await $fetch<UserExam[]>(process.env.HISTORY!, {
            method: 'GET',
            query: {
                userId: session.user?.id
            },
        })

        console.log(res)
        
        return { ...res }
    } catch (e) {
        console.log(e)
        return { status: 'failed' }
    }
})