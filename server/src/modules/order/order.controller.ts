import { Controller, Get } from '@nestjs/common';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.getAll();
  }
}
