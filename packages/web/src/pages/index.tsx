import Head from 'next/head'
import { Avatar, Box, Button, Flex, Grid, GridItem, HStack, Icon, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'

import fakestore from '../services/api'

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '../components/ProductCard/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fakestore.get("/products").then(res => {
      setProducts(res.data)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Passos Commerce</title>
      </Head>

      {/* Header */}
      <Flex bg="#772EDB" h="6.5rem" align="center" justify="space-evenly">
        <Flex align="center" mr="1rem">
          <HStack spacing="3rem">
            <Button variant="none">
              <Image src="assets/menu.svg" h="1.4rem" />
            </Button>
            <Image src="assets/logo.svg" h="3.31rem" />
          </HStack>
        </Flex>

        <InputGroup w="31.25rem" alignItems="center">
          <InputLeftElement
            children={<AiOutlineSearch color="gray" />}
          />
          <Input type='text' placeholder='Busque aqui' bg="#D9D9D9" focusBorderColor='none' autoComplete="off" />
        </InputGroup>

        <Flex align="center">
          <HStack spacing="1rem">
            <Text color="#E6E6E6" fontWeight="semibold">Bem vindo(a), Gabriel</Text>
            <Avatar src="https://github.com/Gabriel-Passoss.png" h="3.5rem" w="3.5rem" />
            <Button leftIcon={<AiOutlineShoppingCart />} colorScheme='purple' variant='solid' ml="3rem">
              Carrinho
            </Button>
          </HStack>

        </Flex>
      </Flex>

      {/* Slides */}
      <Box>
      <Swiper modules={[Navigation, Pagination]} navigation pagination spaceBetween={0} slidesPerView={1} >
        <SwiperSlide><Image src="assets/slide.png" /></SwiperSlide>
        <SwiperSlide><Image src="assets/slide.png" /></SwiperSlide>
      </Swiper>
      </Box>

      <Flex flexDirection="column" mt="2rem" align="center" mb="2rem">
        <Text fontWeight="bold" fontSize="1.8rem">EM PROMOÇÃO</Text>
      </Flex>

      <Flex justify="center" overflow="hidden">
        <Grid templateColumns="repeat(5, 1fr)" gap={10} mb="2rem" >
          {products.map((product: any, index: number) => (
            <GridItem key={index}>
              <ProductCard image={product.image} title={product.title} price={product.price} id={product.id} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  )
}
