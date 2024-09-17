import './BookRide.css';

import stats from "../../components/images/statistic.png";
import nosmok from "../../components/images/no-smoking.png";
import nopet from "../../components/images/no-pets.png";
import { useLocation } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from '../../components/ContractAdress';
import { useState } from 'react';

const carpoolAddress = ContractAdress();

function BookRide() {

    const [alertText, setAlertText] = useState("Ride Booked");
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
    console.log(location.state);
    let rideDetails = location.state;

    function setOnShowAlert(alertStatus) {
        setShowAlert(alertStatus);
    }

    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function doBookRide() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            try{
                await contract.bookRide(accounts[0], rideDetails.id);
                setOnShowAlert(true);
                setAlertText('Successfully booked a ride from ' + rideDetails.depAddress + ' to ' + rideDetails.desAddress);
            }catch(err){
                console.log(err);
            }
            
            

        }
    }

    return (
        <>
        {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}
            <div class="mas-a">
                <div class="p-1">
                    Wed, 15 March
                </div>
                <div class="p-2">
                    <div class="pm-1">
                        <div class="p-2-1">
                            <div class="pr-1">
                                <div class="p-11">{rideDetails.depTime}</div>
                                <div class="p-12">o</div>
                                <div class="p-13">{rideDetails.depAddress}
                                    <p id="psg-1">{rideDetails.depCity}</p>
                                    <p id="psg-2">5.6 km from your departure</p>
                                </div>

                            </div>

                            <div class="p-14"></div>

                        </div>
                        <div class="p-2-2">
                            <div class="pr-2">
                                <div class="p-21">21:10</div>
                                <div class="p-22">o</div>
                                <div class="p-13">{rideDetails.desAddress}
                                    <p id="psg-1">{rideDetails.desCity}</p>
                                    <p id="psg-2">10 km from your arrival</p>
                                </div>
                            </div>
                            <div class="p-24"></div>
                        </div>
                    </div>
                    <hr id="hr-1" />
                    <div class="pm-2">
                        <div class="pmmas">
                            <div class="p-m-1">Total price for 1 passenger</div>
                            <div class="p-m-2">&#8377;{rideDetails.fare}</div>
                        </div>
                    </div>
                    <hr id="hr-1" />
                    <div class="pm-3">
                        <div class="pma-3-1">
                            <div class="p-m-3">{rideDetails.hostName}</div>
                        </div>
                        <div class="pma-3-2">
                            <div class="p-m-4"><img class="profile_pic_2-1" src="/static/media/profile_pic.3851143cb81cf5063d4c.png" alt="Profile Pic" /></div>
                            <div class="p-m-5"><img class="info_pic_1" src={stats} alt="stat Pic" /></div>
                        </div>
                    </div>
                    <div class="pm-4">
                        <p id="para-1">
                            - Limited space in the boot.

                        </p>
                        <p id="para-1">- Please don't bring your pets with you.</p>
                    </div>
                    <div class="pm-5">
                        <i class="fa-regular fa-comments" ></i>&nbsp;&nbsp;&nbsp;Ask Questions To {rideDetails.hostName} ?
                    </div>
                    <hr id="hr-2" />
                    <div class="pm-6-1">
                        <div class="lst-1">
                            <li id="li-1"><img class="ban_pic_1" src={nosmok} alt="ban Pic" /> Please, no smoking in the car</li>
                            <li id="li-1"><img class="ban_pic_1" src={nopet} alt="ban Pic" /> Sorry, not a pet person</li>
                        </div>
                        <hr id="hr-2" />
                        <div class="lst-2">
                            {rideDetails.vehicleName}
                            <p id="pgp-1">{rideDetails.vehicleColor}</p>
                        </div>
                    </div>
                    <hr id="hr-1" />
                    <div class="pm-7-1">
                        Report ride
                    </div>
                </div>
                <div class="p-3">
                    <input type={'button'} class="btn-con" value={'Book'} onClick={doBookRide} />
                </div>
                <div class="p-4">
                    <div class="gr-t">
                        <div class="gr-1">
                            <div class="g-r-1">

                                <li id="li-3">Top Carpool routes</li>
                                <li id="li-2">Delhi → Chandigarh</li>
                                <li id="li-2">Mumbai → Pune</li>
                                <li id="li-2">Kanpur → Lucknow</li>
                                <li id="li-2">Bengaluru → Chennai</li>
                                <li id="li-2">Pune → Mumbai</li>
                                <li id="li-2">All carpool routes</li>
                            </div>
                            <div class="g-r-2">
                                <li id="li-4">About</li>
                                <li id="li-2">How It Works</li>
                                <li id="li-2">About Us</li>
                                <li id="li-2">Help Centre</li>
                                <li id="li-2">Press</li>
                                <li id="li-2">We're Hiring!</li>
                            </div>
                        </div>
                        <div class="gr-2">
                            <select id="footerSelectLocale">
                                <option value="v-1">English</option>
                                <option value="v-1">Čeština</option>
                                <option value="v-1">Deutsch</option>
                                <option value="v-1">English (India)</option>
                                <option value="v-1">Español</option>
                                <option value="v-1">Español (Mexico)</option>
                                <option value="v-1">Français (Belgique)</option>
                                <option value="v-1">Français</option>
                                <option value="v-1">Hrvatski</option>
                                <option value="v-1">Magyar</option>
                                <option value="v-1">Italiano</option>
                                <option value="v-1">Nederlands</option>
                                <option value="v-1">Nederlands (België)</option>
                                <option value="v-1">Polski</option>
                                <option value="v-1">Português</option>
                                <option value="v-1">Português (Brasil)</option>
                                <option value="v-1">Română</option>
                                <option value="v-1">Русский</option>
                                <option value="v-1">Slovenčina</option>
                                <option value="v-1">Srpski</option>
                                <option value="v-1">Türkçe</option>
                                <option value="v-1">Українська</option>
                            </select>
                            <div class="ico-fb">
                                <div>
                                    <li id="li-2g"><a href="https://facebook.com/carpool.in"
                                        title="Link to www.facebook.com/carpool.fr" rel="nofollow"><svg
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            class="kirk-icon sc-ktwOSD koflcE" width="36" height="36" aria-hidden="false">
                                            <title>facebook</title>
                                            <path fill-rule="evenodd" clip-rule="evenodd" fill="#d3962c"
                                                d="M12 0C5.37 0 0 5.4 0 12.07 0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07 24 5.41 18.63 0 12 0z">
                                            </path>
                                        </svg></a></li>
                                </div>
                                <div>
                                    <li id="li-2g"><a href="https://twitter.com/carpoolin"
                                        title="Link to twitter.com/carpool_FR" rel="nofollow"><svg viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" class="kirk-icon sc-ktwOSD koflcE" width="36"
                                            height="36" aria-hidden="false">
                                            <title>twitter</title>
                                            <path fill="#d3962c"
                                                d="M22 6.167c-.75.333-1.5.583-2.333.666.833-.5 1.5-1.333 1.833-2.25-.833.5-1.667.834-2.583 1a4.034 4.034 0 0 0-3-1.333 4.09 4.09 0 0 0-4.084 4.083c0 .334 0 .667.084.917-3.5-.167-6.5-1.833-8.5-4.333C3 5.583 2.833 6.25 2.833 7c0 1.417.75 2.667 1.834 3.417-.667 0-1.334-.167-1.834-.5V10c0 2 1.417 3.667 3.25 4-.333.083-.666.167-1.083.167-.25 0-.5 0-.75-.084.5 1.667 2 2.834 3.833 2.834C6.667 18 4.917 18.667 3 18.667c-.333 0-.667 0-1-.084 1.833 1.167 4 1.834 6.25 1.834 7.583 0 11.667-6.25 11.667-11.667v-.5c.833-.583 1.5-1.333 2.083-2.083z">
                                            </path>
                                        </svg></a></li>
                                </div>
                                <div>
                                    <li id="li-2g"><a href="https://youtube.com/c/carpoolIndia"
                                        title="Link to www.youtube.com/c/carpoolFR" rel="nofollow"><svg
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            class="kirk-icon sc-ktwOSD koflcE" width="36" height="36" aria-hidden="false">
                                            <title>youtube</title>
                                            <path fill="#d3962c"
                                                d="M21.833 8S21.667 6.583 21 6c-.75-.833-1.583-.833-2-.833C16.167 5 12 5 12 5s-4.167 0-7 .167C4.583 5.25 3.75 5.25 3 6c-.583.583-.833 2-.833 2S2 9.583 2 11.25v1.5c0 1.583.167 3.25.167 3.25s.166 1.417.833 2c.75.833 1.75.75 2.167.833C6.75 19 12 19 12 19s4.167 0 7-.25c.417-.083 1.25-.083 2-.833.583-.584.833-2 .833-2s.167-1.584.167-3.25v-1.5C22 9.583 21.833 8 21.833 8zM9.917 14.583V9l5.416 2.833-5.416 2.75z">
                                            </path>
                                        </svg></a></li>
                                </div>
                                <div>
                                    <li id="li-2g"><a href="https://instagram.com/carpool_in"
                                        title="Link to www.instagram.com/carpoolfr/" rel="nofollow"><svg
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            class="kirk-icon sc-ktwOSD koflcE" width="36" height="36" aria-hidden="false">
                                            <title>instagram</title>
                                            <g fill-rule="nonzero">
                                                <path fill="#d3962c"
                                                    d="M12 3.802c2.67 0 2.987.01 4.042.058 1.137.052 2.193.28 3.005 1.092.813.813 1.042 1.869 1.092 3.008.05 1.053.059 1.37.059 4.04s-.009 2.987-.059 4.042c-.05 1.137-.279 2.193-1.091 3.005s-1.869 1.042-3.007 1.092c-1.055.05-1.372.059-4.042.059s-2.987-.009-4.042-.059c-1.137-.05-2.193-.279-3.005-1.091S3.91 17.178 3.86 16.04c-.05-1.055-.058-1.372-.058-4.042s.008-2.987.058-4.042c.05-1.137.28-2.193 1.092-3.005S6.82 3.91 7.958 3.86C9.013 3.81 9.33 3.802 12 3.802zM12 2c-2.717 0-3.057.012-4.123.06-1.625.075-3.052.473-4.199 1.618C2.533 4.825 2.133 6.252 2.06 7.877 2.012 8.943 2 9.285 2 12c0 2.717.012 3.057.06 4.123.075 1.625.472 3.053 1.618 4.199 1.146 1.146 2.574 1.544 4.199 1.618 1.066.048 1.408.06 4.123.06s3.057-.012 4.123-.06c1.625-.075 3.053-.472 4.199-1.618 1.146-1.146 1.544-2.574 1.618-4.199.048-1.066.06-1.408.06-4.123s-.012-3.057-.06-4.123c-.075-1.625-.472-3.053-1.618-4.199-1.147-1.145-2.574-1.545-4.199-1.618C15.057 2.012 14.715 2 12 2z">
                                                </path>
                                                <path fill="#d3962c"
                                                    d="M12 6.865a5.136 5.136 0 1 0 .001 10.271A5.136 5.136 0 0 0 12 6.865zm0 8.468a3.332 3.332 0 1 1 0-6.666 3.332 3.332 0 1 1 0 6.666z">
                                                </path>
                                                <circle fill="#d3962c" fill-rule="nonzero" cx="17.338" cy="6.662" r="1.2">
                                                </circle>
                                            </g>
                                        </svg></a></li>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-f">
                    <footer>&copy; Copyright 2023 carpool</footer>
                </div>
            </div>
        </>
    );
}

export default BookRide;