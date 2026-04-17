// This file defines the TypeScript types for users.

export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    avatarUrl?: string;
    isLoggedIn: boolean;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}