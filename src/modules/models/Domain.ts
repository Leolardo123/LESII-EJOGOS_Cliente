import { PrimaryGeneratedColumn } from 'typeorm';
class Domain {
    @PrimaryGeneratedColumn()
    id: number;
}

export default Domain;