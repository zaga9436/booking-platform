import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentsService {
  private getAuthHeader() {
    const shopId = process.env.YOOKASSA_SHOP_ID ?? '';
    const secretKey = process.env.YOOKASSA_SECRET_KEY ?? '';
    return 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64');
  }

  async createPayment(amount: number, description: string, metadata?: any) {
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: { value: amount.toFixed(2), currency: 'RUB' },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: 'http://localhost:3000/success',
        },
        description: description,
        metadata: metadata,
      },
      {
        headers: {
          Authorization: this.getAuthHeader(),
          'Idempotence-Key': uuidv4(),
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async checkPayment(paymentId: string) {
    const response = await axios.get(
      `https://api.yookassa.ru/v3/payments/${paymentId}`,
      {
        headers: { Authorization: this.getAuthHeader() },
      },
    );
    return response.data;
  }
}
