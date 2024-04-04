'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    href: string;
    label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
    const router = useRouter();
    return (
        <Button
            variant="link"
            className="text-sm font-normal w-full"
            size="sm"
            asChild
        >
            <Link href={href}>{label}</Link>
        </Button>
    )
}