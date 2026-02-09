import { useState } from "react";
import { useRegisterMutation } from "../lib/apiSlice";
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

import { toast } from "sonner";

export default function Register() {
  const initialFormData = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    address: "",
    dob: "",
    grade: "",
    level: "",
    contactNo: "",
    whatsappNo: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await register({
        name: formData.name,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        address: formData.address,
        dob: formData.dob,
        grade: formData.grade,
        level: formData.level,
        contactNo: formData.contactNo,
        whatsappNo: formData.whatsappNo,
      }).unwrap();

      toast.success("Student registered successfully!");
      setFormData(initialFormData);
      // Stay on the same page to register more students
      // navigate("/dashboard/studentregister"); 
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "Registration failed.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Registry</h2>
          <p className="text-muted-foreground">
            Register new students to the system.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-xl">Registration Form</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter student details to create a new account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  placeholder="Enter full name"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  placeholder="Enter username"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  placeholder="Enter password"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  placeholder="Confirm password"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  placeholder="Enter address"
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  placeholder="Enter grade"
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={formData.level}
                  placeholder="Enter level"
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact No</Label>
                <Input
                  id="contactNo"
                  value={formData.contactNo}
                  placeholder="Enter contact number"
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, contactNo: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNo">WhatsApp No</Label>
                <Input
                  id="whatsappNo"
                  value={formData.whatsappNo}
                  placeholder="Enter WhatsApp number"
                  className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNo: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all w-full md:w-auto"
            >
              {isLoading ? "Creating Account..." : "Register Student"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
