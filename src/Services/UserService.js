export const verifyRegForm = (username,email,password,re_password) => {

    if (!/^[a-z0-9_]{4,45}$/.test(username)){
        return 'The username must be between 4 - 45 characters (Only letters numbers and _ allowed!)';
    }

    if (!/^[a-z0-9_]+[@][a-z]{2,7}[.][a-z]{2,7}$/.test(email)){
        return 'Please enter valid email!';
    }

    if (password.length < 8 || password.length > 45){
        return 'The password must be between 8 and 45 chars!';
    }

    if (password !== re_password){
        return 'The password and re-password does not match!';
    }

    return undefined;
}