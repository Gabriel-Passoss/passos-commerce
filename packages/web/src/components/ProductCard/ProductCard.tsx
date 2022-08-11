import { Flex, Text, Link, Image, Box, Heading } from '@chakra-ui/react'

interface ProductProps {
    image: string,
    price: number,
    title: string,
    id: number
}

export function ProductCard({ image, price, title, id }: ProductProps) {
    return (
        <Flex direction="column">
            <Flex>
                <Link href={`/product/${id}`}>
                    <Image src="/assets/iphone.png" />
                </Link>
            </Flex>
            <Flex direction="column" ml="1.5rem">
                <Text textTransform="uppercase" fontSize="0.6rem" mt="5px" mb="5px" color="#999">código: 395465</Text>
                <Link href={`/product/${id}`} transition="0.3s" _hover={{
                    color: '#ccc',
                    textDecoration: 'none'
                }}>
                    <Heading textDecoration="none" fontSize="1rem" fontWeight="normal" w="10rem">
                        {title}
                    </Heading>
                </Link>
                <Flex direction="column" mt="10px">
                    <Text fontWeight="bold" fontSize="1.2rem">U$ {price}</Text>
                    <Text fontSize="0.6rem" color="#999">R$ 2.233,38 / GS 2.787.556</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}