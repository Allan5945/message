class User {
    private id: number;
    private password: string;
    private email: string;
    private createDate: string;
    private username: string;
    private state: number;

    public getId (): number {
        return this.id;
    }
    public setId (id: number) {
        this.id = id;
    }

    public getPassword (): string {
        return this.password;
    }
    public setPassword (password: string) {
        this.password = password;
    }

    public getEmail (): string {
        return this.email;
    }
    public setEmail (email: string) {
        this.email = email;
    }

    public getCreateDate (): string {
        return this.createDate;
    }
    public setCreateDate (createDate: string) {
        this.email = createDate;
    }

    public getUsername (): string {
        return this.username;
    }
    public setUsername (username: string) {
        this.username = username;
    }

    public getState (): number {
        return this.state;
    }
    public setState (state: number) {
        this.state = state;
    }
}
export {
    User,
};
