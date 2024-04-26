import { FormError, KeyValuePair } from "../interfaces/index";
import Error from "./Error";

export type PermissionDeniedType = "Admin" | "User";

export type NotFoundType = "Company" | "User" | "Role"| "Project"| "Contractor";

export type BadRequestType = "Admin" | "User";

export type InvalidFormatType = "Admin" | "User";

export type AccountSuspendedType = "Admin" | "User";

export type InactiveType = "Admin" | "User";

const OPERATION_ERROR_TYPE = "operation";
const ALERT_ERROR_TYPE = "alert";
const FATAL_ERROR_TYPE = "fatal";
export interface InvalidArgsDetails {
  formError: FormError[];
  data?: any;
}

export class BadRequest extends Error {
  constructor(
    entityType: BadRequestType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      400,
      "BadRequest",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class NotFoundError extends Error {
  constructor(
    entityType: NotFoundType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      404,
      "NotFound",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class DuplicateError extends Error {
  constructor(
    entityType: NotFoundType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      409,
      "DuplicateError",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class NotModifiedError extends Error {
  constructor(
    entityType: NotFoundType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      500,
      "NoChangesDetected",
      { entityType, message, ...details },
      ALERT_ERROR_TYPE
    );
  }
}

export class DependencyError extends Error {
  constructor(
    entityType: NotFoundType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      500,
      "DependencyError",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class EmailTemplateMissingError extends Error {
  constructor(fileName: string, details: KeyValuePair = {}) {
    super(
      404,
      "EmailTemplateMissingError",
      {
        fileName,
        ...details,
      },
      FATAL_ERROR_TYPE
    );
  }
}

export class PermissionDeniedError extends Error {
  constructor(details: KeyValuePair = {}) {
    super(
      401,
      "PermissionDeniedError",
      { message: "Permission denied!", ...details },
      ALERT_ERROR_TYPE
    );
  }
}

export class WrongEmailPasswordError extends Error {
  constructor(details: KeyValuePair = {}) {
    super(500, "WrongEmailPasswordError", details, ALERT_ERROR_TYPE);
  }
}

export class InvalidFormatError extends Error {
  constructor(
    entityType: InvalidFormatType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      403,
      "InvalidFormatError",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class InactiveError extends Error {
  constructor(
    entityType: InactiveType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      403,
      "AccountInactiveError",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class AccountSuspendedError extends Error {
  constructor(
    entityType: AccountSuspendedType,
    details: KeyValuePair = {},
    message?: string
  ) {
    super(
      403,
      "AccountInactiveError",
      {
        entityType,
        message,
        ...details,
      },
      ALERT_ERROR_TYPE
    );
  }
}

export class InvalidReqArgsError extends Error {
  constructor(errDetails: InvalidArgsDetails) {
    super(400, "InvalidRequestArgsError", errDetails, OPERATION_ERROR_TYPE);
  }
}

export class SessionExpiredError extends Error {
  constructor(details: KeyValuePair = {}) {
    super(
      401,
      "SessionExpiredError",
      { message: "Session expired!", ...details },
      ALERT_ERROR_TYPE
    );
  }
}

export class InvalidTokenError extends Error {
  constructor(details: KeyValuePair = {}) {
    super(401, "InvalidTokenError", details, ALERT_ERROR_TYPE);
  }
}
