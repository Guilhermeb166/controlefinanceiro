

import { useState } from "react";
import { useAppRouter } from "@/utils/useAppRouter"
import AppSnackbar from "@/components/AppSnackbar";

export default function Nav() {
    const [user, setUser] = useState(null)
    const router = useAppRouter()
    
    return (
        
            
            <div className="flex items-center gap-3 flex-wrap sm:flex-row justify-center">
                
                {user ? (
                    <UserDropdown user={user} />
                ) : (
                    <button
                        type="button"
                        className="cursor-pointer flex items-center gap-2 rounded-md p-2 bg-emerald-500 text-white hover:bg-emerald-700 transition-all"
                        onClick={() => router.goLogin()}
                    >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                                3.75 3.75 0 0 1 7.5 0ZM4.501
                                20.118a7.5 7.5 0 0 1
                                14.998 0A17.933 17.933
                                0 0 1 12 21.75c-2.676
                                0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                    </button>
                )}
            </div>
            
      
    )
}
