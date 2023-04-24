import { Project } from "../types";

export function getColorFromStatus(status: string, project: Project) {
    const index = project.statusChoices.indexOf(status)
    if (index !== -1) {
        return project.statusColors[index];
    }
    return "transparent";
}