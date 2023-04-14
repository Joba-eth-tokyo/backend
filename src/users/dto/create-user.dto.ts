import { IsBoolean, IsEmail, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Phone {
  country_code: number;
  number: number;
}

class ResidentialAddress {
  street_address: string;
  city: string;
  province: string;
  country: string;
}
export class UsersDTO {
  @IsNotEmpty()
  @IsString()
  wallet_address: string;

  @IsOptional()
  @IsString()
  profile_photo?: string;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telegram_user_link?: string;

  @IsOptional()
  @IsJSON()
  phone?: Phone;

  @IsOptional()
  @IsJSON()
  residential_address?: ResidentialAddress;

  @IsOptional()
  @IsBoolean()
  is_signup_completed?: boolean;
}
