export interface UserInterface {
  _id: string;
  name: string;
  firstName: string;
  password: string;
  phone: string;
  email: string;
  healthCard: string;
  role: 'user' | 'moderator' | 'admin' | 'superadmin';
  accountStatus: string;
  sharedResources: string[];
  groups: string[];
}
