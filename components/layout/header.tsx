'use client';

import Link from 'next/link'
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'

interface HeaderProps {
    children?: React.ReactNode;
    isLogged: Boolean;
    handleSignOut: Function;
}

export default function HeaderLayout({ children, isLogged, handleSignOut }: HeaderProps) {
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
        <header className="h-[70px] px-5 border-b-teal-800">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link className="text-2xl min-w-[100px] mr-5" href="/articles">Blog app</Link>
                    <Input
                        placeholder='Search articles'
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
                <div>
                    {isLogged && <Button variant="link" asChild={true}><Link href='/articles/create'>Create post</Link></Button>}
                    {isLogged && <Button variant="link" asChild={true}><Link href='/profile'>My account</Link></Button>}
                    {isLogged && <Button variant="link" onClick={() => handleSignOut()}>Logout</Button>}
                    {!isLogged && <Button variant="link" asChild={true}><Link href='/login'>Login</Link></Button>}
                </div>
            </div>
        </header>
    )
}
