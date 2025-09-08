import admin from "firebase-admin";

// Initialize Firebase Admin with proper error handling
let serviceAccount;
try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set");
    }
    
    // Handle both string and object formats
    if (typeof process.env.FIREBASE_SERVICE_ACCOUNT_KEY === 'string') {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } else {
        serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    }
} catch (error) {
    console.error("Error parsing Firebase service account key:", error);
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format");
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
    });
}

const db = admin.firestore();

export default async function handler(req, res) {
    try {
        const snapshot = await db.collection("yourCollection").get();
        const data = snapshot.docs.map((doc) => doc.data());
        res.status(200).json(data);
    } catch (error) {
        console.error("Database error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch data";
        res.status(500).json({ error: errorMessage });
    }
}
