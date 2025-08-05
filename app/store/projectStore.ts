import { create } from "zustand";

interface Project {
    id: string;
    name: string;
}

interface ProjectStore {
    projects: Project[];
    isAdding: boolean;
    isLoading: boolean;
    isDeleting: boolean;
    error: string | null;
    fetchProjects: () => Promise<void>;
    addProject: (name: string) => Promise<string>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    isAdding: false,
    isLoading: false,
    isDeleting: false,
    error: null,
    fetchProjects: async () => {
        try {
            set({ isLoading: true });

            const { collection, getDocs } = await import("firebase/firestore");
            const { db } = await import("../lib/firebase");

            const querySnapshot = await getDocs(collection(db, "projects"));
            const projects = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));

            set({ projects, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            set({ isLoading: false });
        }
    },

    addProject: async (name) => {
        try {
            set({ isAdding: true, error: null });

            const { addDoc, collection } = await import("firebase/firestore");
            const { db } = await import("../lib/firebase");

            const docRef = await addDoc(collection(db, "projects"), {
                name: name.trim(),
                createdAt: new Date(),
            });

            set((state) => ({
                projects: [...state.projects, { id: docRef.id, name }],
                isAdding: false,
            }));

            return docRef.id;
        } catch (error) {
            set({ error: "Failed to add project", isAdding: false });
            throw error;
        }
    },

    deleteProject: async (id) => {
        try {
            set({ isDeleting: true, error: null });

            const { deleteDoc, doc } = await import("firebase/firestore");
            const { db } = await import("../lib/firebase");

            await deleteDoc(doc(db, "projects", id));

            set((state) => ({
                projects: state.projects.filter((project) => project.id !== id),
                isDeleting: false,
            }));
        } catch (error) {
            set({ error: "Failed to delete project", isDeleting: false });
            throw error;
        }
    },
}));
