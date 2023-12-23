export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  token?: string;
}