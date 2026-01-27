import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

interface CreatePaymentDto {
  amount: number;
  description: string;
  metadata?: any;
}

interface CheckPaymentDto {
  paymentId: string;
}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(
      dto.amount,
      dto.description,
      dto.metadata,
    );
  }

  @Post('check')
  async check(@Body() dto: CheckPaymentDto) {
    const payment = await this.paymentsService.checkPayment(dto.paymentId);

    if (payment.status === 'succeeded') {
      return { status: 'success', message: 'Payment successful!' };
    }

    return { status: payment.status, message: 'Waiting for payment...' };
  }
}
