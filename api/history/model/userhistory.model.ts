import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, AutoIncrement } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: "history",
})

export class UserHistory extends Model {

  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  exam: string
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  importance: string
  
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  place: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fileName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  filePath: string;
 
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}