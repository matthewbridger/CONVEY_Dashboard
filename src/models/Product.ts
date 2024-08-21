export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isDeleted?: boolean;  // Marked as optional because it has a default value in the backend
}