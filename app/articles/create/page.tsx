import GoBackButton from "@/app/ui/elements/go-back-button";
import CreateForm from "@/app/ui/articles/create-form";

export default async function Page() {
    return (
        <main>
            <GoBackButton route={'/articles'} />
            <CreateForm/>
        </main>
    );
}