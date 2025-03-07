import { HashingServiceProvider } from "../../services/hash/hash.service";
import { User } from "../models/user.model";

class UserRepository {
  private static instance: UserRepository;

  constructor() {}

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    // if(!user) throw new AppError(400, 'user not found in this email')
    return user;
  }

  async findById(id: string) {
    const user = await User.findById(id);

    if (!user) throw new Error("User not found.");

    return user;
  }

  async create(
    first_name: string,
    last_name: string,
    email: string,

    password: string,
    role: string
  ) {
    const checkUser = await User.findOne({ email });

    if (checkUser) throw new Error("Duplicate user.");

    const hashedPassword = await HashingServiceProvider.getProvider().hash(
      password
    );

    const user = new User({
      first_name,
      last_name,
      email,

      password: hashedPassword,
    });
    const newUser = await User.create(user);

    return newUser;
  }
}

export { UserRepository };
