import CategoryAnalysis from "@/components/Dashboards/CategoryAnalysis";
import GeneralAnalysis from "@/components/Dashboards/GeneralAnalysis";

export default function DashboardPage() {
    return (
        <main className="min-h-screen max-w-[95%] m-auto p-4 flex flex-col gap-10">
            <GeneralAnalysis/>
            <CategoryAnalysis/>
        </main>
    )
}
