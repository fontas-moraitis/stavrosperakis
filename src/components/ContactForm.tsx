'use client'

import { Dispatch, SetStateAction, useState } from "react";

type ContactFormProps = {
  setShowingForm: Dispatch<SetStateAction<boolean>>
};

type FormKeys = 'name' | 'email' | 'message';
type ValidationField = { isValid: (value: string) => boolean, message: string };

type Form = {
  [key in FormKeys]: string;
};

type Validation =  {
  [key in FormKeys]: ValidationField[]
};

type ErrorFields = {
  [key in FormKeys]: { isValid: boolean; message: string; }[]
} | Record<any, any>;

const INITIAL_STATE: Form = {
  name: '',
  email: '',
  message: '',
};

const VALIDATION: Validation = {
  name: [
    {
      isValid: (value: string) => !!value,
      message: 'Is required.',
    },
    {
      isValid: (value: string) => value.length <= 20,
      message: 'Max 20 characters',
    },
    {
      isValid: (value: string) => !/[a-zåäö ]/i.test(value),
      message: 'Only alphabet chars',
    },
  ],
  email: [
    {
      isValid: (value: string) => !!value,
      message: 'Is required.',
    },
    {
      isValid: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: 'Needs to be an email.',
    },
  ],
  message: [
    {
      isValid: (value: string) => !!value,
      message: 'Is required.',
    },
  ],
};

const getErrorFields = (form: Form): ErrorFields =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key as keyof Validation]) return acc;

    const errorsPerField = VALIDATION[key as keyof Validation]
      .map(field => ({
        isValid: field.isValid(form[key as keyof Form]),
        message: field.message,
      }))
      .filter(field => !field.isValid);

    return { ...acc, [key]: errorsPerField };
}, {});

const getErrorField = (inputId: keyof Form, inputValue: any) => {
  return { [inputId]: VALIDATION[inputId].map(field => ({
    isValid: field.isValid(inputValue),
    message: field.message,
  })).filter(field => !field.isValid) }
};

const ContactForm: React.FC<ContactFormProps> = ({ setShowingForm }) => {
  const [form, setForm] = useState<Form>(INITIAL_STATE);
  const [errorFields, setErrorFields] =  useState<ErrorFields>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorFields(() => getErrorField(event.target.id as FormKeys, event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    setErrorFields(() => getErrorFields(form))

    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;
  };

  return (
    <form
      className="absolute top-[100px] w-full h-full bg-neutral-100 flex flex-col items-center gap-6 py-6 md:px-[20%]"
      onSubmit={handleSubmit}
    >
      <p className="text-xl font-semibold">Contact Info</p>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Name*:</p>
        <input
          id='name'
          type="text"
          className="w-full bg-transparent"
          value={form.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorFields?.name?.length ? (
          <span className='text-red-700 text-xs'>
            {errorFields.name[0].message}
          </span>
        ) : null}
      </label>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Email*:</p>
        <input 
          id='email'
          type="email" 
          className="w-full bg-transparent"
          value={form.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorFields?.email?.length ? (
          <span className='text-red-700 text-xs'>
            {errorFields.email[0].message}
          </span>
        ) : null}
      </label>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">Message*:</p>
        <textarea
          id='message'
          cols={30}
          rows={10}
          className="w-full bg-transparent"
          value={form.message}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorFields?.message?.length ? (
          <span className='text-red-700 text-xs'>
            {errorFields.message[0].message}
          </span>
        ) : null}
      </label>
      <div className="w-full flex gap-4 items-center justify-end px-6">
        <button
          type='button'
          className="hover:bg-neutral-900 hover:text-neutral-50 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end active:scale-95"
          onClick={() => setShowingForm(false)}
        >
          Cancel
        </button>
        <button
          type='submit'
          className="hover:bg-neutral-100 hover:text-neutral-900 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end bg-neutral-900 text-neutral-50 active:scale-95 px-6"
        >
          Sent
        </button>
      </div>
    </form>
  ) 
};

export default ContactForm;