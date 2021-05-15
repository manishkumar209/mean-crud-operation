import user from '../model/user.model'
var multer  = require('multer')
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './profile_images');
    },
    filename: function (req, file, next) {
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});

var upload = multer({ storage: storage }).single('imageFile');

// Add new user
export const addUser = async (req, res) => {
    try{
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.json({ 'success': false, 'message': err.message })
                // A Multer error occurred when uploading.
            } else if (err) {
                return res.json({ 'success': false, 'message': err.message })
                // An unknown error occurred when uploading.
            }
            var data_obj = JSON.parse(req.body.data);
           
            if(!data_obj.fname)
            return res.json({'success': false, 'message':'fname not found'});

            if(!data_obj.lname)
            return res.json({'success': false, 'message':'lname not found'});

            if(!data_obj.email)
            return res.json({'success': false, 'message':'email not found'});

            let checkEmail = await user.findOne({email: data_obj.email}).exec();
            if(checkEmail)
            return res.json({'success': false, 'message':'email already exist'});

            if(!data_obj.phone_number)
            return res.json({'success': false, 'message':'phone_number not found'});

            if(typeof(data_obj.phone_number) != 'number')
            return res.json({'success': false, 'message':'phone_number shoulb be number only'});

            if(!data_obj.profile_image)
            return res.json({'success': false, 'message':'profile photo not found'});

            let obj = {
                fname: data_obj.fname,
                lname: data_obj.lname,
                email: data_obj.email,
                phone_number: data_obj.phone_number,
                profile_image: req.file.filename,
            }
            const newObj = new user(obj);
            let result = await newObj.save();
            if(result)
            return res.json({'success': true, 'message': 'User added'})
            else
            return res.json({'success': false, 'message': 'Error in user add'})
        })
    }catch(err){
        console.log(err.message)
        return res.json({'success': false, 'message': err.message})
    }
}
// Get single user with details
export const getUsers = async (req, res) => {
    try{
        let allUser = await user.find().exec();
        return res.json({'success': true, 'data': allUser})

    }catch(err){
        return res.json({'success': false, 'message': err.message})
    }
}
// Get all users
export const getUser = async (req, res) => {
    try{
        let singleUser = await user.findOne({_id: req.params.id}).exec();
        return res.json({'success': true, 'data': singleUser})
    }catch(err){
        return res.json({'success': false, 'message': err.message})
    }
}
// Update user
export const updateUser = async (req, res) => {
    try{
        if(!req.body.fname)
        return res.json({'success': false, 'message':'fname not found'});

        if(!req.body.lname)
        return res.json({'success': false, 'message':'lname not found'});

        if(!req.body.email)
        return res.json({'success': false, 'message':'email not found'});

        if(!req.body.phone_number)
        return res.json({'success': false, 'message':'phone_number not found'});

        if(typeof(req.body.phone_number) != 'number'){
            return res.json({'success': false, 'message':'phone_number shoulb be number only'});
        }

        let updatedUser = await user.updateOne({_id: req.params.id},{ $set: req.body },{new: true});
        if(updatedUser)
        return res.json({'success': true, 'meassge': 'User updated'})

    }catch(err){
        console.log(err)
        return res.json({'success': false, 'message': err.message})
    }
}
// Delete user 
export const deleteUser = async (req, res) => {
    try{
        let result = await user.deleteOne({_id: req.params.id}).exec();
        if(result)
        return res.json({'success': true, 'meassge': 'User deleted'})
    }catch(err){
        return res.json({'success': false, 'message': err.message})
    }
}

// Get Image
export const getImage = async (req, res) => {
    try{
        let singleUser = await user.findOne({_id: req.params.id}).exec();
        if(singleUser){
            var filepath = path.join(__dirname, '../profile_images/', singleUser.profile_image);
            return res.sendfile(filepath);
        }
        
    }catch(err){
        console.log(err)
        return res.json({'success': false})
    }
}
