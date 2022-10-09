import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
class Domain {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;
}

export default Domain;