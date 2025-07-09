'use client';

import * as z from 'zod';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from "react";

import {ArticleSchema} from "@/schemas";
import {
    Form,
    FormLabel,
    FormField,
    FormControl,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import {Button} from "@/components/ui/button";
import {createArticle} from "@/actions/create-article";
import {Input} from "@/components/ui/input";
import {ExtendedUser} from "@/next-auth";

interface CreateFormProps {
    user: ExtendedUser | undefined;
}

export const CreateForm = ({ user }: CreateFormProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: '',
            content: '',
            image: undefined,
            authorId: user?.id
        }
    });
    const formData = new FormData();
    const onSubmit = (values: z.infer<typeof ArticleSchema>) => {
        startTransition(() => {
            createArticle(values, formData)
                .then(v => console.log(v))
        })
    };

    return (
        <div className="w-[800px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Your story headline"
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article content</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Tell us your story"
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article image</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="file"
                                            disabled={isPending}
                                            onChange={(event) => {
                                                if (event.target.files && event.target.files.length) {
                                                    formData.append('image', event.target.files[0], event.target?.files?.[0].name)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Create article</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
