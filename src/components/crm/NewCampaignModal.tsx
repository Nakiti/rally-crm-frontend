"use client"
import { useState, useContext } from 'react';
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCreateCampaign } from '@/hooks/crm/useCampaign';
import { useGetDesignations } from '@/hooks/crm/useDesignation';

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
   const [validationError, setValidationError] = useState("");
   const {mutate, isPending: isLoading, isError, error } = useCreateCampaign();
   const { data: designations } = useGetDesignations();

   const tabContent = [
      // { title: 'Donation Form', content: 'donation' },
      { title: 'Crowdfunding', content: 'crowdfunding' },
      // { title: 'Peer to Peer', content: 'peer-to-peer' },
      // { title: 'Ticketed Event', content: 'ticketed-event' },
   ];

   const handleClick = async () => {
      // Clear previous validation errors
      setValidationError("");
      
      // Validate required fields
      if (!internalName.trim()) {
         setValidationError("Internal Campaign Name is required");
         return;
      }

      console.log(designations)

      // Check if we have designations available
      if (!designations || designations.length === 0) {
         setValidationError("No designations available. Please create a designation first.");
         return;
      }

      // Get the first available designation as default
      const defaultDesignation = designations[0];
      
      // Prepare campaign data based on the selected tab
      const campaignData = {
         defaultDesignationId: defaultDesignation.id,
         internalName: internalName.trim(),
         externalName: internalName.trim(), // Use internal name as external name for now
         title: internalName.trim(), // Use internal name as title for now
         goalAmount: 10000, // Default goal amount, can be made configurable later
         isActive: false // Start as inactive, user can activate later
      };

      // Create the campaign
      mutate(campaignData, {
         onSuccess: (newCampaign) => {
            setShow(false);
            router.push(`/campaigns/${newCampaign.id}`);
         },
         onError: (error) => {
            console.error('Failed to create campaign:', error);
         }
      });
   };

   return (
      <div className="fixed inset-0 bg-opacity-10 flex flex-col items-center justify-center z-50">
         {(error || validationError) && (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
               <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
               <p className="text-gray-700 mb-4">{validationError || error?.message || 'An error occurred'}</p>
               <button 
                  onClick={() => {
                     setValidationError("");
                     // Note: We can't directly clear the mutation error, it will clear on next attempt
                  }}
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
                        validationError ? 'border-red-500' : 'border-gray-300'
                     }`}
                     value={internalName}
                     onChange={(e) => {
                        setInternalName(e.target.value);
                        // Clear validation error when user starts typing
                        if (validationError) {
                           setValidationError("");
                        }
                     }}
                  />
                  {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
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