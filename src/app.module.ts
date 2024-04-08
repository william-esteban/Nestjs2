import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ 

    MongooseModule.forRoot('mongodb+srv://william271629:3233933777@registerandlogin.1jgszwb.mongodb.net/'),
    StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
