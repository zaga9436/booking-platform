import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: { amount: number }) {
    return this.paymentsService.createPayment(dto.amount, 'Test Order');
  }

  @Post('webhook')
  handleWebhook(@Body() event: any) {
  console.log('WEBHOOK RECEIVED:', event);
  return 'ok';
  }
  
  @Post('check')
  async check(@Body() dto: { paymentId: string }) {
    const payment = await this.paymentsService.checkPayment(dto.paymentId);
    
    if (payment.status === 'succeeded') {
      return { status: 'success', message: 'Payment successful!' };
    }
    
    return { status: payment.status, message: 'Waiting for payment...' };
  }
 
}
