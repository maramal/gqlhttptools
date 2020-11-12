export default class GQLHTTPToolsError {
  constructor(public message: string, public exception: any, public status: number) {}
}
