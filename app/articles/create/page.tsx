import { auth } from "@/auth"

import GoBackButton from "@/app/ui/elements/go-back-button";
import {CreateForm} from "@/components/articles/create-form";
export default async function Page() {
    const session = await auth();

    return (
        <main>
            <GoBackButton route={'/articles'} />
            <CreateForm user={session?.user}/>
        </main>
    );
}
