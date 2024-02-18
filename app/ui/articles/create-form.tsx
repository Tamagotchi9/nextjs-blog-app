'use client';

import { Flex, Box, Input, Textarea, Select, Button } from '@chakra-ui/react'
import { useFormState } from 'react-dom';
import { createArticle } from '@/app/lib/actions';
import {SubmitButton} from "@/app/ui/articles/button";

export default function Form() {
    const initialState = { message: null, errors: {} };
    const topics = ['programming', 'healthcare', 'machine learning', 'crypto', 'gaming']
    // TODO: find a solution for this TS error
    const [state, dispatch] = useFormState(createArticle, initialState);

    return (
        <Box as='form' action={dispatch}>
            <Input type='file' id='image' name='image' placeholder='Your story image preview'/>
            <Input placeholder='Your story title' id='title' name='title'/>
            <Textarea placeholder='Your story' id='content' name='content'/>
            <Flex>
                <Select placeholder='Select post topic' name='tags'>
                    {topics.map(topic => (<option key={topic}>{topic}</option>))}
                </Select>
                <Button>Add tag</Button>
            </Flex>
            <SubmitButton>Publish</SubmitButton>
        </Box>
    )
}
