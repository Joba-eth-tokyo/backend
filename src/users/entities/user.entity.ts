import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '', unique: true })
  wallet_address: string;

  @Column({ nullable: true })
  profile_photo: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  telegram_user_link: string;

  @Column({ type: 'json', nullable: true })
  phone: { country_code: number; number: number };

  @Column({ type: 'json', nullable: true })
  residential_address: { street_address: string; city: string; province: string; country: string };

  @Column({ default: false })
  is_signup_completed: boolean;
}
