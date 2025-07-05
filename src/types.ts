export type AuthData = {
  firstName?: string;
  lastName?: string;
  emailId: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string | null;
  age?: number;
  gender?: string;
  about?: string;
  skills?: string[];
};
