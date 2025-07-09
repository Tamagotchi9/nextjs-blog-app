'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from "next/navigation";
import {useState, useTransition} from "react";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { Input } from '@/components/ui/input';
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
import { login } from "@/actions/login";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email in use with other provider!': ''
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [show2FAField, setShow2FAField] = useState(false);

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                    if (data?.twoFactor) {
                        setShow2FAField(true);
                    }
                })
                .catch(() => setError('Something went wrong!'))
        });
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
                       {show2FAField && (
                           <FormField
                               control={form.control}
                               name="code"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormLabel>Two factor code</FormLabel>
                                       <FormControl>
                                           <Input
                                               {...field}
                                               disabled={isPending}
                                               placeholder="123456"
                                           />
                                       </FormControl>
                                       <FormMessage></FormMessage>
                                   </FormItem>
                               )}
                           />
                       )}
                       {!show2FAField && (
                           <>
                               <FormField
                                   control={form.control}
                                   name="email"
                                   render={({ field }) => (
                                       <FormItem>
                                           <FormLabel>Email</FormLabel>
                                           <FormControl>
                                               <Input
                                                   {...field}
                                                   disabled={isPending}
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
                                                   disabled={isPending}
                                                   type="password"
                                                   placeholder="******"
                                               />
                                           </FormControl>
                                           <FormMessage></FormMessage>
                                           <Button
                                               size="sm"
                                               variant="link"
                                               asChild
                                               className="px-0 font-normal"
                                           >
                                               <Link href="/auth/reset">Forgot password?</Link>
                                           </Button>
                                       </FormItem>
                                   )}
                               />
                           </>
                       )}
                   </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {show2FAField ? 'Confirm': 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
