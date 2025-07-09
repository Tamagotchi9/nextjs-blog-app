'use client';

import Link from 'next/link'
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import { Button } from "@/components/ui/button";
import {useUser} from "@stackframe/stack";
import { Input } from '@/components/ui/input'

interface HeaderProps {
    children?: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderProps) {
    const user = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((searchString: string) => {
        const params = new URLSearchParams(searchParams);

        if (searchString) {
            params.set('query', searchString);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <header className="h-[70px] px-5">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-x-5">
                    <h3 className="text-2xl min-w-24">Blog app</h3>
                    <Input
                        placeholder='Search articles'
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
                <nav className="flex items-center gap-x-4">
                    {user && <Link href='/articles/create'>Create Post</Link>}
                    {user && <Link href='/profile'>My account</Link>}
                    {user && <Button variant='link' onClick={() => user.signOut()}>Logout</Button>}
                    {!user && <Link href='/handler/sign-up'>Login</Link>}
                </nav>
            </div>
        </header>
    )
}
