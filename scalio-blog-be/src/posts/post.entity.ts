import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public body: string;

  @Column({type: 'int', default: 1})
  public userId: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)', onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;
}
 
export default Post;