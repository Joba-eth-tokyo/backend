import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        wallet_address: '0xca25c45e67E0e8A748F83916f4EFB5D95bbeB4da',
        message: 'test',
        signedMessage: 'test',
      },
    },
  })
  async login(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }

  @Post('create-profile')
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        email: 'youremail@example.com',
        wallet_address: '1321312312312',
        display_name: '',
        profile_photo: '',
        telegram_user_link: '',
        phone: '{\n\t\t"country_code": 91,\n\t\t"number": 3123123\n\t}',
        residential_address: '{\n\t\t"street_address": "dsd",\n\t\t"city": "dsd",\n\t\t"province": "ds",\n\t\t"country": "ds"\n\t}',
      },
    },
  })
  async createProfile(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.createProfile(body);
    res.status(auth.status).json(auth.content);
  }

  @Get('profile/:address')
  @ApiParam({
    name: 'address',
    schema: {
      example: '0xca25c45e67E0e8A748F83916f4EFB5D95bbeB4da',
    },
  })
  async getProfile(@Req() req, @Res() res, @Body() body, @Param('address') address) {
    const user = await this.userService.findOneByAddres(address);
    if (user) {
      const userData = {
        ...user,
        residential_address: JSON.parse(`${user.residential_address}`),
        phone: JSON.parse(`${user.phone}`),
      };
      res.status(200).json(userData);
    } else {
      res.status(400).json({ message: 'User not found', ok: false });
    }
  }
}
