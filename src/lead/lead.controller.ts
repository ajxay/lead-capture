// src/lead/lead.controller.ts
import { Controller, Get, Post, Res, Body, Query } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Request, Response } from 'express';

@Controller('webhook')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  verifyWebhook(@Query() query: Record<string, string>, @Res() res: Response) {
    console.log(query, 'query');
    const VERIFY_TOKEN = 'leads-capture-token';
    console.log(query, VERIFY_TOKEN);
    if (
      query['hub.mode'] === 'subscribe' &&
      query['hub.verify_token'] === VERIFY_TOKEN
    ) {
      return res.status(200).send(query['hub.challenge']);
    }
    return res.sendStatus(403);
  }

  @Post()
  async handleWebhook(
    @Body() body: { entry?: { changes?: { field?: string; value?: any }[] }[] },
    @Res() res: Response,
  ) {
    console.log('Webhook received:', JSON.stringify(body));
    if (body.entry) {
      for (const entry of body.entry) {
        for (const change of entry.changes ?? []) {
          if (change.field === 'leadgen') {
            const value = change.value as {
              leadgen_id: string;
              page_id: string;
              form_id: string;
            };
            const leadgen_id = value.leadgen_id;
            const page_id = value.page_id;
            const form_id = value.form_id;
            await this.leadService.processLead(leadgen_id, page_id, form_id);
          }
        }
      }
    }
    return res.sendStatus(200);
  }
}
