// src/types/user.ts
export interface User {
    _id: string;
    firebaseUid: string;
    name: string;
    email: string;
    avatar?: string;
    provider?: string;
    createdAt?: string;
}
