export const userQueries = {
  getUser: (_: any, { id }: { id: string }) => {
    console.log('Getting user with id:', id)
    return { id, name: 'John Doe' }
  }
}
