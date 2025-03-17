import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// local imports
import { User } from '../users/entities/user.entity';

export async function generateHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function generateJwtToken(user: User): { token: string } {
  return {
    token: jwt.sign({ email: user.email, role: user.role }, 'secretKey', {
      expiresIn: '24h'
    })
  };
}
