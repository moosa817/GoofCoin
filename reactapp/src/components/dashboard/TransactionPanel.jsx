import { useState, useRef, useEffect, useContext } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { DangerAlert, SuccessAlert } from "../alerts";
import { MakeTransaction } from "./TransactionAuth";
import { LoginContext } from "../auth/AuthContext";

const LoadingSvg = (text) => {
    return (`<div role="status" class="flex items-center justify-center">
    <svg aria-hidden="true" class="inline w-6 h-6 text-white animate-spin  fill-gray-300 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="mx-1">${text}...</span>
        </div>`)
}

function TransactionPanel() {
    const { setRecentTransactions, setBalance } = useContext(LoginContext);
    const [text, setText] = useState(""); // username/public key
    const textareaRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState([]);
    const [amount, setAmount] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [ErrorKey, setErrorKey] = useState(0);
    const [SuccessMsg, setSuccessMsg] = useState("");

    const resetForm = () => {
        setText("");
        setAmount("");
        setFile(null);
        setFileName("");
        setErrorMsg("");
        setIsSubmitted(false);
        setErrors([]);
    };

    const validateFile = (file) => {
        const maxSize = 1 * 1024 * 1024; // 1MB
        const validExtension = ".pem";

        if (!file) return "Please select a file.";
        if (file.size > maxSize) return "File size exceeds 1MB.";
        if (!file.name.endsWith(validExtension)) return "File must have a .pem extension.";
        return "";
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile?.name || "");

        const fileError = validateFile(selectedFile);

        if (fileError) {
            setErrors((prevErrors) => [...prevErrors, "file"]);
            setErrorMsg(fileError);
            setErrorKey((prevKey) => prevKey + 1);
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "file"));
            setErrorMsg("");
        }

    };


    useEffect(() => {
        if (isSubmitted) validateInputs();
    }, [text, amount, file]);

    const handleInput = (event) => {
        setText(event.target.value);

        textareaRef.current.style.height = "auto";
        const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 24);
        textareaRef.current.style.height = `${newHeight}px`;
        textareaRef.current.style.overflowY = newHeight >= 10 * 24 ? "auto" : "hidden";

    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const validateInputs = () => {
        const newErrors = [];
        const fileError = validateFile(file);
        if (fileError) {
            newErrors.push("file");
            setErrorMsg(fileError);
        }

        if (!text) newErrors.push("text");


        if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
            newErrors.push("amount");
            setErrorMsg("Please enter a valid amount.");
        }

        if (!text) {
            setErrorMsg("Please enter a valid recipient.");
        }




        setErrors(newErrors);
        if (newErrors.length === 0) {
            setErrorMsg("");
            return true;
        } else {
            setErrorKey((prevKey) => prevKey + 1);
            return false;
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();


        setIsSubmitted(true);
        const IsValidated = validateInputs();
        if (IsValidated) {

            event.target.disabled = true;
            event.target.innerHTML = LoadingSvg('Processing Transaction');

            const result = await MakeTransaction(amount, text, file);
            if (result.error === false) {
                setSuccessMsg(result.message);
                setRecentTransactions(result.recentTransactions);
                setBalance(result.balance);

                event.target.disabled = false;
                event.target.innerHTML = `Send`;
                resetForm();

            } else {
                event.target.disabled = false;
                event.target.innerHTML = `Send`;
                setErrorMsg(result.message);
                if (result.errors) {
                    setErrors(result.errors);
                }

                setErrorKey((prevKey) => prevKey + 1);
            }
        };
    }

    return (
        <div>
            {ErrorMsg && <DangerAlert msg={ErrorMsg} n={ErrorKey} />}
            {SuccessMsg && <SuccessAlert msg={SuccessMsg} />}
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
                        className={`block py-2.5 w-full px-0 text-sm bg-transparent border-0 border-b-2 ${errors.includes("text") ? "border-red-600" : "border-primary"
                            } text-white focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        required
                        style={{ maxHeight: "240px", overflowY: "hidden" }}
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
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.includes("amount") ? "border-red-600" : "border-primary"
                            } text-white focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        onChange={handleAmountChange}
                        value={amount}
                        required
                    />
                    <label
                        htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Amount
                    </label>
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
                        className={`block w-full py-3 px-5 text-sm font-semibold text-white ${isSubmitted && !fileName ? "bg-red-500" : "bg-primary"
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
                    className="w-full py-3 my-4 bg-primary text-background rounded-lg flex items-center justify-center font-semibold sm:text-lg transition duration-300 hover:bg-accent hover:shadow-xl hover:scale-[1.02] hover:text-white"
                >
                    Send
                    <HiOutlineArrowRight className="ml-2 text-xl" />
                </button>
            </div>
        </div>
    );
}

export default TransactionPanel;
