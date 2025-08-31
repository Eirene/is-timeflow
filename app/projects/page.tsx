"use client";
import { useProjectsStore } from "../store/projectsStore";
import { useEffect, useState } from "react";
import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline";
import ListContainer from "../components/ui/ListContainer";
import ListItem from "../components/ui/ListItem";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ButtonIcon } from "../components/ui/ButtonIcon";
import { ProjectsSkeleton } from "../components/ProjectsSkeleton";

export default function Projects() {
    const {
        projects,
        isAdding,
        isLoading,
        isDeleting,
        error: storeError,
        subscribe,
        addProject,
        deleteProject,
    } = useProjectsStore();

    const [newProjectName, setNewProjectName] = useState("");
    const [localError, setLocalError] = useState("");

    // Subscription to Firestore updates
    useEffect(() => {
        const unsubscribe = subscribe();
        return () => unsubscribe();
    }, [subscribe]);

    const addNewProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) {
            setLocalError("Project name is required");
            return;
        }

        try {
            await addProject(newProjectName);
            setNewProjectName("");
            setLocalError("");
        } catch {
            setLocalError("Failed to add project");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteProject(id);
            } catch {
                setLocalError("Failed to delete project");
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6 lg:space-y-10">
            <form className="space-y-5" onSubmit={addNewProject}>
                <Input
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name"
                    disabled={isAdding}
                />

                {(localError || storeError) && (
                    <p className="text-sm text-red-500">
                        {localError || storeError}
                    </p>
                )}

                <div className="text-right">
                    <Button
                        type="submit"
                        disabled={isAdding || isLoading}
                    >
                        {isAdding ? "Adding..." : "Add Project"}
                    </Button>
                </div>
            </form>

            {isLoading
                ? <ProjectsSkeleton />
                : projects.length > 0
                ? (
                    <ListContainer>
                        {projects.map((project) => (
                            <ListItem key={project.id}>
                                <FolderIcon className="text-gray-400 size-5" />
                                <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                                    {project.name}
                                </span>
                                <ButtonIcon
                                    color="red"
                                    onClick={() => handleDelete(project.id)}
                                    disabled={isDeleting}
                                >
                                    <TrashIcon className="size-5" />
                                </ButtonIcon>
                            </ListItem>
                        ))}
                    </ListContainer>
                )
                : (
                    !isLoading && "No projects yet. Create one!"
                )}
        </div>
    );
}
