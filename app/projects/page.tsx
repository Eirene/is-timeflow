"use client";
import { useProjectStore } from "../store/projectStore";
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
        addProject,
        fetchProjects,
        deleteProject,
    } = useProjectStore();
    const [newProjectName, setNewProjectName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const addNewProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) return setError("Project name is required");

        try {
            await addProject(newProjectName);
            setNewProjectName("");
        } catch {
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
                    <Button type="submit" disabled={isAdding || isLoading}>
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
