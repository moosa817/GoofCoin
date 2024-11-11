import { useState, useRef } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

function TransactionPanel() {
    const [text, setText] = useState(""); // username/public key
    const textareaRef = useRef(null);

    const [Amount, setAmount] = useState("");


    console.log(text, Amount);
    const handleInput = (event) => {
        setText(event.target.value);

        // Reset the height to auto to calculate the correct scroll height
        textareaRef.current.style.height = 'auto';

        // Calculate new height, capped at 10 rows (240px)
        const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 24);
        textareaRef.current.style.height = `${newHeight}px`;

        // Toggle overflow based on whether the height reached the maximum limit
        textareaRef.current.style.overflowY = newHeight >= 10 * 24 ? 'auto' : 'hidden';
    };

    return (
        <div>
            <div className="p-6 bg-[#3b4691] text-white rounded-xl border border-[#50acf7] mb-4">
                {/* Header */}
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
                        className="block py-2.5 w-full px-0 text-sm bg-transparent border-0 border-b-2 border-primary appearance-none text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        style={{ maxHeight: '240px', overflowY: 'hidden' }} // Initial overflow hidden
                    />
                    <label
                        htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter PublicKey or Username of Recipient
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-primary appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-300 peer" placeholder="" onChange={(e) => setAmount(e.target.value)} required />
                    <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-400 font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                </div>

                {/* Send Button */}
                <button
                    className="w-full py-3 my-4 bg-primary text-background rounded-lg flex items-center justify-center font-semibold text-lg transition duration-300 hover:bg-accent hover:text-secondary hover:shadow-xl"
                >
                    Send
                    <HiOutlineArrowRight className="ml-2 text-xl" />
                </button>
            </div>
        </div>
    );
}

export default TransactionPanel;
