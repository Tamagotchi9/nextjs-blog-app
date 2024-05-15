import { auth } from "@/auth"

import {CreateForm} from "@/components/articles/create-form";
export default async function Page() {
    const session = await auth();

    return (
        <main>
            <CreateForm user={session?.user}/>
        </main>
    );
}
