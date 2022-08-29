import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next/types"
import { parseCookies } from "nookies"

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    // if (!cookies['passos-commerce.token']) {
    //   return {
    //     redirect: {
    //       destination: '/login',
    //       permanent: false
    //     }
    //   }
    // }

    return await fn(context)
  }
}