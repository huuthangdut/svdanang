
// for GET
class UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  department: string;
  email: string;
  phoneNumber: string;
  birthDate: number;
  gender: boolean;
  address: string;
  city: string;
  facebookLink: string;
  avatar: string;
}

// for POST, PUT
class UserProfileModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public birthDate: number,
    public gender: boolean,
    public address: string,
    public city: string,
    public facebookLink: string,
    public avatar: string) {
  }
}

export { UserProfile, UserProfileModel }