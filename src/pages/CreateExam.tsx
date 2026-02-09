import { useState } from "react";
import { useGetCoursesQuery, useCreateQuizMutation } from "../lib/apiSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have text area
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export default function CreateExam() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading: isLoadingCourses } = useGetCoursesQuery({});
    const [createQuiz, { isLoading }] = useCreateQuizMutation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseId, setCourseId] = useState("");
    const [questions, setQuestions] = useState([
        { text: "", points: 1, options: ["", "", "", ""], correctAnswer: 0 },
    ]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { text: "", points: 1, options: ["", "", "", ""], correctAnswer: 0 },
        ]);
    };

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index: number, field: string, value: any) => {
        const newQuestions = [...questions];
        // @ts-ignore
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !courseId) {
            return toast.error("Please fill in all required fields.");
        }

        if (questions.length === 0) {
            return toast.error("Please add at least one question.");
        }

        // Validate questions
        for (const q of questions) {
            if (!q.text) return toast.error("All questions must have text.");
            if (q.options.some(opt => !opt)) return toast.error("All options must be filled.");
        }


        try {
            await createQuiz({
                title,
                description,
                courseId,
                questions,
            }).unwrap();

            toast.success("Exam created successfully!");
            navigate("/dashboard/exams");
        } catch (err: any) {
            console.error("Failed to create exam", err);
            toast.error(err?.data?.message || "Failed to create exam");
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Create New Exam</h2>
                    <p className="text-muted-foreground">
                        Create a new quiz or exam for a course.
                    </p>
                </div>
                <Button variant="outline" onClick={() => navigate("/dashboard/exams")}>
                    Cancel
                </Button>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader>
                    <CardTitle>Exam Details</CardTitle>
                    <CardDescription>
                        Fill in the details regarding the new exam.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Exam Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Mid-Term Mathematics"
                                className="bg-zinc-800 border-zinc-700"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e: any) => setDescription(e.target.value)}
                                placeholder="Brief description of the exam..."
                                className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="course">Course</Label>
                            <Select value={courseId} onValueChange={setCourseId} required>
                                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                    {isLoadingCourses ? (
                                        <SelectItem value="loading" disabled>
                                            Loading courses...
                                        </SelectItem>
                                    ) : (
                                        courses.map((course: any) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <h3 className="text-xl font-semibold">Questions</h3>
                                <Button
                                    type="button"
                                    onClick={handleAddQuestion}
                                    variant="secondary"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Question
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {questions.map((q, qIndex) => (
                                    <Card
                                        key={qIndex}
                                        className="bg-zinc-950 border-zinc-800 border relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-zinc-500 hover:text-red-500 hover:bg-zinc-900"
                                                onClick={() => handleRemoveQuestion(qIndex)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <CardContent className="p-6 space-y-4">
                                            <div className="space-y-2 pr-10">
                                                <Label>Question {qIndex + 1}</Label>
                                                <Input
                                                    value={q.text}
                                                    onChange={(e) =>
                                                        handleQuestionChange(qIndex, "text", e.target.value)
                                                    }
                                                    placeholder="Enter the question text"
                                                    className="bg-zinc-800 border-zinc-700"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Points</Label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={q.points}
                                                    onChange={(e) =>
                                                        handleQuestionChange(
                                                            qIndex,
                                                            "points",
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="bg-zinc-800 border-zinc-700 w-32"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label>Options & Correct Answer</Label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {q.options.map((option, oIndex) => (
                                                        <div
                                                            key={oIndex}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <div className="flex items-center justify-center pt-1">
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${qIndex}-correct`}
                                                                    checked={q.correctAnswer === oIndex}
                                                                    onChange={() =>
                                                                        handleQuestionChange(
                                                                            qIndex,
                                                                            "correctAnswer",
                                                                            oIndex
                                                                        )
                                                                    }
                                                                    className="w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                                                                    title="Mark as correct answer"
                                                                />
                                                            </div>
                                                            <Input
                                                                value={option}
                                                                onChange={(e) =>
                                                                    handleOptionChange(
                                                                        qIndex,
                                                                        oIndex,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder={`Option ${oIndex + 1}`}
                                                                className={`bg-zinc-800 border-zinc-700 transition-all ${q.correctAnswer === oIndex
                                                                    ? "border-blue-500 ring-1 ring-blue-500 bg-blue-500/10"
                                                                    : ""
                                                                    }`}
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t border-zinc-800 pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
                        >
                            {isLoading ? "Creating Exam..." : "Create Exam"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
