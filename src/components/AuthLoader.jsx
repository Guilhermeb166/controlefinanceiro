"use client"
import { useSession } from "next-auth/react"
import { useExpenses } from "@/context/AppContext"
import { MdAutorenew } from "react-icons/md"

export default function AuthLoader({children}) {

    const {status} = useSession()
    const { expenses } = useExpenses()

    const isLoading =
    status === "loading" ||               
    (status === "authenticated" && expenses === null) 

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <MdAutorenew size={55} className="animate-spin text-emerald-600" />
      </div>
    )
  }

    return children
}
