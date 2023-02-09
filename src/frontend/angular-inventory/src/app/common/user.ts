export class User {
  constructor(public id: number,
              public name: string,
              public username: string,
              public password: string,
              public role: string) {
  }
}

export class Credential {
  constructor(public username: string,
              public password: string) {
  }
}
