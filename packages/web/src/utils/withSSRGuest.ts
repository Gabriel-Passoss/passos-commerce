import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next/types"
import { parseCookies } from "nookies"

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    if (cookies['passos-commerce.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return await fn(context)
  }
}