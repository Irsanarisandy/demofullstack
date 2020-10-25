import { User } from './user';

export class UserParams {
  public gender: string;
  public minAge = 18;
  public maxAge = 80;
  public pageNumber = 1;
  public pageSize = 5;
  public orderBy = 'lastActive';

  constructor(user: User) {
    this.gender = user.gender === 'male' ? 'female' : 'male';
  }
}
