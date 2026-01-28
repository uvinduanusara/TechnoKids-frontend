import { Calendar, Filter, Users, ClipboardList, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "../components/ui/dashboard/stat-card"
import { Link } from "react-router-dom"


const stats = [
  { title: "Total students", value: "1,240", change: 12, trend: "up" as const, sparklineColor: "#22c55e" },
  { title: "Total exams", value: "48", change: 8, trend: "up" as const, sparklineColor: "#a855f7" },
  { title: "Pass rate", value: "82%", change: 3, trend: "up" as const, sparklineColor: "#22c55e" },
]

const recentActivity = [
  { title: "Advanced Calculus exam started", time: "2 hours ago", icon: ClipboardList },
  { title: "45 students completed English exam", time: "3 hours ago", icon: Users },
  { title: "Physics Lab results published", time: "5 hours ago", icon: TrendingUp },
  { title: "New exam scheduled: World Geography", time: "1 day ago", icon: Clock },
]

const upcomingExams = [
  { subject: "Mathematics", title: "Advanced Calculus - Final", date: "Jan 30, 2026", students: 156 },
  { subject: "Science", title: "Chemistry Lab Assessment", date: "Feb 2, 2026", students: 89 },
  { subject: "English", title: "Literature Review Test", date: "Feb 5, 2026", students: 203 },
]

export function DashboardContent() {
  return (
    <main className="flex-1 p-6 overflow-auto bg-background">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
            <p className="text-muted-foreground">Here's what's happening with your exams today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Select Dates
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Exams</h2>
            <Link to="/exams" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{exam.subject}</p>
                  <p className="text-sm font-medium text-foreground">{exam.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{exam.date}</p>
                  <p className="text-xs text-muted-foreground">{exam.students} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
