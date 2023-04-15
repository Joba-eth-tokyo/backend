import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import * as bcryptjs from 'bcryptjs';
import { UsersDTO } from 'src/users/dto/create-user.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { ethers } from 'ethers';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userservice: UsersService,
    private projectservice: ProjectService,
  ) {}

  async login(user: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.wallet_address = user.wallet_address;

    const message = user.message;
    const signedMessage = user.signedMessage;

    if (!message || !signedMessage) {
      isOk = false;
      return { status: 401, msg: { message: 'Invalid credentials' } };
    }

    // TODO: Refactor this section with try catch block and return error message in the catch block
    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`UserDTO validation error: ${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      // Get user information
      let userDetails = await this.userservice.findOneByAddres(user.wallet_address);

      const signerAddress = ethers.verifyMessage(message, signedMessage);
      const isValidSign = signerAddress === user.wallet_address;

      // Check if user exists
      if (userDetails == null && isValidSign) {
        await this.userservice.create(userDTO).catch((error) => {
          this.logger.debug(`Create user error: ${error.message}`);
          return { status: 400, msg: { message: 'Create user Error' } };
        });
        userDetails = await this.userservice.findOneByAddres(user.wallet_address);
      }
      // Check if the given password match with saved password
      const isValid = user.wallet_address === userDetails.wallet_address;
      if (isValid && isValidSign) {
        // Generate JWT token
        return {
          status: 200,
          msg: {
            wallet_address: user.wallet_address,
            access_token: this.jwtService.sign({ wallet_address: user.wallet_address }, { expiresIn: '10d' }),
          },
        };
      } else {
        // Password or wallet_address does not match
        return { status: 401, msg: { message: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { message: 'Invalid fields.' } };
    }
  }

  async createProfile(body: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.wallet_address = body.wallet_address;
    userDTO.email = body.email || null;
    userDTO.display_name = body.display_name || null;
    userDTO.profile_photo = body.profile_photo || null;
    userDTO.phone = body.phone || null;
    userDTO.telegram_user_link = body.telegram_user_link || null;
    userDTO.residential_address = body.residential_address || null;
    userDTO.is_signup_completed = body.is_signup_completed;

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      let user: any = await this.userservice.findOneByAddres(body.wallet_address);

      if (user) {
        // update user if already exist
        user = await this.userservice.update(user.id, userDTO).catch((error) => {
          this.logger.debug(error.message);
          isOk = false;
        });
      } else {
        // create user if not exist
        user = await this.userservice.create(userDTO).catch((error) => {
          this.logger.debug(error.message);
          isOk = false;
        });
      }

      if (isOk) {
        return { status: 201, content: { data: user, msg: 'User created with success' } };
      } else {
        return { status: 400, content: { data: user, msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }

  async findUserDataByAddress(wallet_address: string) {
    const userData = await this.userservice.findOneByAddres(wallet_address);

    const projectsRes = await this.projectservice.findAll(userData);
    const projects = projectsRes.content.data;

    return {
      user: userData,
      projects,
    };
  }
}
