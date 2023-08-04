'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CollectionItem } from "src/types";
import msg from '../locales/msg.json';

type ContactFormProps = {
  setShowingForm: Dispatch<SetStateAction<boolean>>;
  items: CollectionItem[];
};

type FormKeys = 'name' | 'message';
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
  message: '',
};

const VALIDATION: Validation = {
  name: [
    {
      isValid: (value: string) => !!value,
      message: msg.validation.required,
    },
    {
      isValid: (value: string) => value.length <= 35,
      message: msg.validation.maxLength,
    },
    {
      isValid: (value: string) => /[a-zåäö ]/i.test(value),
      message: msg.validation.onlyAlpha,
    },
  ],
  message: [
    {
      isValid: (value: string) => !!value,
      message: msg.validation.required,
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

const ContactForm: React.FC<ContactFormProps> = ({ setShowingForm, items }) => {
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

  useEffect(() => {
    const composedMessage = items.map((item: CollectionItem) => ` ${item.prodTitle.toUpperCase()},`);

    setForm({ name: '', message: `${msg.contactForm.prefilledMsg} ${composedMessage.join('')}`});
  }, [items])

  return (
    <form
      className="absolute top-[100px] w-full h-full bg-neutral-100 flex flex-col items-center gap-6 py-6 md:px-[20%]"
      onSubmit={handleSubmit}
    >
      <p className="text-xl font-semibold">
        { msg.contactForm.title }
      </p>
      <label className="w-full px-2">
        <p className="mb-2 font-medium text-sm">
          { msg.contactForm.name }
        </p>
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
        <p className="mb-2 font-medium text-sm">
          { msg.contactForm.message }
        </p>
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
          { msg.buttons.cancel }
        </button>
        <a 
          href={`mailto:stavros.perakis@gmail.com?subject=${form.name} - inquiry&body=${form.message}`}
          className="hover:bg-neutral-100 hover:text-neutral-900 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end bg-neutral-900 text-neutral-50 active:scale-95 px-6"
        >
          { msg.buttons.sendEmail }
        </a>
      </div>
    </form>
  ) 
};

export default ContactForm;