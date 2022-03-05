export class ApiError extends Error {
  constructor(statusCode = 500, message = "Internal server error") {
    super(message);
    this.statusCode = statusCode;
  }
}
