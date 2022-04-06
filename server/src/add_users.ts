import { User } from './models/user'
import { validUsers} from './valid_users'
import * as bcrypt from 'bcrypt'
import { UserInfo } from 'os';

export async function saveUser() {
    
    try {
        let userEmailsArr = Object.keys(validUsers);

        for (let i = 0; i < userEmailsArr.length; i++) {
            

            let userEmail = userEmailsArr[i];
            let userIsExist = await User.exists({email: userEmail});

            if (!userIsExist) {
                try{
                    const salt = await bcrypt.genSalt(10);
                    const password = await bcrypt.hash(validUsers[userEmail], salt);
                    console.log(validUsers[userEmail], " ", password, " salt: ", salt)
                    let user = await User.create({email: userEmail, password: password, salt: salt})
                    console.log(user);
                } catch(err) {
                    let error = err as Error;
                    console.log(error.message)
                }
            }

            
        }
    } catch (err) {
        let error = err as Error;
        console.log(error.message)
    }
}