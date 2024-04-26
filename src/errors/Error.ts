export type ErrorSeverity = "operation" | "alert" | "fatal";
export default class CustomError extends Error {
  public type: string;
  public details: any;
  public severity: ErrorSeverity;
  public status: string;
  public statusCode: number;
  constructor(
    statusCode: number,
    type: string,
    details: any = {},
    severity: ErrorSeverity
  ) {
    super(
      JSON.stringify({
        type,
        details,
      })
    );
    this.status = `${statusCode}`.startsWith("3") ? "fail" : "error";
    this.type = type;
    this.details = details;
    this.severity = severity;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
