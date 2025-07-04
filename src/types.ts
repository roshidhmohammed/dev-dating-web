export type LoginFormData = {
    emailId:string,
    password:string
}

export type User = {
    _id:string,
  firstName: string;
  lastName: string;
  profilePic: string | null;
  age?: number;
  gender?: string;
  about?: string;
  skills?: []
}