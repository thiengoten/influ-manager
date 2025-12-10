"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useUser()

  const userData = {
    name: user?.firstName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    avatar: user?.imageUrl || "",
  }
  return (
    <SidebarProvider>
      <AppSidebar user={userData} isUserLoading={!isLoaded} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
