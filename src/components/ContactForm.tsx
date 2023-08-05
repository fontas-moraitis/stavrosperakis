'use client'

import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
// import { CollectionItem } from "src/types";
import msg from '../locales/msg.json';

type ContactFormProps = {
  setShowingForm: Dispatch<SetStateAction<boolean>>;
  queryMsg: string;
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
    // {
    //   isValid: (value: string) => /[a-zåäö ]/i.test(value),
    //   message: msg.validation.onlyAlpha,
    // },
  ],
  message: [
    {
      isValid: (value: string) => !!value,
      message: msg.validation.required,
    },
  ],
};

// const getErrorFields = (form: Form): ErrorFields =>
//   Object.keys(form).reduce((acc, key) => {
//     if (!VALIDATION[key as keyof Validation]) return acc;

//     const errorsPerField = VALIDATION[key as keyof Validation]
//       .map(field => ({
//         isValid: field.isValid(form[key as keyof Form]),
//         message: field.message,
//       }))
//       .filter(field => !field.isValid);

//     return { ...acc, [key]: errorsPerField };
// }, {});

const getErrorField = (inputId: keyof Form, inputValue: any) => {
  return { [inputId]: VALIDATION[inputId].map(field => ({
    isValid: field.isValid(inputValue),
    message: field.message,
  })).filter(field => !field.isValid) }
};

const ContactForm: React.FC<ContactFormProps> = ({ setShowingForm, queryMsg }) => {
  const [form, setForm] = useState<Form>(INITIAL_STATE);
  const [errorFields, setErrorFields] =  useState<ErrorFields>({});
  const nameInputEl = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorFields(() => getErrorField(event.target.id as FormKeys, event.target.value))
  };

  useEffect(() => {
    // const composedMessage = items.map((item: CollectionItem) => ` ${item.prodTitle.toUpperCase()},`);

    setForm({ name: '', message: queryMsg});
  }, [queryMsg]);

  useEffect(() => {
    window.scrollTo(0, 0);
    nameInputEl.current!.focus();
  }, []);

  return (
    <form
      className="absolute top-[100px] w-full h-[100dvh] bg-neutral-100 flex flex-col items-center gap-6 py-6 px-3 md:px-[20%] lg:px-[30%]"
    >
      <p className="text-xl font-medium">
        { msg.contactForm.title }
      </p>
      <label className="w-full">
        <p className="mb-2 font-medium text-sm">
          { msg.contactForm.name }
        </p>
        <input
          id='name'
          type="text"
          ref={nameInputEl}
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
      <label className="w-full">
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
      <div className="w-full flex gap-4 items-center justify-end">
        <button
          type='button'
          className="button-secondary align-self-end"
          aria-label={msg.buttons.cancel}
          onClick={() => setShowingForm(false)}
        >
          { msg.buttons.cancel }
        </button>
        <a 
          href={`mailto:s_perakis@me.com?subject=${form.name} - inquiry&body=${form.message}`}
          className={`button-main align-self-end ${Object.values(errorFields).some(el => el.length) ? 'button-main--disabled' : ''}`}
        >
          { msg.buttons.sendEmail }
        </a>
      </div>
    </form>
  ) 
};

export default ContactForm;