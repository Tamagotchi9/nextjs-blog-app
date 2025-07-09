import HeaderLayout from "@/app/ui/layout/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeaderLayout />
            {children}
        </div>
    )
}
