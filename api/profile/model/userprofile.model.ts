import { Table, Column, Model, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: "profiles",
})

export class UserProfile extends Model {

  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  id: string
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  amka: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nationality: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  weight: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  height: number;
  
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}