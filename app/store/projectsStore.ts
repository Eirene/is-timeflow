import { create } from "zustand";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface Project {
    id: string;
    name: string;
}

interface ProjectsStore {
    projects: Project[];
    isAdding: boolean;
    isLoading: boolean; // Возвращаем isLoading
    isDeleting: boolean;
    error: string | null;
    subscribe: () => () => void;
    addProject: (name: string) => Promise<string>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
    projects: [],
    isAdding: false,
    isLoading: true,
    isDeleting: false,
    error: null,

    // Function for subscribing to project updates
    subscribe: () => {
        const projectsCol = collection(db, "projects");

        set({ isLoading: true });

        const unsubscribe = onSnapshot(projectsCol, (snapshot) => {
            const projects = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            set({ projects, isLoading: false });
        }, (_error) => {
            set({ error: "Connection error", isLoading: false });
        });

        return unsubscribe;
    },

    addProject: async (name) => {
        try {
            set({ isAdding: true, error: null });
            const docRef = await addDoc(collection(db, "projects"), {
                name: name.trim(),
                createdAt: new Date(),
            });
            return docRef.id;
        } catch (error) {
            set({ error: "Failed to add project" });
            throw error;
        } finally {
            set({ isAdding: false });
        }
    },

    deleteProject: async (id) => {
        try {
            set({ isDeleting: true, error: null });
            await deleteDoc(doc(db, "projects", id));
        } catch (error) {
            set({ error: "Failed to delete project" });
            throw error;
        } finally {
            set({ isDeleting: false });
        }
    },
}));
