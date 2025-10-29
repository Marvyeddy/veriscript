export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message)
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, message)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Forbidden") {
    super(403, message)
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(404, message)
    this.name = "NotFoundError"
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, message)
    this.name = "ConflictError"
  }
}
