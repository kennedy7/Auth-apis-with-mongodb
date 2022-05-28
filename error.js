const AuthenticationError = generaterr('AuthenticationError');

module.exports = {
  AuthenticationError: AuthenticationError,
  AuthenticationError,
  IncorrectUsernameError: generaterr('IncorrectUsernameError', null, { inherits: AuthenticationError }),
  IncorrectPasswordError: generaterr('IncorrectPasswordError', null, { inherits: AuthenticationError }),
  MissingUsernameError: generaterr('MissingUsernameError', null, { inherits: AuthenticationError }),
}