'use client';

import Link from "next/link";
import {ArrowBackIcon} from "@chakra-ui/icons";

export default function GoBackButton ({ route }: { route: string}) {
    return (
        <Link href={route}>
            <ArrowBackIcon/> Back to articles
        </Link>
    )
}