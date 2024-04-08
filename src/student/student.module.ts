import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Student , studentSchema } from './student.entity';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Student.name,
      schema: studentSchema,
    }
  ])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
