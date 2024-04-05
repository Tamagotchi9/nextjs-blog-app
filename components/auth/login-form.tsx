'use client';

import * as z from 'zod'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from "@/schemas";
import { Input } from '@/components/ui/input'
import {
    Form,
    FormLabel,
    FormField,
    FormControl,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    }

    return (
        <CardWrapper
            headerLabel="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                   <div className='space-y-4'>
                       <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Email</FormLabel>
                                   <FormControl>
                                       <Input
                                           {...field}
                                           type="email"
                                           placeholder="john.doe@email.com"
                                       />
                                   </FormControl>
                                   <FormMessage></FormMessage>
                               </FormItem>
                           )}
                       />
                       <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Password</FormLabel>
                                   <FormControl>
                                       <Input
                                           {...field}
                                           type="password"
                                           placeholder="******"
                                       />
                                   </FormControl>
                                   <FormMessage></FormMessage>
                               </FormItem>
                           )}
                       />
                   </div>
                    <FormError message=""/>
                    <FormSuccess message=""/>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
