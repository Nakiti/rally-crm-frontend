"use client"
import { useState, useContext } from 'react';
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';

/*
   Component: Modal
   Description: A modal that allows the user to create campaigns of varying types
   Props:
      setShow: controls the state of the modal
      organizationId: id of the organization
*/
interface ModalProps {
   setShow: (show: boolean) => void;
   organizationId: string;
}

const Modal = ({setShow, organizationId}: ModalProps) => {
   const [activeTab, setActiveTab] = useState(0);
   const router = useRouter();
   const [internalName, setInternalName] = useState("");
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const tabContent = [
      // { title: 'Donation Form', content: 'donation' },
      { title: 'Crowdfunding', content: 'crowdfunding' },
      // { title: 'Peer to Peer', content: 'peer-to-peer' },
      // { title: 'Ticketed Event', content: 'ticketed-event' },
   ];

   /*
      Description: Depending on the type of campaign that is created, pages corresponding to that campaign
                  type are created
                  Donation Form and Thank You Page are created for all campaign Types
   */
   /*
      Currently page sections are created but not used. They are created to potentially give the user to
      enable and disable components of the display
   */
      const handleClick = async () => {
      if (internalName === "") {
         setError(true)
         return
      }
      setError(false)
      setIsLoading(true)

      console.log("tabContent[activeTab].content ", tabContent[activeTab].content)

      try {
           // TODO: Implement campaign creation logic
           // This is a placeholder implementation
           console.log("Creating campaign:", {
              organizationId,
              type: tabContent[activeTab].content,
              internalName
           });
           
           // Simulate API call
           await new Promise(resolve => setTimeout(resolve, 2000));
           
           // For now, just redirect to campaigns page
           router.push(`/campaigns`);
      } catch (err) {
         setErrorMessage("Failed to create campaign. Please try again.");
         setError(true)
      } finally {
         setIsLoading(false)
      }
   };

   return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center z-50">
         {error && (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
               <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
               <p className="text-gray-700 mb-4">{errorMessage}</p>
               <button 
                  onClick={() => setError(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
               >
                  Close
               </button>
            </div>
         )}
         
         {/* Loading Overlay */}
         {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mb-4"></div>
               <p className="text-lg font-semibold text-gray-700">Creating Campaign...</p>
               <p className="text-sm text-gray-500 mt-2">Please wait while we set up your campaign</p>
            </div>
         )}
         
         <div className="bg-blue-800 p-6 w-2/3 rounded-t-lg flex flex-row justify-between">
            <h2 className="text-white text-2xl">Create New Campaign</h2>
            <button 
               className={`${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-gray-200'}`} 
               onClick={() => setShow(false)}
               disabled={isLoading}
            >
               <X className="h-8 w-8" />
            </button>
         </div>
         <div className="bg-white w-2/3 rounded-b-lg shadow-lg flex overflow-hidden min-h-96">
            <div className="w-1/4 py-6">
               {tabContent.map((tab, index) => (
                  <button
                     key={index}
                     onClick={() => setActiveTab(index)}
                     className={`block w-full text-left py-4 px-4 mb-2 text-md ${
                        activeTab === index
                           ? 'bg-blue-100 border-l-4 border-blue-800 font-semibold'
                           : 'text-gray-700'
                     }`}
                  >
                     {tab.title}
                  </button>
               ))}
            </div>
            <div className="w-3/4 px-6 py-6 bg-gray-100 flex flex-col">
               <h2 className="text-2xl font-semibold mb-4">{tabContent[activeTab].title}</h2>
               <div className='mt-4 mb-8 text-gray-700'>
                  {tabContent[activeTab].content == "crowdfunding" ? 
                     <p>Create a standard donation form that allows users to donate funds while collecting user information</p> :
                  tabContent[activeTab].content == "crowdfunding" ?
                     <p>Create a compelling story to drive donations to your cause</p> :
                  tabContent[activeTab].content == "peer-to-peer" ?
                     <p>Leverage the efforts of potential donors by giving users the opportunity to fundraise on your behalf</p> :
                  <p>Create an event which users can purchase tickets for and donate funds towards</p>
                  }
               </div>
               <div className="flex flex-col col-span-1 sm:col-span-2 w-3/4 mb-6">
                  <label className="text-gray-600 text-sm font-semibold mb-2">
                     Internal Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input
                     name="internalName"
                     type="text"
                     placeholder="Enter Internal Campaign Name"
                     className={`p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${
                        error ? 'border-red-500' : 'border-gray-300'
                     }`}
                     value={internalName}
                     onChange={(e) => setInternalName(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
               </div>
                               <div className="mt-auto flex justify-center">
                   <button 
                      onClick={handleClick}
                      disabled={isLoading}
                      className={`py-3 px-8 rounded-md text-md text-white text-center w-48 transition-colors duration-200 ${
                         isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-700 hover:bg-blue-800'
                      }`}
                   >
                      {isLoading ? 'Creating...' : 'Create'}
                   </button>
                </div>
            </div>
         </div>
      </div>
   );
};

export default Modal