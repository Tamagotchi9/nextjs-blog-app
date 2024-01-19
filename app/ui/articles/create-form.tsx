'use client';

import { Box, Input, Textarea, Button } from '@chakra-ui/react'
import { useFormState } from 'react-dom';
import { createArticle } from '@/app/lib/actions';

export default function Form() {
    const initialState = { message: null, errors: {} };
    // TODO: find a solution for this TS error
    const [state, dispatch] = useFormState(createArticle, initialState);
    return (
        <Box as='form' action={dispatch}>
            <Input type='file' id='image' name='image' placeholder='Your story image preview'/>
            <Input placeholder='Your story title' id='title' name='title'/>
            <Textarea placeholder='Your story' id='content' name='content'/>
            <Button type='submit' colorScheme='blue'>Publish</Button>
        </Box>
    )
}