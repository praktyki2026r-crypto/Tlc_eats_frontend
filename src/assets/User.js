export class User{
    constructor(id, names, email, password, role){
        this.id = id
        this.names = names
        this.email = email
        this.password = password
        
        if (role === 'admin')
        {
            this.role = role
        }else{
            this.role = 'user'
        }
    }
}