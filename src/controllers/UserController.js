import User from '../models/User.js';
import randomKey from 'random-key';

export default class UserController {

    get = async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username, password: req.body.password});

            if(user){
                const token = await randomKey.generate();
                await user.updateToken(token);

                res.json({user});
            }else{
                res.json({user: null});
            }
        }catch(e){
            res.json(errorMsg('There was an issue logging in', 500));
        }
    }

    post = async (req, res) => {
        try {
            await new User({username: req.body.username, password: req.body.password});
            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an issue adding the user', 500));
        }
    }

}
