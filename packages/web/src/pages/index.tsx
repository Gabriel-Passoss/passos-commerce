import Head from 'next/head'

import { Flex, Grid, GridItem, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'

import { passosAPI } from '../services/api'
import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '../components/ProductCard/ProductCard';
import Header from '../components/Header/Header';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Home({product}) {
  console.log(product)

  return (
    <>
      <Head>
        <title>Home - Passos Commerce</title>
      </Head>

      <Header />
      {/* Slides */}
      <Swiper modules={[Navigation, Pagination]} navigation pagination spaceBetween={0} slidesPerView={1} >
        <SwiperSlide><Image src="assets/slide.jpg" /></SwiperSlide>
        <SwiperSlide><Image src="assets/slide.jpg" /></SwiperSlide>
      </Swiper>

      {/* Product Section */}
      <Flex direction="column" w={{ base: '100%', sm: '540px', md: '720px', lg: '960px', xl: '1140px' }} margin="0 auto" pt={['65px', '15px']} pb="15px" px="15px" align="center">
        <Text fontWeight="bold" fontSize="1.8rem" mb="3rem">EM PROMOÇÃO</Text>

        <Flex justify="center">
        <Grid templateColumns={{base: "repeat(3, 1fr)", md: "repeat(5, 1fr)"}} gap={10} mb="2rem" >
          {product.map((product: any, index: number) => (
            <GridItem key={index}>
              <ProductCard image={product.image_URL} title={product.name} price={product.price} id={product.id} />
            </GridItem>
          ))}
        </Grid>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const {data}: any = await passosAPI.get('/products')
  
  return {
    props: {
      product: data
    }
  }
})

