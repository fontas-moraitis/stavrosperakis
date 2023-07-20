'use client'

import { Dispatch, SetStateAction } from "react";

type ContactFormProps = {
  setShowingForm: Dispatch<SetStateAction<boolean>>
};

const ContactForm: React.FC<ContactFormProps> = ({ setShowingForm }) => {

  return (
    <form className="absolute top-[100px] w-full h-full bg-neutral-50 flex flex-col items-center gap-6 py-6 md:px-[20%]">
      <p className="text-xl font-semibold">Contact Info</p>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Name:</p>
        <input type="text" className="w-full bg-transparent" />
      </label>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Email:</p>
        <input type="email" className="w-full bg-transparent" />
      </label>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Comments:</p>
        <textarea 
          cols={30}
          rows={10}
          className="w-full bg-transparent"
        />
      </label>
      <div className="w-full flex gap-4 items-center justify-end px-6">
        <button
          className="hover:bg-neutral-900 hover:text-neutral-50 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end active:scale-95"
          onClick={() => setShowingForm(false)}
        >
          Cancel
        </button>
        <button 
          className="hover:bg-neutral-100 hover:text-neutral-900 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end bg-neutral-900 text-neutral-50 active:scale-95 px-6"
        >
          Sent
        </button>
      </div>
    </form>
  ) 
};

export default ContactForm;