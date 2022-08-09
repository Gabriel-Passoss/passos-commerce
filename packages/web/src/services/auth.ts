import { v4 as uuid } from 'uuid'

type SignInRequestData = {
  name: string,
  email: string,
  password: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()

  return {
    token: uuid(),
    user: {
      name: 'Gabriel dos Passos',
      avatar_url: 'https://github.com/Gabriel-Passoss.png'
    }
  }
}

export async function recoverUserInfo() {
  await delay()

  return {
    user: {
      name: 'Gabriel dos Passos',
      avatar_url: 'https://github.com/Gabriel-Passoss.png'
    }
  }
}