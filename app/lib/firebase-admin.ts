import admin from "firebase-admin";

// Initialize Firebase Admin with proper error handling
function initializeFirebaseAdmin() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

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

        // Validate required fields
        if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
            throw new Error("Invalid service account key: missing required fields");
        }

    } catch (error) {
        console.error("Error parsing Firebase service account key:", error);
        throw new Error(`Invalid FIREBASE_SERVICE_ACCOUNT_KEY format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
    });
}

// Initialize and export the admin instance
const adminApp = initializeFirebaseAdmin();
export const adminDb = admin.firestore();
export default adminApp;
