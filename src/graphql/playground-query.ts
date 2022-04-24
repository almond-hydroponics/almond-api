export const playgroundQuery = `mutation signup {
  signup(
    data: {
      firstName: "Sample"
      lastName: "User"
      email: "user1@example.com"
      password: "admin1234"
    }
  ) {
    user {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
      version
    }
    errors {
      field
      message
    }
  }
}

mutation login {
  login(
    data: {
      email: "user1@example.com",
      password: "admin1234"
    }
  ) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      field
      message
    }
  }
}

mutation refreshToken {
  refreshToken {
    user {
      id
      firstName
      lastName
      email
    }
  }
}

mutation logout {
  logout
}
`
