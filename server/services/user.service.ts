import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  metadata?: Record<string, any>;
}

export interface UpdateProfileRequest {
  dob?: Date;
  address?: string;
  preferences?: Record<string, any>;
}

export class UserService {
  
  /**
   * Create new user with profile
   */
  static async createUser(request: CreateUserRequest) {
    const passwordHash = await bcrypt.hash(request.password, 10);
    
    return await prisma.user.create({
      data: {
        id: uuidv4(),
        email: request.email,
        passwordHash,
        name: request.name,
        phone: request.phone,
        role: request.role || 'USER',
        isVerified: false,
        profile: {
          create: {
            id: uuidv4()
          }
        }
      },
      include: {
        profile: true
      }
    });
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    });
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true
      }
    });
  }

  /**
   * Update user
   */
  static async updateUser(userId: string, request: UpdateUserRequest) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...request,
        updatedAt: new Date()
      },
      include: {
        profile: true
      }
    });
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, request: UpdateProfileRequest) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.profile) {
      return await prisma.profile.update({
        where: { id: user.profile.id },
        data: {
          ...request,
          updatedAt: new Date()
        }
      });
    } else {
      return await prisma.profile.create({
        data: {
          id: uuidv4(),
          userId,
          ...request
        }
      });
    }
  }

  /**
   * Verify user email
   */
  static async verifyUser(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true }
    });
  }

  /**
   * Change password
   */
  static async changePassword(userId: string, newPassword: string) {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    return await prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    });
  }

  /**
   * Verify password
   */
  static async verifyPassword(user: any, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHash);
  }
}

export default UserService;
