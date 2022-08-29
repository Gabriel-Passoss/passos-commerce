import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { Flex, Button, Text, Image, Box, Heading, GridItem, Grid, Stack, useBreakpointValue, Icon } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { passosAPI } from '../../services/api';
import Header from '../../components/Header/Header';
import 'swiper/css';
import 'swiper/css/pagination';


interface ProductProps {
  product: {
    description: string,
    name: string,
    price: number,
    id: number,
    image_URL: string
  },
  related: {
    description: string
    name: string,
    price: number,
    map: any,
    image_URL: string
  }
}

export default function Product({ product, related }: ProductProps) {
  const [swiper, setSwiper] = useState<any>(null)
  const perView = useBreakpointValue({base: 2, md: 4})

  function ButtonPrev() {
    return (
      <Flex
        justify="center"
        align="center"
        w="40px"
        h="40px"
        bg="#ccc"
        cursor="pointer"
        transition="0.3s"
        borderRadius="5px"
        display={{ base: 'none', lg: 'flex' }}
        _hover={{
          background: '#999',
        }}
        onClick={() => swiper.slidePrev()}
      >
        <Icon as={HiChevronLeft} fontSize="25px" />
      </Flex>
    );
  }

  function ButtonNext() {

    return (
      <Flex
        justify="center"
        align="center"
        w="40px"
        h="40px"
        bg="#ccc"
        cursor="pointer"
        transition="0.3s"
        borderRadius="5px"
        display={{ base: 'none', lg: 'flex' }}
        _hover={{
          background: '#999',
        }}
        onClick={() => swiper.slideNext()}
      >
        <Icon as={HiChevronRight} fontSize="25px" />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Flex direction="column" w={{ base: '100%', sm: '540px', md: '720px', lg: '960px', xl: '1140px' }} margin="0 auto" pt={['65px', '40px']} pb="15px" px="15px">
        <Flex w="100%" mt="15px" mb="50px">
          <Grid w="100%" templateColumns={['1fr', '1fr 1fr']} gap={['15px', '30px']}>
            <GridItem w="100%">
              <Box borderRadius="10px" border="3px solid #ebebeb" overflow="hidden" mb="20px">
                <Image src={product.image_URL} alt="Iphone" />
              </Box>
              <Grid w="100%" templateColumns={['1fr 1fr 1fr 1fr']} gap={['15px', '30px']}>
                <GridItem>
                  <Image src="/assets/iphone.png" alt="Iphone" />
                </GridItem>
                <GridItem>
                  <Image src="/assets/iphone.png" alt="Iphone" />
                </GridItem>
                <GridItem>
                  <Image src="/assets/iphone.png" alt="Iphone" />
                </GridItem>
                <GridItem>
                  <Image src="/assets/iphone.png" alt="Iphone" />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem w="100%">
              <Flex direction="column" w="100%">
                <Flex background="#28A745" borderRadius="full" justify="center" alignSelf="flex-start">
                  <Text textTransform="uppercase" color="#fff" fontSize="0.7rem" p="3px 10px" fontWeight="bold">Em estoque</Text>
                </Flex>
                <Box mt="10px">
                  <Text fontWeight="semibold" fontSize="2rem" lineHeight="2.5rem">{product.name}</Text>
                  <Text color="#999999" fontSize="0.7rem" mt="0.5rem" textTransform="uppercase">Código: {product.id}</Text>
                </Box>
                <Flex mt="3.5rem" align="center">
                  <Image src="/assets/brand.png" alt="Apple" width="80px" height="80px" />
                  <Flex direction="column" ml="1rem" w="30%" align="start" bgGradient="linear-gradient(0deg,#fff 20%,rgba(255,255,255,0) 90%)">
                    <Heading fontSize="1rem">Apple</Heading>
                    <Text fontSize="0.6rem" mt="0.2rem">é uma empresa multinacional norte-americana que tem o objetivo de projetar e comercializar produtos eletrônicos de consumo...</Text>
                  </Flex>
                </Flex>
                <Box mt="2.5rem">
                  <Text fontWeight="bold" fontSize="2rem" mt="0.7rem">U$ {product.price}</Text>
                  <Text fontSize="0.92rem">R$2.233,28 / GS 2.787.556</Text>
                </Box>
                <Box mt="2.5rem">
                  <Button leftIcon={<FiShoppingCart />} colorScheme="blue" w="100%">
                    Adicionar
                  </Button>
                </Box>
                <Box mt="3.5rem">
                  <Text fontWeight="bold" fontSize="1.2rem">Resumo:</Text>
                  <Text>{product.description}</Text>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>

        <Flex justify="space-between" mb="20px">
          <Heading size="lg">Relacionados</Heading>
          <Stack direction="row">
            <ButtonPrev />
            <ButtonNext />
          </Stack>
        </Flex>
        <Flex w="100%" mb="2rem">
          <Swiper modules={[Pagination]} spaceBetween={7} slidesPerView={perView} onSwiper={setSwiper}>
            {related.map((product: any, index: number) => (
              <SwiperSlide key={index}>
                <ProductCard image={product.image_URL} title={product.title} price={product.price} id={product.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
    </>
  )
}

export async function getStaticPaths() {

  const { data } = await passosAPI.get('/products');

  const paths = data.map((product: any) => ({
    params: { id: product.id.toString() },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }: any) {
  const { data } = await passosAPI.get(`/products/${params.id}`);
  const { data: related } = await passosAPI.get(`/products?limit=10`);

  return {
    props: {
      product: data,
      related: related,
    },
    revalidate: 60,
  }
}