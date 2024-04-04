'use client';

import { useRouter } from "next/navigation";

interface IntroButtonProps {
    children: React.ReactNode,
    asChild?: boolean;
}

export const IntroButton = ({ children, }: IntroButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push('/articles');
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}