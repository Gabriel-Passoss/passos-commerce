import { useContext, useEffect, useState } from "react";
import { Avatar, Button, Flex, HStack, Image, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

import { api } from "../../services/AuthClient";

export default function Header() {

  return (
   <Flex bg="#772EDB" h="6.5rem" align="center" justify="space-around">
   <Flex align="center" mr="2rem">
     <HStack spacing="3rem">
       <Button variant="none">
         <Image src="/assets/menu.svg" h="1.4rem" />
       </Button>
       <Link href="/">
         <Image src="/assets/logo.svg" h="3.31rem" />
       </Link>
     </HStack>
   </Flex>

   <InputGroup w="31.25rem" alignItems="center">
     <InputLeftElement
       children={<AiOutlineSearch color="gray" />}
     />
     <Input type='text' placeholder='Busque aqui' bg="#D9D9D9" focusBorderColor='none' autoComplete="off" />
   </InputGroup>

   <Flex align="center">
       <Text color="#E6E6E6" fontWeight="semibold" mr="1rem">Bem vindo(a), Gabriel</Text>
       <Avatar src="https://github.com/Gabriel-Passoss.png" h="3.5rem" w="3.5rem" mr="2rem"/>
       <Button leftIcon={<AiOutlineShoppingCart />} colorScheme='purple' variant='solid'>
         Carrinho
       </Button>

   </Flex>
 </Flex>

)}