import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import { AuthService } from '~/services';

const initForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

function Register() {
    const Navigate = useNavigate();

    return <div className="register"></div>;
}

export default Register;
