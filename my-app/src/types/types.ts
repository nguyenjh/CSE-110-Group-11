export type Recipe = {
    id: number;
    name: string;
    summary: string;
    instruction: string;
    time: string;
    like: number;
    rating: number;
    tags: string[];
}