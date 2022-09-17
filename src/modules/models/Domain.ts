import { PrimaryGeneratedColumn } from 'typeorm';
class Domain {
    @PrimaryGeneratedColumn()
    readonly id: number;
}

export default Domain;