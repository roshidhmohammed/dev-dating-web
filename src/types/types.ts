export type AuthData = {
  firstName?: string;
  lastName?: string;
  emailId: string;
  password: string;
};

export interface UserData  {
  _id: string ;
  firstName?: string | null,
  lastName?: string | null,
  emailId: string,
  isSubscribed?:boolean,
  about?: string,
  profilePic?: undefined  |  string,
  age?: number,
  gender?: string,
  skills?: string[],
  createdAt?:string,
  updatedAt?:string,
};

export type UserDataState =  {
  user:UserData
}

export interface RequestsType {
  createdAt:string,
receiverId:string
senderId:UserData
status:string
updatedAt:string
_id:string
}

export type metaData = {
  title:string,
description:string,
keywords:string,
image?:string,
url:string
}
