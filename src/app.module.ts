import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://l200160149:l200160149@cluster0.m7nma.mongodb.net/?retryWrites=true&w=majority', {dbName:'nestjs_mongo'}),
    UsersModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
