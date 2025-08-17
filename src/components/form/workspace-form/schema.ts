import {z} from "zod";
export const workspaceSchema = z.object({
    name: z.string().min(1, {message: "Workspace name is required"}).max(50, "Workspace name must be less than 50 characters"),
    description: z.string().optional(),
    isPublic: z.boolean().default(false)
});