const passwordCheck = ({password, passwordCheck}: {password: string, passwordCheck: string}) => {
    let correct = true;

    if (password !== passwordCheck)
        correct = false;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(password) && process.env.NODE_ENV === "production") correct = false;

    return correct;
}

export default passwordCheck;