import Form from '@/app/ui/articles/create-form';
import GoBackButton from "@/app/ui/elements/go-back-button";

export default async function Page() {
    return (
        <main>
            <GoBackButton route={'/articles'} />
            <Form/>
        </main>
    );
}