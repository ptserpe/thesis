import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    

    // interface UserProfile{
    //     email:string;
    //     lastName:string;
    //     firstName:string;
    //     amka:string;
    //     age:number;
    //     phone: string;
    //     nationality: string;
    //     gender: string;
    //     weight: number;
    //     height: number;
    //     id:string;
    // }

    // const session = await getServerSession(event)
    // if (!session) {
    //     return { status: 'unauthenticated!' }
    // }

    // try {
    //     var res = await $fetch<UserProfile>(process.env.HISTORY + session.user?.id, {
    //         method: 'GET',
    //     })

    //     console.log(res)
        
    //     return { ...res }
    // } catch (e) {
    //     console.log(e)
    //     return { status: 'failed' }
    // }
})