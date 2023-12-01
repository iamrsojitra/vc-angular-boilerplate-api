export const MESSAGES = {
  COMMON_ERRORS: {
    INTERNAL_SERVER_ERROR: 'Internal server error...',
  },
  ERROR: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Not Found',
  },
  USER: {
    USER_CREATED_SUCCESSFULLY: 'User created successfully',
    USER_ALREADY_EXIST: 'Already existed USER',
    USER_LIST_LOADED_SUCCESS: 'All user data found successfully',
    USER_DETAIL_LOADED_SUCCESS: 'User data loaded successfully',
    USER_UPDATED_SUCCESS: 'User data updated successfully',
    VALIDATION: {
      NAME: {
        IS_ALPHA: 'Name must contain alphabetic value',
        MIN_LENGTH: 'Name should be at least 5 to 20 letter long',
        MAX_LENGTH: 'Name should be at least 5 to 20 letter long',
        REQUIRED: 'Name is required',
        VALID: 'Please enter valid name value',
      },
      EMAIL: {
        IS_EMAIL: 'Please enter valid email value',
        MAX_LENGTH: 'Email should be at least 5 to 20 letter long',
        REQUIRED: 'Email is required',
      },
      ROLE: {
        REQUIRED: 'Role is required',
        IS_ALPHA: 'Role must contain alphabetic value',
      },
      PASSWORD: {
        REQUIRED: 'Password is required',
      },
    },
  },
  AUTH: {
    LOGGED_IN_SUCCESS: 'LoggedIn successfully',
    INVALID_PASSWORD: 'Invalid password',
    USER_NOT_EXIST: 'User not exist',
    PASSWORD_UPDATED_SUCCESS: 'Password updated successfully',
    FORGET_PASSWORD_SENT_MAIL_SUCCESS:
      'Please check your register mail to reset your password',
  },
  PARTNER: {
    USER_CREATED_SUCCESSFULLY: 'Partner created successfully',
    USER_ALREADY_EXIST: 'Already existed partner',
    USER_LIST_LOADED_SUCCESS: 'All partner data found successfully',
    USER_DETAIL_LOADED_SUCCESS: 'Partner data loaded successfully',
    USER_UPDATED_SUCCESS: 'Partner data updated successfully',
    USER_DELETED_SUCCESS: 'User data deleted successfully',
    VALIDATION: {
      NAME: {
        IS_ALPHA: 'Name must contain alphabetic value',
        MIN_LENGTH: 'Name should be at least 5 to 20 letter long',
        MAX_LENGTH: 'Name should be at least 5 to 20 letter long',
        REQUIRED: 'Name is required',
        VALID: 'Please enter valid name value',
      },
      EMAIL: {
        IS_EMAIL: 'Please enter valid email value',
        MAX_LENGTH: 'Email should be at least 5 to 20 letter long',
        REQUIRED: 'Email is required',
      },
      STREET: {
        REQUIRED: 'Street is required',
      },
      CITY: {
        REQUIRED: 'City is required',
      },
      ZIP: {
        REQUIRED: 'Zip is required',
      },
      COUNTRY: {
        REQUIRED: 'Country is required',
      },
      COMPANY_NAME: {
        IS_ALPHA: 'Company name must contain alphabetic value',
        MIN_LENGTH: 'Company name should be at least 5 to 20 letter long',
        MAX_LENGTH: 'Company name should be at least 5 to 20 letter long',
        REQUIRED: 'Company name is required',
        VALID: 'Please enter valid company name value',
      },
      PHONE_NUMBER: {
        IS_NUMBER: 'Phone number must contain numeric value',
        MIN_LENGTH: 'Phone number should be at least 10 to 20 letter long',
        MAX_LENGTH: 'Phone number should be at least 10 to 20 letter long',
        REQUIRED: 'Phone number is required',
      },
      USER: {
        REQUIRED: 'User id is required',
      },
      IS_ACTIVE: {
        REQUIRED: 'Status is required',
      },
      UUID: {
        REQUIRED: 'UUID is required',
      },
      PARTNER_ID: {
        REQUIRED: 'PartnerId is required',
      },
    },
  },
};
