export declare class TicketsService {
    list(): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    stats(): Promise<{
        total: number;
        checkedIn: number;
        byType: Record<string, {
            total: number;
            checkedIn: number;
        }>;
    }>;
    seed(count?: number): Promise<{
        created: number;
    }>;
    byReference(reference: string): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkin(reference: string): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
