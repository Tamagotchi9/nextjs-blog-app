'use client';

import { Box, FormControl, FormLabel, Input, Button, ButtonGroup } from '@chakra-ui/react'
import {FormEvent} from "react";
export default function RegisterForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            })
        });
    }
    return (
        <Box as='form' onSubmit={handleSubmit} border='2px solid black' borderRadius='12px' padding='40px 32px' width='400px'>
            <FormControl marginBottom='12px'>
                <FormLabel>Name</FormLabel>
                <Input name='name'/>
            </FormControl>
            <FormControl marginBottom='12px'>
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email'/>
            </FormControl>
            <FormControl marginBottom='12px'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password'/>
            </FormControl>
            <FormControl marginBottom='20px'>
                <FormLabel>Confirm password</FormLabel>
                <Input type='password' name='confirmPassword'/>
            </FormControl>
            <ButtonGroup>
                <Button type='submit' colorScheme='teal' variant='solid'>Register</Button>
            </ButtonGroup>
        </Box>
    )
}
