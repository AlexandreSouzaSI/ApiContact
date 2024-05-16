export class UserNotExistsError extends Error {
  constructor() {
    super('Contact not exist')
  }
}
