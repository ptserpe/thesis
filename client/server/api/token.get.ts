import { getServerSession } from '#auth'
export default eventHandler(async (event) => {
  return await getServerSession(event)
})