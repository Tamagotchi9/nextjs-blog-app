'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArticleFormSchema} from "@/schemas/article";
import {Input} from "@/components/ui/input";
import { z } from 'zod'
import {Button} from "@/components/ui/button";
import {useUser} from "@stackframe/stack";
import RichTextEditor from "@/components/rich-text-editor";

export default function CreateForm() {
    const user = useUser();
    const form = useForm<z.infer<typeof ArticleFormSchema>>({
        resolver: zodResolver(ArticleFormSchema),
        defaultValues: {
            title: '',
            content: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof ArticleFormSchema>) => {
        await fetch('/api/articles', {
            method: 'POST',
            body: JSON.stringify({
                ...values,
                authorId: user?.id
            })
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] mx-auto">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Article title</FormLabel>
                        <FormControl>
                            <Input placeholder="title" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Article content</FormLabel>
                        <FormControl>
                            <RichTextEditor field={field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Article image</FormLabel>
                        <FormControl>
                            <Input type="file" placeholder="image" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Button className="mt-10" type="submit">Submit form</Button>
            </form>
        </Form>
    )
}
