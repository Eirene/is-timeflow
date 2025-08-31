import { create } from "zustand";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface Records {
    id: string;
    projectId: string;
    startTime: number;
    endTime: number;
    duration: number;
    date: string;
}

interface RecordsStore {
    records: Records[];
    isAdding: boolean;
    isLoading: boolean;
    isDeleting: boolean;
    error: string | null;
    subscribe: () => () => void;
    addRecords: (name: string) => Promise<string>;
    deleteRecords: (id: string) => Promise<void>;
}

export const useRecordsStore = create<RecordsStore>((set) => ({
    records: [],
    isAdding: false,
    isLoading: true,
    isDeleting: false,
    error: null,

    // Function for subscribing to Records updates
    subscribe: () => {
        const recordsCol = collection(db, "records");

        set({ isLoading: true });

        const unsubscribe = onSnapshot(recordsCol, (snapshot) => {
            const records = snapshot.docs.map((doc) => ({
                id: doc.id,
                projectId: doc.data().projectId,
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                duration: doc.data().duration,
                date: doc.data().date,
            }));
            set({ records, isLoading: false });
        }, (error) => {
            console.error("Records subscription error:", error);
            set({
                error: `Failed to load time records: ${error.message}`,
                isLoading: false,
            });
        });

        return unsubscribe;
    },

    addRecords: async (name) => {
        try {
            set({ isAdding: true, error: null });
            const docRef = await addDoc(collection(db, "records"), {
                name: name.trim(),
                createdAt: new Date(),
            });
            return docRef.id;
        } catch (error) {
            set({ error: "Failed to add record" });
            throw error;
        } finally {
            set({ isAdding: false });
        }
    },

    deleteRecords: async (id) => {
        try {
            set({ isDeleting: true, error: null });
            await deleteDoc(doc(db, "records", id));
        } catch (error) {
            set({ error: "Failed to delete records" });
            throw error;
        } finally {
            set({ isDeleting: false });
        }
    },
}));
