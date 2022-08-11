import { Box, Flex, Text, Button, Image, Link, useMediaQuery } from "@chakra-ui/react";
import Head from 'next/head'
import SignInForm from '../../components/Form/SignInForm';

export default function Login() {
  const [isLargerThan] = useMediaQuery('(min-width: 934px)')

  return (
    <>
      <Head>
        <title>Cadastro - Passos Commerce</title>
      </Head>
      {/* Header */}
      <Flex w="100vw" h="10vh" sx={isLargerThan ? { background: 'linear-gradient(90deg, rgba(119,46,219,1) 60%, rgba(255,255,255,1) 60%);' } : { background: '#772EDB' }} align="center" justify="space-between">
        <Image src="assets/logo.svg" h="2.8rem" w={{ md: "12.5rem", sm: "10rem", xsm: "9rem" }} ml="38px" />
        <Flex align="center" mr="3.4rem">
          <Button colorScheme="purple">Log In</Button>
        </Flex>
      </Flex>

      <Flex h="90vh" align={isLargerThan ? null : 'center'}>
        {/* Left side */}
        {isLargerThan ? <Box w="60vw" bg="#772EDB">
          <Flex flexDirection="column" align="center">
            <Text fontSize={{ '2xl': "2.5rem", sm: "2rem" }} fontFamily="Inter" fontWeight="medium" textAlign="center" lineHeight="60px" color="#E6E6E6" mb="60px" mt="100px">
              O maior e mais seguro site <br />para suas compras online
            </Text>
            <Image src="assets/hero.svg" w="55rem" h="33.125rem" />
          </Flex>
        </Box> : null}


        {/* Right side */}
        <Flex align="center" w="40vw" mt="60px" flexDirection="column" margin={isLargerThan ? null : '0 auto'}>
          <Text fontWeight="bold" fontSize="2.5rem" whiteSpace="nowrap" mb="5rem">Crie a sua conta</Text>
          <Flex flexDirection="column" justify="center">
            <SignInForm />
          </Flex>

          <Flex flexDirection="column" align="flex-start">
            <Text mt="1rem" whiteSpace={isLargerThan ? null : "nowrap"}>Ao se cadastrar você concorda com nossa comunicação <br />e nossos termos de uso</Text>
            <Text fontWeight="medium" mt="1rem">Já tem uma conta?
              <Link href="http://localhost:3000/login" color="#772EDB" ml="4px">Acesse aqui</Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}