
import { Search, Command } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-border bg-card">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Exams</span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">Overview</span>
      </div>
      <div className="relative">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg border border-border w-[240px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Command className="w-3 h-3" />
            <span className="text-xs">/</span>
          </div>
        </div>
      </div>
    </header>
  )
}
