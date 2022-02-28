import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

@index({ createdAt: 1 }, { expires: "1y" })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;

  @prop({ required: true })
  userAgent: string;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
