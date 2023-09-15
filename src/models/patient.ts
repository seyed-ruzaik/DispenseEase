import {
    AllowNull,
    AutoIncrement,
    Column,
    NotEmpty,
    PrimaryKey,
    Table,
    Model
} from "sequelize-typescript";
import { DataTypes } from "sequelize";


@Table({
    tableName: "patients",
    timestamps: true,
})
export default class Patient extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column(DataTypes.STRING)
    first_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataTypes.STRING)
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataTypes.STRING)
    mobile_number!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataTypes.STRING)
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataTypes.STRING)
    password!: string;

    @Column(DataTypes.STRING)
    image?: string;

}
