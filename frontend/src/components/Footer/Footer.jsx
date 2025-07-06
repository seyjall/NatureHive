import { Link } from "react-router-dom"
import Logo from "../Logo"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer () {
    
    return ( <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 ">
        <div className="-m-6 flex flex-wrap justify-between">
          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-6 text-xs font-semibold uppercase text-gray-600">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-6 text-xs font-semibold uppercase text-gray-600">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-6 text-xs font-semibold uppercase text-gray-600">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-primary transition duration-200"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div className="justify-center text-2xl py-0 pt-3 items-center">
        <h1  className="text-green-900">NatureHive</h1>
        </div>
         
      </div>
      
    

   ); } 
    
    
    
      
        
    


export default Footer 