import { UpdateProfile } from './UpdateProfile.js';
import { DangerAlert,SuccessAlert } from '../alerts.jsx';
import { useState } from "react";
export default function ChangeProfile({ name, username, email }) {

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    async function handleUpdateForm(e) {
        e.preventDefault();
        let name1 = e.target.floating_name.value;
        let username1 = e.target.floating_username.value;
        let email1 = e.target.floating_email.value;

        e.target.floating_username.classList.remove('border-red-600')
        e.target.floating_email.classList.remove('border-red-600')


        let update_btn = document.getElementById('update-btn');
        update_btn.innerHTML = "Updating...";
        if (name != name1 || username != username1 || email1 != email) {
            const result = await UpdateProfile(name1, username1, email1, localStorage.getItem('token'))

            if (result !== true) {
                if (result.email) {
                    e.target.floating_email.classList.add('border-red-600')
                    setErrorMsg(result.email[0])
                    update_btn.innerHTML = "Update";
                    return
                }
                if (result.username) {
                    e.target.floating_username.classList.add('border-red-600')
                    setErrorMsg(result.username[0]);
                    update_btn.innerHTML = "Update";
                    return
                }
            } else {
                setSuccessMsg('Profile Updated');
                update_btn.innerHTML = "Updated";
                setTimeout(() => {
                    update_btn.innerHTML = "Update";
                }, 2000)
            }


        } else {
            setTimeout(() => {
                update_btn.innerHTML = "Update";
            }, 2000)

        }
    }
    return (
        <form id="profile" className="w-full mx-auto my-5" onSubmit={handleUpdateForm}>
            {errorMsg != '' ? <DangerAlert msg={errorMsg} /> : null}
            {successMsg != '' ? <SuccessAlert msg={successMsg} /> : null}

            <div className="relative z-0 w-full mb-5 group">
                <input
                    defaultValue={name}
                    type="text"
                    name="floating_name"
                    id="floating_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_name" className="peer-focus:font-bold absolute text-sm text-gray-400 font-semibold dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    defaultValue={username}
                    type="text"
                    name="floating_username"
                    id="floating_username"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_username" className="peer-focus:font-bold font-semibold absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    defaultValue={email}
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_email" className="peer-focus:font-bold absolute text-sm font-semibold text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div>
                <button type="submit" className="bg-primary p-2.5 w-full rounded shadow-xl hover:scale-105 duration-300 hover:font-extrabold" id="update-btn">Update</button>
            </div>
        </form>
    );
}