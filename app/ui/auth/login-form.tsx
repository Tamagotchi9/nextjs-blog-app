import { Box, FormControl, FormLabel, Input, Button, ButtonGroup } from '@chakra-ui/react'

export default function LoginForm() {
    return (
        <Box as='form' border='2px solid black' borderRadius='12px' padding='40px 32px'>
            <FormControl marginBottom='12px'>
                <FormLabel>Email</FormLabel>
                <Input type='email' />
            </FormControl>
            <FormControl marginBottom='20px'>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
            </FormControl>
            <ButtonGroup>
                <Button colorScheme='teal' variant='outline'>Forget password</Button>
                <Button colorScheme='teal' variant='solid'>Sign in</Button>
            </ButtonGroup>
        </Box>
    )
}