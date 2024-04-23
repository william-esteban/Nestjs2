import { Controller, Get, Post, Body, Delete, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';

const jwt_secret = '##asasasdsa';


@Controller('student')
export class StudentController {

constructor(private readonly StudentService: StudentService ) {}

@Get('/busqueda')
obtainStudent(){
    return this.StudentService.findAll();
}

@Post('/crear')
createStudent(@Body() body){
    return this.StudentService.createStudent(body);
}


@Put(':id')
async updateStudent(@Param('id') id, @Body() body){
    return await this.StudentService.update(id, body);
}


@Delete(':id')
deleteStudent(@Param('id') id: string){
    return this.StudentService.deleteStudent(id);
}


@Post('register')
async registerStudent(@Body() body){
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.StudentService.createStudent({
        name,
        email,
        password: hashedPassword,
    });
    return user;

    };



@Post('login')
async  register(@Body() body){
    return this.StudentService.validate(body.email, body.password);
    
}


}