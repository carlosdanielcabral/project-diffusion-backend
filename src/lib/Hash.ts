import bcrypt from 'bcrypt';

class Hash {
    public static saltRounds = 10;

    public static hash(text: string): string {
        return bcrypt.hashSync(text, Hash.saltRounds);
    }

    public static async compare(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash);
    }
}

export default Hash;
