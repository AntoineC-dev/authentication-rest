import { DocumentType } from "@typegoose/typegoose";
import { FilterQuery, Types } from "mongoose";
import { Session, SessionModel } from "../models";

export async function createSession(user: string | Types.ObjectId, userAgent: string) {
  return SessionModel.create({ user, userAgent });
}

export async function getSessionWhereLean(query: FilterQuery<DocumentType<Session>>) {
  return SessionModel.findOne(query).lean();
}

export async function invalidateSession(sessionId: string | Types.ObjectId) {
  return SessionModel.updateOne({ _id: sessionId }, { valid: false });
}

export async function invalidateAllSessions(user: string | Types.ObjectId) {
  return SessionModel.updateMany({ user }, { valid: false });
}
