import { create } from "zustand";

interface Project {
    id: string;
    name: string;
}

interface ProjectStore {
    projects: Project[];
    fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    fetchProjects: async () => {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("../lib/firebase"); // Ваш инициализированный Firestore

        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
        }));

        set({ projects });
    },
}));
