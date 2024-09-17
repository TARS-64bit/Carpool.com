import logo from "../components/images/logo3.png";
import playStore from "../components/images/playsotre.png";
import taxi_img from "../components/images/3644592-.png";
import taxi_img2 from "../components/images/taxi3.png";
import "./Landing.css";
import SearchRide from "../components/SearchRide";
function Landing(){


    

    return(
    <div>
        

    <section className="sec-1">
        <div className="container" id="fl-cont-4">
            <div className="col6-c">
                <h1 className="heading">Earn, Connect,<br/>Contribute to<br/>Society</h1>
                <p className="subTitle">Partner with us to drive your own livelihood and more.</p>
                <br/>
                <button className="btn-r">Sign up Now</button>
            </div>
            <div className="col6-d">
                <img src={taxi_img} className="taxi-img"/>
            </div>
            <div className="clearfix"></div>
        </div>
    </section>


    <section className="sec-2">
        <div className="container" id="fl-cont-3">

            <h2 className="heading-2">How It Work</h2>
            <div className="steps">
                <div className="col3">
                    <div className="box">
                        <i className="fa fa-hand-o-up icon-1"></i>
                        <h3>Book in just 2 Tabs</h3>
                        <p>Save time, share ride - Book carpool in 2 tabs. </p>
                    </div>
                </div>
                <div className="col3">
                    <div className="box">
                        <i className="fa fa-automobile icon-1"></i>
                        <h3>Get a Driver</h3>
                        <p>Secure your ride, book with us, get a driver now! </p>
                    </div>
                </div>
                <div className="col3">
                    <div className="box">
                        <i className="fa fa-map-o icon-1"></i>
                        <h3>Track Your Driver</h3>
                        <p>Stay informed, track your ride, reach your destination hassle-free!</p>
                    </div>
                </div>
                <div className="col3">
                    <div className="box">
                        <i className="fa fa-user icon-1"></i>
                        <h3>Arrive Safely</h3>
                        <p>Safe arrival starts with sharing the ride. Book carpool now!</p>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>

        </div>
    </section>

        <SearchRide/>
    <section className="sec-3">
        <br/><br/>
        <div className="container" id="fl-cont-2">
            <div className="cnt-2">
                <h2 className="heading-3">About us</h2>
                <div className="col6-e">
                    <p className="p3">Carpool is a blockchain-based ride-sharing platform that offers a sustainable and
                        secure solution for daily commuters. Our platform is designed to be transparent, accountable,
                        and user-friendly. With a rigorous screening process for all carpool partners, we prioritize
                        safety and ensure a secure ride for all passengers. Our app includes features such as real-time
                        GPS tracking, in-app messaging, and easy payment options for added convenience. Join us in
                        reducing your carbon footprint and enjoying a reliable and stress-free ride. Together, let's
                        create a more sustainable future.

                    </p>
                    <br/><br/>
                    <button className="btn-r">Read More</button>
                </div>
            </div>
            <div className="col6-f">
            <img src={taxi_img2} className="taxi-img2"/>
            </div>
            <div className="clearfix"></div>
        </div>
    </section>

    <section className="map">
        <iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=en&amp;q=Dr.%20D.%20Y.%20Patil%20Institute%20of%20Engineering%20management%20and%20research%20AKurdi,%20pune+(Carpool)&amp;t=p&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a
                href="https://www.maps.ie/distance-area-calculator.html">measure acres/hectares on map</a></iframe>
    </section>


    <section className="sec-4">
        <div className="container" id="fl-cont">
            <div className="cnt-1">
                <div className="content">
                    <h2 className="heading-3">Download the Carpool mobile application</h2>
                    <br/>
                    <p className="p3">Join the carpooling revolution today and save money while helping the environment!
                        Download the Carpool mobile app now and easily find ridesharing partners near you. Available on
                        the Google Play Store, our app makes it simple to reduce your carbon footprint and cut down on
                        commuting costs. Try it today!
                    </p>
                    <br/>
                </div>
            </div>
            <img src={playStore} id="img-playstore"/>
            <div className="clearfix"></div>

        </div>
    </section>

    <footer className="footer-distributed">

        <div className="footer-right">

            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-github"></i></a>

        </div>

        <div className="footer-left">
            <p className="footer-links">
                <a className="link-1" href="#">Home</a>
                <a href="#">Blog</a>
                <a href="#">Pricing</a>
                <a href="#">About</a>
                <a href="#">Faq</a>
                <a href="#">Contact</a>
            </p>
            <p>Carpool © 2023</p>
        </div>

    </footer>

    



    
    </div>
    );
}

export default Landing;