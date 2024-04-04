import HeaderLayout from "@/app/ui/layout/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // TODO: show header links depending on session
    // const session = await getServerSession();
    return (
        <div>
            <HeaderLayout isLogged={false} />
            {children}
        </div>
    )
}
