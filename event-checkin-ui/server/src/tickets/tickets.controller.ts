
import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller()
export class TicketsController {
  constructor(private readonly svc: TicketsService) {}

  @Get('tickets') list() { return this.svc.list(); }
  @Get('tickets/by-ref/:reference') byRef(@Param('reference') r: string) { return this.svc.byReference(r); }
  @Post('tickets/seed') seed(@Query('count') count?: string) { return this.svc.seed(count ? parseInt(count,10) : 15); }
  @Get('stats') stats() { return this.svc.stats(); }
  @Post('checkin') checkin(@Body() b: { reference: string }) { return this.svc.checkin(b.reference); }
}
