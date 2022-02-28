import { FilterQuery, Types } from "mongoose";
import { User, UserModel } from "../models";

export async function createUser(payload: Pick<User, "username" | "email" | "password">) {
  return UserModel.create(payload);
}

export async function getUserById(id: string | Types.ObjectId) {
  return UserModel.findById(id);
}

export async function getUserByIdLean(id: string | Types.ObjectId) {
  return UserModel.findById(id).lean();
}

export async function getUserWhere(query: FilterQuery<User>) {
  return UserModel.findOne(query);
}

export async function getUserWhereLean(query: FilterQuery<User>) {
  return UserModel.findOne(query).lean();
}
