import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types  } from "mongoose";

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
    @Prop({ type: Types.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({unique: true, required: true})
    username: string;

    @Prop({required: true})
    password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);