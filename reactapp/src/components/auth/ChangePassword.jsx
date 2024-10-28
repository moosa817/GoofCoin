import { DangerAlert, SuccessAlert } from "../alerts";
import { useState } from 'react';
import { ChangePwd } from './PasswordChange';
export default function ChangePassword() {

    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');

    async function handleUpdateForm(e) {
        e.preventDefault();
        let old = e.target.floating_old;
        let password = e.target.floating_password;
        let confirm = e.target.floating_confirm;

        old.classList.remove('border-red-600');
        password.classList.remove('border-red-600');
        confirm.classList.remove('border-red-600');

        if (old.value.length < 8) {
            old.classList.add('border-red-600')
            setErrorMsg("Current password must be at least 8 characters long")
            return;
        }

        if (password.value.length < 8) {
            password.classList.add('border-red-600')
            setErrorMsg("Password must be at least 8 characters long")
            return;
        }

        if (password.value !== confirm.value) {
            confirm.classList.add('border-red-600')
            setErrorMsg("Passwords do not match")
            return;
        }

        const result = await ChangePwd(old.value, password.value, confirm.value, localStorage.getItem('token'))

        //reset form values
        old.value = '';
        password.value = '';
        confirm.value = '';

        if (result === true) {
            setSuccessMsg("Password changed successfully")
        }
        else {
            console.log(result)
            setErrorMsg(result.message)


        }

    }

    return (
        <form id="password" className="w-full mx-auto my-5" onSubmit={handleUpdateForm}>
            {ErrorMsg != '' ? <DangerAlert msg={ErrorMsg} /> : null}
            {SuccessMsg != '' ? <SuccessAlert msg={SuccessMsg} /> : null}


            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    name="floating_old"
                    id="floating_old"
                    autoComplete="current-password"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_old" className="peer-focus:font-bold absolute text-sm text-gray-400 font-semibold dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    autoComplete="new-password"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_password" className="peer-focus:font-bold font-semibold absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    name="floating_confirm"
                    id="floating_confirm"
                    autoComplete="new-password"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_confirm" className="peer-focus:font-bold absolute text-sm font-semibold text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New Password</label>
            </div>
            <div>
                <button type="submit" className="bg-primary p-2.5 w-full rounded shadow-xl hover:scale-105 duration-300 hover:font-extrabold">Change Password</button>
            </div>
        </form>)
}