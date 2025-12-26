import { IoClose } from "react-icons/io5";
import { 
  MdDashboard, 
  MdSummarize, 
  MdAssessment 
} from "react-icons/md";

export default function SideMenu({isOpen, onClose}) {
    const menuItems = [
        { icon: MdDashboard, label: "Dashboards", active: true },
        { icon: MdSummarize, label: "Resumo Geral", active: false },
        { icon: MdAssessment, label: "Relatórios", active: false }
    ];

    return (
    
            <aside
                className={`
                    fixed top-0 left-0 h-full w-72 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900
                    z-50 transform transition-transform duration-300 ease-in-out shadow-2xl
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}    
                `}
            >

                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white duration-200 hover:rotate-90 transform transition-all"
                    >
                        <IoClose className="text-2xl cursor-pointer"/>
                    </button>
                </div>

                <nav className="flex flex-col p-4 gap-2">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={`
                                flex items-center gap-4 px-4 py-3 rounded-lg text-left
                                transition-all duration-200 group cursor-pointer 
                                ${item.active 
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" 
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
                            `}
                        >
                            <item.icon className={`
                                text-xl transition-transform duration-200
                                ${item.active ? "" : "group-hover:scale-110"}
                            `}/>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>


                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-1 w-full bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-full opacity-50"></div>
                </div>
            </aside>
        
    );
}