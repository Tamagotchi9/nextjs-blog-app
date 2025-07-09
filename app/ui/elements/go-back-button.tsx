'use client';

import Link from "next/link";

export default function GoBackButton ({ route }: { route: string}) {
    return (
        <Link href={route}>
            Back to articles
        </Link>
    )
}