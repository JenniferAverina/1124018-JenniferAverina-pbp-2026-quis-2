import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Comments } from './Comments';

@Table({
    tableName: 'Post',
    timestamps: true,
    paranoid: true,
})
export class Post extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare post_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare content: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => Comments, 'post_id')
    comment!: Comments[];

}