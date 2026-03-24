import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        experienceId: { type: 'string', example: 'uuid-of-experience' },
      },
      required: ['experienceId'],
    },
  })
  @Post('checkout')
  createCheckout(@Req() request: any, @Body() body: CreateOrderDto) {
    if (!request.user?.id) {
      throw new UnauthorizedException('Invalid session token. Login again.');
    }

    return this.ordersService.createCheckout(request.user.id, body.experienceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':orderId/confirm/:paymentId')
  confirmPayment(
    @Param('orderId') orderId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this.ordersService.confirmPayment(orderId, paymentId);
  }

  @Post('webhook')
  handleWebhook(@Body() body: any) {
    return this.ordersService.handleWebhook(body);
  }
}
