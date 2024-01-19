'use client';

import { Box, Flex, HStack, Link, Container, InputGroup, InputLeftElement, Input, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Box as='header' px='20' h={70} borderBottom='1px'>
                <Flex justify='space-between' align="center" h="100%">
                    <HStack>
                        <Text fontSize="xl" w={40}>Blog app</Text>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <SearchIcon color='gray.300'/>
                            </InputLeftElement>
                            <Input placeholder='Search articles'/>
                        </InputGroup>
                    </HStack>
                    <HStack>
                        <Link href='/profile'>My account</Link>
                    </HStack>
                </Flex>
            </Box>
            <Container maxW='4xl'>{children}</Container>
        </div>
    )
}