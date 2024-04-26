export const errorResponseMessages = {
  PERMISSION_DENIED: "Permission Denied",
  NO_CHANGES: "No changes detected",
  CREATE_UNSUCCESSFUL: "Create unsuccessful",
  UPDATE_UNSUCCESSFUL: "Update unsuccessful",
  DELETE_UNSUCCESSFUL: "Delete unsuccessful",
  WRONG_EMAIL_PASSWORD: "These credentials do not match our records!",
  WRONG_OLD_PASSWORD: "Wrong old password",
  WRONG_EMAIL: "Wrong email entered!",
  WRONG_PASSWORD: "Wrong password entered!",
  WRONG_VERIFICATION_CODE: "Wrong verification code entered!",
  SUSPENDED: "Suspended Account",
  INACTIVE: "Inactive Account",
  INVALID_FORMAT: "Invalid Format",
  DUPLICATE_EMAIL: "Email already exists!",
  COMPANY_NAME_DUPLICATE: "Company name already exists!",
  COMPANY_REF_NO_DUPLICATE: "Company reference no already exists!",
  COMPANY_MAIL_DUPLICATE: "Company email already taken!",
  USER_MAIL_DUPLICATE: "User email already taken!",
  COMPANY_ID_NULL: "Company Id is null!",
  LOGIN_TYPE: "User",
  USER_COMPANY_CREATION_UNSUCCESSFUL: "Company and user creation unsuccessful",
  SUSPEND_USER: "Invalid user ID!",
  ERROR_IN_USER_DELETION: "Invalid user details",
  NOT_FOUND: "Not found",
  YOU_CANT_SUSPEND_YOU: "You cannot suspend your account",
  YOU_CANT_DELETE_YOU: "You cannot delete your account",
  CANT_DELETE_SUPER_ADMIN: "Super admin cannot be deleted",
  USER_NOT_VERIFIED: "Please verify your account",
  USER_NOT_FROM_THE_COMPANY: "This user not from this company",
};

export const successResponseMessages = {
  SUCCESSFUL_LOGIN: "Logged in successfully",
  SUCCESSFUL_EMAIL_SENT: "Email sent successfully. check your email!",
  SUCCESSFUL_EMAIL_VERIFICATION: "Email Verified successfully",
  SUCCESSFUL_PASSWORD_UPDATE: "Password Updated successfully",
  SUCCESSFUL_USER_CREATION:
    "Success! The user account has been successfully created.",
  SUCCESSFUL_USER_UPDATE:
    "Great news! The user details have been updated successfully.",
  SUCCESSFUL_USER_SUSPENDED:
    "Mission accomplished! The user has been successfully suspended.",
  SUCCESSFUL_USER_ACTIVATION: "Success! The user is now officially activated.",
  SUCCESSFUL_USER_DELETED:
    "Mission complete! The user has been successfully removed.",
    SUCCESSFUL_PROJECT_CREATION:
    "Success! The project has been successfully created.",
  SUCCESSFUL_PROJECT_UPDATE:
    "Great news! The project details have been updated successfully.",
  SUCCESSFUL_PROJECT_DELETION:
    "Mission complete! The project has been successfully removed.",
  SUCCESSFUL_CONTRACTOR_CREATION:
    "Success! The contractor has been successfully created.",
  SUCCESSFUL_CONTRACTOR_UPDATE:
    "Great news! The contractor details have been updated successfully.",
  SUCCESSFUL_CONTRACTOR_DELETION:
    "Mission complete! The contractor has been successfully removed.",
};

export const regularExpressions = {
  UUID_REGEX:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
  EMAIL_REGEX: /^[a-zA-Z0-9](.?)+@[a-zA-Z0-9]+.[A-Za-z]+$/,
  PHONE_REGEX:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
};

export const apiUrls = {
  BASEURL: "http://localhost:8000",
  AUTH: "/session",
  LOG_IN: "/login",
  LOG_OUT: "/logout",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  REFRESH_ACESS_TOKEN: "/refresh-access-token",
  Create_USER: "/createUser",
};

