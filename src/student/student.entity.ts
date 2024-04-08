import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from'mongoose'



@Schema()
export class Student extends Document {
    @Prop()
    name: String;
    @Prop()
    email: String;
    @Prop()
    password: String;
}

export const studentSchema = SchemaFactory.createForClass(Student) 