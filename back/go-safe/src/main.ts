import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { Instructor } from './instructors/entities/instructor.entity';
import { Role } from './auth/guards/roles.enum';

async function seedDemoInstructor(app: any) {
  const DEMO_EMAIL = 'instructor.demo@gosafe.local';
  const DEMO_PASSWORD = 'DemoInstructor123!';

  const dataSource = app.get(DataSource);
  const usersRepo = dataSource.getRepository(User);
  const instructorsRepo = dataSource.getRepository(Instructor);

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 12);

  let demoUser = await usersRepo.findOne({
    where: { email: DEMO_EMAIL },
    relations: { instructor: true },
  });

  if (!demoUser) {
    demoUser = usersRepo.create({
      firstName: 'Instructor',
      lastName: 'Demo',
      userName: 'instructor_demo',
      documentType: 'CC',
      document: 987654321,
      genre: 'Male',
      birthdate: '1990-01-01',
      address: 'Direccion demo',
      phone: 3001234567,
      country: 'Colombia',
      city: 'Bogota',
      email: DEMO_EMAIL,
      password: hashedPassword,
      role: Role.Instructor,
      profilePic: 'https://i.pravatar.cc/300?img=12',
      status: true,
    });

    demoUser = await usersRepo.save(demoUser);
  } else {
    await usersRepo.update(demoUser.id, {
      password: hashedPassword,
      role: Role.Instructor,
      status: true,
    });
  }

  const existingInstructor = await instructorsRepo.findOne({
    where: { user: { id: demoUser.id } },
    relations: { user: true },
  });

  if (!existingInstructor) {
    const demoInstructor = instructorsRepo.create({
      user: demoUser,
      career: 'Licenciado en Deportes',
      institution: 'SENA',
      level: 'Profesional',
      period: '2010-2014',
      onCourse: false,
      about:
        'Instructor demo para pruebas del sistema GoSafe. Especialista en actividades outdoor.',
    });

    await instructorsRepo.save(demoInstructor);
  }

  console.log('Demo instructor ready:');
  console.log(`email: ${DEMO_EMAIL}`);
  console.log(`password: ${DEMO_PASSWORD}`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
    'https://gosafe-5g57.onrender.com',
    'https://gosafe-5g57.onrender.com/docs',
    'https://gosafe-seven.vercel.app',
  ];

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Go-Safe API Documentation')
    .setDescription('documentation of Go-safe project')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  await seedDemoInstructor(app);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
