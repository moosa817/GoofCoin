import { useState, useRef } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { DangerAlert, SuccessAlert } from '../alerts';
import { MakeTransaction } from './TransactionAuth';

function TransactionPanel() {
    const [text, setText] = useState(""); // username/public key
    const textareaRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState([]);
    const [amount, setAmount] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [ErrorKey, setErrorKey] = useState(0);


    const resetForm = () => {
        setText('');
        setAmount('');
        setFile(null);
        setFileName('');
        setErrorMsg('');
        setIsSubmitted(false);
        setErrors([]);
    };
    const handleFileChange = (event) => {
        setFileName(event.target.files[0]?.name || "");
        setFile(event.target.files[0]);

        if (isSubmitted) validateInputs();
    };

    const handleInput = (event) => {
        setText(event.target.value);
        textareaRef.current.style.height = 'auto';
        const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 24);
        textareaRef.current.style.height = `${newHeight}px`;
        textareaRef.current.style.overflowY = newHeight >= 10 * 24 ? 'auto' : 'hidden';

        if (isSubmitted) validateInputs();
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        if (isSubmitted) validateInputs();
    };

    const validateInputs = () => {
        const newErrors = [];

        if (!text) { newErrors.push('text') }
        if (!amount || isNaN(amount)) {
            newErrors.push('amount');
            setErrorMsg('Please enter a valid amount');
        }
        if (!file) newErrors.push('file');

        if (!file || !text.length === 0 || !amount) {
            setErrorMsg('Please fill all the fields');
            console.log("here again")
        }

        setErrors(newErrors);
        if (newErrors.length === 0) {
            setErrorMsg('');
            return true;
        } else {
            setErrorKey((prevKey) => prevKey + 1);
            return false;
        }



    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        const IsValidated = validateInputs();
        if (IsValidated) {
            MakeTransaction(amount, text, file);
            resetForm();
        }
    };

    return (
        <div>
            {ErrorMsg && <DangerAlert msg={ErrorMsg} n={ErrorKey} />}
            <div className="p-6 bg-[#3b4691] text-white rounded-xl border border-[#50acf7] mb-4">
                <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-semibold text-primary">Send Coins</h2>
                    <span className="ml-2 bg-accent rounded-full h-3 w-3 animate-pulse"></span>
                </div>

                {/* Input for Recipient */}
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onInput={handleInput}
                        rows={1}
                        className={`block py-2.5 w-full px-0 text-sm bg-transparent border-0 border-b-2 ${errors.includes('text') ? 'border-red-600' : 'border-primary'
                            } text-white focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        required
                        style={{ maxHeight: '240px', overflowY: 'hidden' }}
                    />
                    <label
                        htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter PublicKey or Username of Recipient
                    </label>
                </div>

                {/* Input for Amount */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.includes('amount') ? 'border-red-600' : 'border-primary'
                            } text-white focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        onChange={handleAmountChange}
                        value={amount}
                        required
                    />
                    <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-400 font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                </div>

                {/* Private Key File Input */}
                <div className="relative z-0 w-full mb-8">
                    <label
                        htmlFor="file-upload"
                        className="block mb-2 text-sm font-semibold text-gray-400"
                    >
                        Private Key
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                    />
                    <label
                        htmlFor="file-upload"
                        className={`block w-full py-3 px-5 text-sm font-semibold text-white ${isSubmitted && !fileName ? 'bg-red-500' : 'bg-primary'
                            } rounded cursor-pointer hover:bg-secondary focus:outline-none text-lg`}
                    >
                        Choose File
                    </label>
                    {fileName && (
                        <p className="mt-2 text-sm text-gray-200 mx-2">{fileName}</p>
                    )}
                </div>

                {/* Send Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 my-4 bg-primary text-background rounded-lg flex items-center justify-center font-semibold text-lg transition duration-300 hover:bg-accent hover:shadow-xl hover:scale-[1.02] hover:text-white"
                >
                    Send
                    <HiOutlineArrowRight className="ml-2 text-xl" />
                </button>
            </div>
        </div>
    );
}

export default TransactionPanel;
