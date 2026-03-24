import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { User } from 'src/users/entities/user.entity';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.ordersRepository.find({
      relations: { user: true, experience: true },
    });
  }

  async createCheckout(
    userId: string,
    experienceId: string,
  ): Promise<{ orderId: string; initPoint: string }> {
    if (!userId) {
      throw new UnauthorizedException('Invalid session token. Login again.');
    }

    if (!process.env.MP_ACCESS_TOKEN) {
      throw new InternalServerErrorException('Mercado Pago is not configured');
    }

    const experience = await this.experiencesRepository.findOne({
      where: { id: experienceId },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const order = this.ordersRepository.create({
      user,
      experience,
      status: false,
      paymentStatus: 'pending',
      amount: Number(experience.price),
      preferenceId: null,
      paymentId: null,
    });
    const savedOrder = await this.ordersRepository.save(order);

    const urlFront =
      process.env.URL_FRONT || 'http://localhost:3001';

    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN!,
      });

      const preference = new Preference(client);
      const mpResponse = await preference.create({
        body: {
          items: [
            {
              id: experience.id,
              title: experience.title,
              quantity: 1,
              unit_price: Number(experience.price),
              currency_id: 'COP',
            },
          ],
          external_reference: savedOrder.id,
          back_urls: {
            success: `${urlFront}/payment/success`,
            failure: `${urlFront}/payment/failure`,
            pending: `${urlFront}/payment/pending`,
          },
          auto_return: 'approved',
        },
      });

      await this.ordersRepository.update(savedOrder.id, {
        preferenceId: mpResponse.id ?? null,
      });

      // sandbox_init_point for test credentials; init_point for production
      const initPoint =
        mpResponse.sandbox_init_point ?? mpResponse.init_point ?? '';

      if (!initPoint) {
        throw new InternalServerErrorException(
          'Mercado Pago did not return a checkout URL',
        );
      }

      return { orderId: savedOrder.id, initPoint };
    } catch (error) {
      // Cleanup draft order if preference creation fails
      await this.ordersRepository.delete(savedOrder.id);
      const message =
        (error as any)?.message ||
        (error as any)?.cause?.message ||
        'Error creating Mercado Pago preference';
      throw new InternalServerErrorException(
        `Mercado Pago checkout error: ${message}`,
      );
    }
  }

  async confirmPayment(orderId: string, paymentId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order not found');

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    const newStatus = paymentData.status === 'approved';

    await this.ordersRepository.update(orderId, {
      paymentId,
      paymentStatus: paymentData.status ?? 'unknown',
      status: newStatus,
    });

    return this.ordersRepository.findOne({ where: { id: orderId } }) as Promise<Order>;
  }

  async handleWebhook(body: any): Promise<void> {
    if (body.type !== 'payment' || !body.data?.id) return;

    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN!,
      });
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: String(body.data.id) });

      const orderId = paymentData.external_reference;
      if (!orderId) return;

      const isApproved = paymentData.status === 'approved';
      await this.ordersRepository.update(orderId, {
        paymentId: String(body.data.id),
        paymentStatus: paymentData.status ?? 'unknown',
        status: isApproved,
      });
    } catch {
      // Silently ignore webhook errors — MP will retry
    }
  }
}
