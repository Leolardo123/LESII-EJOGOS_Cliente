import { CreateDateColumn, DeepPartial, PrimaryGeneratedColumn } from 'typeorm';
class Domain {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    setView(): DeepPartial<Domain> {
        return this;
    }
}

export default Domain;