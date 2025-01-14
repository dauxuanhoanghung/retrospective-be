export async function getGraphqlUploadExpress() {
  const graphqlUpload = await import('graphql-upload/graphqlUploadExpress.mjs')
  return graphqlUpload.default
}
