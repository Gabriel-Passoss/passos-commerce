import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { ErrorMessage, Field, Form, Formik, } from 'formik'
import * as yup from 'yup'

import { Stack, FormControl, InputLeftElement, Input, FormLabel, InputGroup, Button, Box, Text } from '@chakra-ui/react'

import { HiOutlineMail } from 'react-icons/hi'
import { BsKey } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

export default function SignInForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const { signIn } = useContext(AuthContext)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object({
        email: yup.string().email("Endereço de email invalido").min(10, "Precisa ter pelo menos 20 caracteres").required("Esse campo é obrigatório"),
        password: yup.string().required("Esse campo é obrigatório")
      })}
      onSubmit={async (values) => {
        setIsLoading(true)
        await signIn(values)
      }}>
      <Form>
        
        <Field name="email">
          {({field}) => (
            <FormControl isRequired mt="1.5rem">
            <FormLabel>Endereço de e-mail</FormLabel>
            <InputGroup>
              <InputLeftElement children={<HiOutlineMail size={20} />} />
              <Input {...field} id="email" type='email' placeholder="jhondoe@email.com" w={{ '2xl': "32rem", xl: "25rem", lg: "25rem", md: "22rem", sm: "25rem", xsm: "20rem" }} />
            </InputGroup>
          </FormControl>
          )}
        </Field>
        <Text fontWeight="medium" fontSize="0.8rem" color="#772EDB">
          <ErrorMessage name="email" />
        </Text>

        <Field name="password">
          {({field}) => (
            <FormControl isRequired mt="1.5rem">
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <InputLeftElement children={<BsKey size={20} />} />
              <Input {...field} id="password" type='password' placeholder="Senha" w={{ '2xl': "32rem", xl: "25rem", lg: "25rem", md: "22rem", sm: "25rem", xsm: "20rem" }} />
            </InputGroup>
          </FormControl>
          )}
        </Field>
        <Text fontWeight="medium" fontSize="0.8rem" color="#772EDB">
          <ErrorMessage name="password" />
        </Text>

        <Stack display="flex" flexDirection="column" alignItems="center" mt="2.5rem" spacing="1.5rem">
          <Button type="submit" isLoading={isLoading} loadingText="Entrando na conta" colorScheme="purple" borderRadius="25px" w={{ '2xl': "25rem", md: "20rem", sm: "20rem", xsm: "20rem" }} h="3rem">Entrar na conta</Button>
          <Box w="18.7rem" h="1px" bg="#c2c2c2" />
          <Button bg="#f0f0f0" borderRadius="25px" w="25rem" h="3rem" mb="1rem" leftIcon={<FcGoogle size={27} />}>Sign with Google</Button>
        </Stack>
    </Form>
    </Formik >
  )
}