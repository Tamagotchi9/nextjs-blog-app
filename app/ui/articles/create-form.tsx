'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArticleFormSchema} from "@/schemas/article";
import {Input} from "@/components/ui/input";
import { z } from 'zod'
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "@/app/ui/rich-text-editor/toolbar";
import {Button} from "@/components/ui/button";
import {db} from "@/drizzle/db";
import {ArticleTable} from "@/drizzle/schema/article";
import {useUser} from "@stackframe/stack";
import {useRouter} from "next/navigation";

export default function CreateForm() {
    const router = useRouter()
    const user = useUser();
    const form = useForm<z.infer<typeof ArticleFormSchema>>({
        resolver: zodResolver(ArticleFormSchema),
        defaultValues: {
            title: '',
            content: ''
        }
    })
    if (!user) {
        router.push('/articles')
        return
    }
    const onError = (error: Error | string | null) => {
        console.log(error)
    }
    const initialConfig = {
        namespace: 'MyEditor',
        onError,
    };
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] mx-auto">
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
                            <Input placeholder="content" {...field} />
                            {/*<LexicalComposer initialConfig={initialConfig}>*/}
                            {/*    <ToolbarPlugin/>*/}
                            {/*    <RichTextPlugin*/}
                            {/*        {...field}*/}
                            {/*        contentEditable={*/}
                            {/*            <ContentEditable*/}
                            {/*                aria-placeholder={'Enter some text...'}*/}
                            {/*                placeholder={<div>Enter some text...</div>}*/}
                            {/*            />*/}
                            {/*        }*/}
                            {/*        ErrorBoundary={LexicalErrorBoundary}*/}
                            {/*    />*/}
                            {/*    <HistoryPlugin />*/}
                            {/*    <AutoFocusPlugin />*/}
                            {/*</LexicalComposer>*/}
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
