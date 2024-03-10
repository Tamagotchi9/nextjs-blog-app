'use client';

import { Flex, Box, Input, Textarea, Button, Badge, Text } from '@chakra-ui/react'
import { useFormState } from 'react-dom';
import {createArticle, createTopic} from '@/app/lib/actions';
import {SubmitButton} from "@/app/ui/articles/button";
import {useState} from "react";
import { Topic } from "@/app/lib/defenitions";

export default function Form() {
    const [topic, setTopic] = useState<Topic>({ name: '' });
    const [topics, setTopics] = useState<Topic[]>([]);
    const addTopic = () => {
        setTopics((val) => [...val, topic])
    };
    const initialState = { message: null, errors: {} };
    const createAriclesWithTopics = createArticle.bind(null, topics)
    // TODO: find a solution for this TS error
    const [state, dispatch] = useFormState(createAriclesWithTopics, initialState);
    // const [stateTopic, dispatchTopic] = useFormState(createTopic, initialState)

    return (
        <div>
            <Box as='form' action={dispatch}>
                <Input type='file' id='image' name='image' placeholder='Your story image preview'/>
                <Input placeholder='Your story title' id='title' name='title'/>
                <Textarea placeholder='Your story' id='content' name='content'/>
                <SubmitButton>Publish</SubmitButton>
            </Box>
            <Box as='form'>
                <Text>You can label you blog article by a topic</Text>
                <Input placeholder='Your story topic' value={topic.name} onChange={(e) => setTopic((val) => ({...val, name: e.target.value}))}/>
                <Button onClick={addTopic}>Add topic</Button>
            </Box>
            {!!topics.length && topics.map((topic, idx) => (<Badge key={idx}>{topic.name}</Badge>))}
        </div>
    )
}
