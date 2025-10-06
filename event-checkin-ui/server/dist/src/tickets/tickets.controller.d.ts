import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private readonly svc;
    constructor(svc: TicketsService);
    list(): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    byRef(r: string): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    seed(count?: string): Promise<{
        created: number;
    }>;
    stats(): Promise<{
        total: number;
        checkedIn: number;
        byType: Record<string, {
            total: number;
            checkedIn: number;
        }>;
    }>;
    checkin(b: {
        reference: string;
    }): Promise<{
        id: string;
        reference: string;
        type: string;
        checkedIn: boolean;
        checkedInAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
