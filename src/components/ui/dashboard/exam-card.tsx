
import { cn } from "@/lib/utils"
import { FileText, Calculator, FlaskConical, Globe, BookOpen } from "lucide-react"

interface ExamCardProps {
  subject: "mathematics" | "science" | "english" | "geography" | "history"
  title: string
  startDate?: string
  endDate?: string
  lastUpdated: string
  progress?: number
  totalStudents?: number
  status: "draft" | "in-progress" | "completed"
}

const subjectIcons = {
  mathematics: <Calculator className="w-6 h-6 text-blue-600" />,
  science: <FlaskConical className="w-6 h-6 text-emerald-600" />,
  english: <BookOpen className="w-6 h-6 text-purple-600" />,
  geography: <Globe className="w-6 h-6 text-amber-600" />,
  history: <FileText className="w-6 h-6 text-rose-600" />,
}

const subjectColors = {
  mathematics: "bg-blue-50",
  science: "bg-emerald-50",
  english: "bg-purple-50",
  geography: "bg-amber-50",
  history: "bg-rose-50",
}

export function ExamCard({
  subject,
  title,
  startDate,
  endDate,
  lastUpdated,
  progress,
  totalStudents,
  status,
}: ExamCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", subjectColors[subject])}>
          {subjectIcons[subject]}
        </div>
        {totalStudents && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {totalStudents} students
          </span>
        )}
      </div>
      <h3 className="font-medium text-sm text-foreground mb-3 leading-snug line-clamp-2">
        {title}
      </h3>
      <div className="space-y-2">
        {status === "draft" && (
          <p className="text-xs text-muted-foreground">
            Status: <span className="text-amber-600 font-medium">Not Scheduled</span>
          </p>
        )}
        {status === "in-progress" && (
          <>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Start: <span className="text-foreground">{startDate}</span></span>
              <span>Ends: <span className="text-foreground">{endDate}</span></span>
            </div>
            {progress !== undefined && (
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </>
        )}
        {status === "completed" && (
          <p className="text-xs text-muted-foreground">
            Completed: <span className="text-foreground">{endDate}</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Last updated: <span className="text-foreground">{lastUpdated}</span>
        </p>
      </div>
    </div>
  )
}
