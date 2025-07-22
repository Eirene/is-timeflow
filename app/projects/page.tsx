"use client";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline";
import ListContainer from "../components/ui/ListContainer";
import ListItem from "../components/ui/ListItem";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ButtonIcon } from "../components/ui/ButtonIcon";
import { ProjectsSkeleton } from "../components/ProjectsSkeleton";

export default function Projects() {
    const [projects, setProjects] = useState<{ id: string; name: string }[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [newProjectName, setNewProjectName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name as string,
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const addNewProject = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error state
        setError("");

        // Validate project name
        if (!newProjectName.trim()) {
            setError("Project name is required");
            return;
        }

        setSaving(true);
        try {
            // Add new project to Firebase
            const docRef = await addDoc(collection(db, "projects"), {
                name: newProjectName.trim(),
                createdAt: new Date(),
            });

            // Update list of projects in state
            setProjects((prevProjects) => [
                ...prevProjects,
                { id: docRef.id, name: newProjectName.trim() },
            ]);

            // Reset input field
            setNewProjectName("");
        } catch (error) {
            console.error("Error adding project:", error);
            setError("Failed to add project. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async (id: string) => {
        console.log("Attempting to delete project with id:", id);
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, "projects", id));

            // Update local state to remove the deleted project
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id)
            );

            console.log("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Error deleting project: " + error);
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6 lg:space-y-10">
            <form className="space-y-5" onSubmit={addNewProject}>
                <Input
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name"
                />

                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="text-right">
                    <Button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>

            {loading ? <ProjectsSkeleton /> : projects.length > 0
                ? (
                    <ListContainer>
                        {projects.map((project) => (
                            <ListItem key={project.id}>
                                <FolderIcon className="text-gray-400 size-5" />
                                <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                                    {project.name}
                                </span>
                                <ButtonIcon
                                    onClick={() => deleteProject(project.id)}
                                >
                                    <TrashIcon className="size-5" />
                                </ButtonIcon>
                            </ListItem>
                        ))}
                    </ListContainer>
                )
                : "No projects yet. Create one!"}
        </div>
    );
}
