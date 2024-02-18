'use client'
import { Button } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'
import React from "react";

export function SubmitButton ({children}: { children: React.ReactNode }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" colorScheme='blue'  isLoading={pending}>
            {children}
        </Button>
    )
}
