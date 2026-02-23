import { Plus, HelpCircle, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetAllExamsQuery, useDeleteQuizMutation } from "@/lib/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ExamsContent() {
  const navigate = useNavigate();
  const { data: exams = [], isLoading } = useGetAllExamsQuery({});
  const [deleteQuiz] = useDeleteQuizMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await deleteQuiz(id).unwrap();
        toast.success("Exam deleted successfully");
      } catch (error) {
        toast.error("Failed to delete exam");
        console.error("Failed to delete exam", error);
      }
    }
  };

  return (
    <main className="flex-1 p-6 overflow-auto bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Exams</h2>
            <p className="text-muted-foreground">
              View and manage all system examinations.
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard/exams/create")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Exam
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading exams...</div>
        ) : exams.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No exams found.</p>
            <Button
              variant="link"
              onClick={() => navigate("/dashboard/exams/create")}
            >
              Create your first exam
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam: any) => (
              <Card key={exam.id} className="bg-card border-border transition-all hover:shadow-md hover:border-primary/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-foreground">
                        {exam.title}
                      </span>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {exam.course?.title || "No Course"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>{exam._count?.questions || 0} Questions</span>
                      </div>
                      {exam.description && (
                        <span className="line-clamp-1 max-w-[300px] text-muted-foreground/80">
                          {exam.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-input hover:bg-accent hover:text-accent-foreground">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleDelete(exam.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
