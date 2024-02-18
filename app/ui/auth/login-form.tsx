'use client';

import { Box, FormControl, FormLabel, Input, Button, ButtonGroup } from '@chakra-ui/react'
import {FormEvent} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        if (!response?.error) {
            router.push('/articles');
            router.refresh();
        }
    }
    return (
        <Box as='form' onSubmit={handleSubmit} border='2px solid black' borderRadius='12px' padding='40px 32px'>
            {/*<FormControl marginBottom='12px'>*/}
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email' />
            {/*</FormControl>*/}
            {/*<FormControl marginBottom='20px'>*/}
                <FormLabel pt={5}>Password</FormLabel>
                <Input type='password' name='password' />
            {/*</FormControl>*/}
            <ButtonGroup pt={5} w='100%'>
                <Button colorScheme='teal' variant='outline' w='50%'>Forget password</Button>
                <Button type='submit' colorScheme='teal' variant='solid' w='50%'>Login</Button>
            </ButtonGroup>
        </Box>
    )
}
