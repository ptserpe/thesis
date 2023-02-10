import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return { status: 'unauthenticated!' }
    }

    const reqbody = await readBody(event)

    const apibody = {
        id: session.user.id,
        firstName: reqbody.firstName,
        email: reqbody.email,
        lastName: reqbody.lastName,
        age: reqbody.age,
        gender: reqbody.gender,
        amka: reqbody.amka,
        height: reqbody.height,
        weight: reqbody.weight,
        phone: reqbody.phone,
        nationality: reqbody.nationality
    }
    
    try {
        await $fetch(process.env.PROFILE + session.user?.id, {
            method: 'POST',
            body: apibody
        })

        return { status: 'success' }
    } catch (e) {
        console.log(e)
        return { status: 'failed' }
    }
})