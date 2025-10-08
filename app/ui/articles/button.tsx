'use client'
import { useFormStatus } from 'react-dom'
import React from "react";

export function SubmitButton ({children}: { children: React.ReactNode }) {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {children}
        </button>
    )
}
