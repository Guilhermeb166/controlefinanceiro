import CategoryAnalysis from "@/components/Dashboards/CategoryAnalysis";
import GeneralAnalysis from "@/components/Dashboards/GeneralAnalysis";

export default function DashboardPage() {
    return (
        <main className="min-h-screen">
            <GeneralAnalysis/>
            <CategoryAnalysis/>
        </main>
    )
}
