import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetStudentsQuery, useUpdateStudentMutation, useEnrollStudentMutation, useGetCoursesQuery, useDeleteStudentMutation } from "../lib/apiSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function EditStudentContent({ student }: { student: any }) {
    const [updateStudent, { isLoading }] = useUpdateStudentMutation();
    const [enrollStudent, { isLoading: isEnrolling }] = useEnrollStudentMutation();
    const { data: courses = [] } = useGetCoursesQuery({});

    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [formData, setFormData] = useState({
        name: student.name || "",
        contactNo: student.contactNo || "",
        grade: student.grade || "",
        level: student.level || "",
    });

    useEffect(() => {
        setFormData({
            name: student.name || "",
            contactNo: student.contactNo || "",
            grade: student.grade || "",
            level: student.level || "",
        });
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateStudent({ id: student.id, ...formData }).unwrap();
            setOpen(false);
            toast.success("Student updated successfully");
        } catch (error) {
            toast.error("Failed to update student");
        }
    };

    const handleEnroll = async () => {
        if (!selectedCourse) {
            toast.error("Please select a course");
            return;
        }
        // Check if already enrolled
        const alreadyEnrolled = student.enrollments?.some((e: any) => e.courseId === selectedCourse);
        if (alreadyEnrolled) {
            toast.error("Student is already enrolled in this course");
            return;
        }

        try {
            await enrollStudent({ courseId: selectedCourse, studentId: student.id }).unwrap();
            toast.success("Student enrolled successfully");
            setSelectedCourse(""); // Reset selection
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to enroll student");
        }
    };

    // Filter out courses the student is already enrolled in (optional, but good UX)
    // Actually, showing all is fine, just disable or show error.
    // Let's filter available courses for cleaner UI?
    // const availableCourses = courses.filter((c: any) => !student.enrollments?.some((e: any) => e.courseId === c.id));
    // User requested "add the courses", usually implies available ones.

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogDescription>
                    Make changes to the student's profile or enroll them in a course.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <form onSubmit={handleSubmit} className="grid gap-4 border-b pb-6">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contactNo" className="text-right">
                            Contact
                        </Label>
                        <Input id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="grade" className="text-right">
                            Grade
                        </Label>
                        <Input id="grade" name="grade" value={formData.grade} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="level" className="text-right">
                            Level
                        </Label>
                        <Input id="level" name="level" value={formData.level} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>

                <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Enroll in Course</h4>
                    <div className="flex gap-2 items-end">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="course">Select Course</Label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a course..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course: any) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.title} (Lev {course.level})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleEnroll} disabled={isEnrolling || !selectedCourse}>
                            {isEnrolling ? "Enrolling..." : "Enroll"}
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default function StudentsPage() {
    const { data: students = [], isLoading, error } = useGetStudentsQuery({});
    const [deleteStudent] = useDeleteStudentMutation();

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
            try {
                await deleteStudent(id).unwrap();
                toast.success("Student deleted successfully");
            } catch (error) {
                toast.error("Failed to delete student");
            }
        }
    };

    // Generate initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Students</h2>
                <p className="text-muted-foreground">
                    Manage and view all registered students.
                </p>
            </div>

            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle>All Students</CardTitle>
                    <CardDescription>
                        A list of all students currently enrolled in the system.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8 text-muted-foreground">
                            Loading students...
                        </div>
                    ) : error ? (
                        <div className="flex justify-center p-8 text-destructive">
                            Failed to load students.
                        </div>
                    ) : students.length === 0 ? (
                        <div className="flex justify-center p-8 text-muted-foreground">
                            No students found.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border hover:bg-muted/50">
                                    <TableHead className="text-muted-foreground">Student</TableHead>
                                    <TableHead className="text-muted-foreground">Contact</TableHead>
                                    <TableHead className="text-muted-foreground">Grade/Level</TableHead>
                                    <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student: any) => (
                                    <TableRow key={student.id} className="border-border hover:bg-muted/30">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-border">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        {getInitials(student.name || student.username)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-foreground font-medium">{student.name}</span>
                                                    <span className="text-xs text-muted-foreground">{student.username}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {student.contactNo || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {student.grade && (
                                                    <Badge variant="outline" className="w-fit border-primary/20 text-primary bg-primary/5">
                                                        Grade {student.grade}
                                                    </Badge>
                                                )}
                                                {student.level && (
                                                    <Badge variant="outline" className="w-fit border-secondary/20 text-foreground bg-secondary/10">
                                                        Level {student.level}
                                                    </Badge>
                                                )}
                                                {!student.grade && !student.level && (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline" className="h-8 gap-2 text-primary border-primary/20 hover:bg-primary/5">
                                                            <BookOpen className="h-4 w-4" />
                                                            Enrollments
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Student Enrollments</DialogTitle>
                                                            <DialogDescription>
                                                                Courses enrolled by <span className="font-medium text-foreground">{student.name}</span>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 mt-4">
                                                            {student.enrollments && student.enrollments.length > 0 ? (
                                                                <div className="grid gap-3">
                                                                    {student.enrollments.map((enrollment: any) => (
                                                                        <div key={enrollment.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                                                                            <div className="flex flex-col">
                                                                                <span className="font-medium text-foreground">{enrollment.course?.title || "Unknown Course"}</span>
                                                                                <span className="text-xs text-muted-foreground">Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}</span>
                                                                            </div>
                                                                            <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                                                                                Active
                                                                            </Badge>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="py-6 text-center text-muted-foreground">
                                                                    No enrollments found.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10">
                                                            <FileEdit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <EditStudentContent student={student} />
                                                </Dialog>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(student.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
