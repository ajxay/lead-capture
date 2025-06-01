// src/lead/lead.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { PrismaService } from '../prisma.service';

@Injectable()
export class LeadService {
  constructor() {}

  async processLead(leadgen_id: string, page_id: string, form_id: string) {
    console.log(leadgen_id, page_id, form_id, 'received');
    const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
    // const VERIFY_TOKEN = 'leads-capture-token';
    const url = `https://graph.facebook.com/v18.0/${leadgen_id}?access_token=${accessToken}`;
    const response = await axios.get<{ [key: string]: any }>(url);
    const data = response.data as Record<string, unknown>;

    console.log(data, page_id, form_id);
    // Save to DB
    // await this.prisma.lead.create({
    //   data: {
    //     leadId: leadgen_id,
    //     pageId: page_id,
    //     formId: form_id,
    //     data: data,
    //   },
    // });
  }
}
