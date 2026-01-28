import { Calendar, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/ui/dashboard/stat-card";
import { ExamCard } from "../components/ui/dashboard/exam-card";

const stats = [
  {
    title: "Active exams",
    value: "12",
    change: 8,
    trend: "up" as const,
    sparklineColor: "#22c55e",
  },
  {
    title: "Students enrolled",
    value: "1,240",
    change: 12,
    trend: "up" as const,
    sparklineColor: "#a855f7",
  },
  {
    title: "Avg. score",
    value: "78%",
    change: 5,
    trend: "up" as const,
    sparklineColor: "#22c55e",
  },
];

const exams = {
  draft: [
    {
      subject: "mathematics" as const,
      title: "Advanced Calculus - Mid Term Examination",
      lastUpdated: "Jan 15, 2026",
      status: "draft" as const,
    },
    {
      subject: "science" as const,
      title: "Physics Lab Practical Assessment",
      lastUpdated: "Jan 12, 2026",
      status: "draft" as const,
    },
  ],
  inProgress: [
    {
      subject: "english" as const,
      title: "English Literature Final Exam",
      startDate: "Jan 20, 2026",
      endDate: "Jan 25, 2026",
      lastUpdated: "Jan 18, 2026",
      progress: 60,
      totalStudents: 245,
      status: "in-progress" as const,
    },
    {
      subject: "geography" as const,
      title: "World Geography Assessment",
      startDate: "Jan 22, 2026",
      endDate: "Jan 28, 2026",
      lastUpdated: "Jan 20, 2026",
      progress: 30,
      totalStudents: 180,
      status: "in-progress" as const,
    },
  ],
  completed: [
    {
      subject: "history" as const,
      title: "Modern History - Unit Test 3",
      endDate: "Jan 10, 2026",
      lastUpdated: "Jan 10, 2026",
      totalStudents: 312,
      status: "completed" as const,
    },
  ],
};

export default function ExamsContent() {
  return (
    <main className="flex-1 p-6 overflow-auto bg-background">
      {/* Stats Section */}
      <div className="mb-8">
        {/* Stats Cards */}
        <div className="flex gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>

      {/* Exams Board */}
      <div>
        <div className="flex items-center justify-end mb-6">
          <Button variant="link" className="text-blue-600 p-0">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Draft Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Draft
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                2
              </span>
            </div>
            <div className="space-y-4">
              {exams.draft.map((exam, index) => (
                <ExamCard key={index} {...exam} />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                In Progress
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                2
              </span>
            </div>
            <div className="space-y-4">
              {exams.inProgress.map((exam, index) => (
                <ExamCard key={index} {...exam} />
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Completed
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                1
              </span>
            </div>
            <div className="space-y-4">
              {exams.completed.map((exam, index) => (
                <ExamCard key={index} {...exam} />
              ))}
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-4 border border-dashed border-border rounded-xl">
                <Plus className="w-4 h-4" />
                Add exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
