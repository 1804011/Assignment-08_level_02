class SuccessResponse<T = undefined> {
  private success = true
  private statusCode = 200
  private message: string
  private data?: T
  private token?: string
  constructor(
    message: string,
    data: T | undefined = undefined,
    token: string | undefined = undefined,
  ) {
    this.message = message
    this.data = data
    this.token = token
  }
}
export default SuccessResponse
