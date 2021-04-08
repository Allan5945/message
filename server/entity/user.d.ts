declare class User {
    private id;
    private password;
    private email;
    private createDate;
    private username;
    private state;
    getId(): number;
    setId(id: number): void;
    getPassword(): string;
    setPassword(password: string): void;
    getEmail(): string;
    setEmail(email: string): void;
    getCreateDate(): string;
    setCreateDate(createDate: string): void;
    getUsername(): string;
    setUsername(username: string): void;
    getState(): number;
    setState(state: number): void;
}
export { User, };
