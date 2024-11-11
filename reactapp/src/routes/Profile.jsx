/* eslint-disable react-hooks/exhaustive-deps */
import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useParams, Link } from "react-router-dom";
import { config } from "../config";
import Loading from '../components/Loading';
import { TransactionBox } from '../components/transaction/TransactionsComp';
import BlockchainView from "../components/BlockChainComp"


// Function to get the profile data
const GetProfile = async (Username) => {
    let response = await fetch(`${config.API_URL}/api/get_profile/${Username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile data");
    }
    let data = await response.json();
    return data;
}

const Profile = () => {
    let params = useParams();
    let UrlUsername = params.username;
    const { isLogin, Username: loggedInUsername } = useContext(LoginContext); // `Username` renamed to `loggedInUsername`
    const { openModal } = useContext(ModalContext);

    const [page, setPage] = useState("transactions")
    const [isLoading, setisLoading] = useState(true); // Loading state
    const [profileData, setProfileData] = useState(null); // State to hold profile data

    // Check login status and open modal if not logged in
    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);

    // Redirect to home page if not logged in
    if (!isLogin) {
        return <Navigate to="/" />;
    }

    const fetchProfile = async () => {
        setisLoading(true); // Set loading state before fetching
        try {
            const result = await GetProfile(UrlUsername);
            setProfileData(result); // Save profile data to state
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setisLoading(false); // Set loading to false after fetching
        }
    };

    // Fetch the profile when the component mounts or when UrlUsername changes
    useEffect(() => {
        fetchProfile();
    }, [UrlUsername]);



    // Set a default profile picture if not available
    const pfp = profileData?.pfp
        ? profileData.pfp
        : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${profileData?.name || "User"}&hair=short01&size=50`;

    return (
        <>
            {isLoading ? <Loading /> :
                <div>
                    <MyNav />
                    <div className="container fadeIn my-4">
                        <div className="flex justify-center flex-col items-center">
                            <div className="">
                                <img src={pfp} className="rounded-full border-[2px] border-primary shadow-2xl h-32 w-32 object-cover" alt="Profile" />
                            </div>

                            <div className="font-semibold text-lg mt-2">{profileData?.name || "User"}</div>
                            <div className="text-gray-300">@{profileData.username || "username"}</div>

                            {/* Only show Edit Profile button if it's the logged-in user's profile */}
                            {profileData?.username === loggedInUsername && (
                                <div className="mt-4">
                                    <Link to="/settings">
                                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-400 bg-background dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Edit Profile
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex justify-center flex-cols items-center">

                        <hr className="bg-slate-400 w-full opacity-25 sm:w-3/4 mb-4"></hr>





                    </div>
                    <div className="flex justify-center gap-4 my-12 sm:text-md text-lg">
                        <div onClick={() => setPage('transactions')} className={page === 'transactions' ? "settings-link text-[#74f2cc] border-b-2" : "settings-link opacity-50"}>
                            All Transactions
                        </div>


                        <div onClick={() => setPage('blockchains')} className={page === 'blockchains' ? "settings-link text-[#74f2cc] border-b-2" : "settings-link opacity-50"}>
                            BlockChains
                        </div>
                    </div>

                    <hr className="modern-hr" />

                    {page === 'transactions' ?
                        <div className="fadeIn">                    {/* balance */}
                            <div className="flex justify-center items-center my-2 ">
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90">{profileData.username}&apos; Balance</div>
                                    <div className="transaction-no">{profileData.received_amount - profileData.sent_amount}</div>
                                </div>
                                <span className="mt-2 saturate-150 text-xl"> = </span>
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90">Coins Recieved</div>
                                    <div className="transaction-no">{profileData.received_amount}</div>
                                </div>
                                <span className="mt-2 saturate-150 text-xl">-</span>
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90">Coins Spent</div>
                                    <div className="transaction-no">{profileData.sent_amount}</div>
                                </div>
                            </div>
                            <hr className="modern-hr" />


                            <TransactionBox transactions={profileData.transactions} />
                        </div> :
                        <div>
                            <div className="flex justify-center items-center my-2 ">
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90 text-sm sm:text-lg text-center">Total Blocks</div>
                                    <div className="transaction-no">{profileData.blocks_count}</div>
                                </div>
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90 text-sm sm:text-lg text-center">Total Transactions</div>
                                    <div className="transaction-no">{profileData.transactions_count}</div>
                                </div>
                                <div className="my-8 mx-4 sm:mx-16">
                                    <div className="opacity-90 text-sm sm:text-lg text-center">Average Transactions Per Block</div>
                                    <div className="transaction-no">{profileData.average_transaction}</div>
                                </div>
                            </div>
                            <hr className="modern-hr" />

                            <BlockchainView blockchainData={profileData.blocks} />
                        </div>}
                </div>

            }
        </>
    );
}

export default Profile;
