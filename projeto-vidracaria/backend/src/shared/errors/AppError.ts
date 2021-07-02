class AppError {
  public readonly message: string;

  public readonly statusCode: number; // HTTP CODE ERROR

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
export default AppError;
