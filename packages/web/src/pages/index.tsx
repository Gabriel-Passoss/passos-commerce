import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'

import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'

import { fakestore } from '../services/api'
import { api } from '../services/api'

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header/Header';

export default function Home({product}) {
  // const { user } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>Home - Passos Commerce</title>
      </Head>

      <Header />
      {/* Slides */}
      <Swiper modules={[Navigation, Pagination]} navigation pagination spaceBetween={0} slidesPerView={1} >
        <SwiperSlide><Image src="assets/slide.png" /></SwiperSlide>
        <SwiperSlide><Image src="assets/slide.png" /></SwiperSlide>
      </Swiper>

      {/* Product Section */}
      <Flex flexDirection="column" mt="2rem" align="center">
        <Text fontWeight="bold" fontSize="1.8rem" mb="3rem">EM PROMOÇÃO</Text>

        <Flex margin="0 auto">
        <Grid templateColumns="repeat(5, 1fr)" gap={10} mb="2rem" >
          {product.map((product: any, index: number) => (
            <GridItem key={index}>
              <ProductCard image={product.image} title={product.title} price={product.price} id={product.id} />
            </GridItem>
          ))}
        </Grid>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {['passos-commerce.token']: token} = parseCookies(context)
  const {data}: any = await fakestore.get('/products')

  if (!token) {
    return {
      redirect: {
        destination: '/register',
        permanent: false
      }
    }
  }

  return {
    props: {
      product: data
    }
  }
}
