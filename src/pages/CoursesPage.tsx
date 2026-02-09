import { useGetCoursesQuery } from "@/lib/apiSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, DollarSign } from "lucide-react";;

export default function CoursesPage() {
    const { data: courses = [], isLoading } = useGetCoursesQuery({});

    return (
        <main className="flex-1 p-6 overflow-auto bg-background">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
                        <p className="text-muted-foreground">
                            Browse and manage all available courses.
                        </p>
                    </div>
                    {/* Placeholder for Add Course button if needed later */}
                </div>

                {isLoading ? (
                    <div className="text-center py-10">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-20 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No courses found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course: any) => (
                            <Card key={course.id} className="bg-zinc-900 border-zinc-800 transition-colors hover:bg-zinc-900/50 flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                                            Level {course.level || "N/A"}
                                        </Badge>
                                        <span className="flex items-center text-green-400 font-medium text-sm">
                                            <DollarSign className="w-4 h-4 mr-0.5" />
                                            {course.price || "Free"}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl text-zinc-100 line-clamp-1">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{course.enrollments?.length || 0} Students</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            <span>{course.grade || "Grade N/A"}</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100" variant="outline">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
