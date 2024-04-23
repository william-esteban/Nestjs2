import { Injectable, Body, HttpException, HttpStatus,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.entity';
import { Model } from'mongoose';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private StudentModule: Model<Student>,){}

    // busqueda// get
    async findAll(){
        return await this.StudentModule.find().exec();
    }

    // crear// post

    async incriptPasword(password:string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }


    async createStudent(@Body() body): Promise<Student> {
 
        body.password = await this.incriptPasword(body.password);
        const newStudent =  new this.StudentModule(body);
        return await newStudent.save();
    }

    // edit/ todo// put
    async update(id:string, body){
        return await this.StudentModule.findByIdAndUpdate(id, body, {new: true}).exec();
    }
    
    
    // eliminar// delete
    async deleteStudent(id: string){
        return await this.StudentModule.findByIdAndDelete(id);
    }
   
    // register
   async emailStudent(email: string): Promise<Student>{
    return await this.StudentModule.findOne({email: email}).exec();
   }

    async validate(email: string, password: string){
        const user = await this.emailStudent(email);
        if(!user){
            throw new HttpException('Usuario o contraseña incorrectos email', HttpStatus.BAD_REQUEST);
           
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.BAD_REQUEST);
        }
        const jwt_secret = '#fadfdgfshdgfhghdjhg';
        const token = jwt.sign({userId: user._id}, jwt_secret, {expiresIn: '1h'});
        return { message: 'logiado correctamente', token}
      
    }
    
}
