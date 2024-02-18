'use client';

import {Box, Flex, HStack, Input, InputGroup, InputLeftElement, Link as UILink, Text} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {signOut} from "next-auth/react";
import Link from 'next/link'
import {useRouter} from "next/navigation";
// todo: think about where to store interfaces and types
interface Props {
    children?: React.ReactNode;
    isLogged: Boolean;
}

export default function HeaderLayout({ children, isLogged }: Props) {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        router.push('/login')
    }
    return (
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
                    {isLogged && <Link href='/articles/create'>Create Post</Link>}
                    {isLogged && <Link href='/profile'>My account</Link>}
                    {isLogged && <UILink onClick={handleSignOut}>Logout</UILink>}
                    {!isLogged && <Link href='/login'>Login</Link>}
                </HStack>
            </Flex>
        </Box>
    )
}
