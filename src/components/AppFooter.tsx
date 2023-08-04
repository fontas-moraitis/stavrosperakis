import msg from '../locales/msg.json';

const AppFooter = () => {
  let year = new Date().getFullYear();

  return (
    <div className="w-full bg-neutral-200 text-center p-8 flex flex-col justify-center justify-self-end">
      <a href="https://www.instagram.com/stavrosperakis/" rel="noreferrer noopener" target="_blanc" className="mb-4 flex flex-col items-center hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="44" 
          height="44" 
          viewBox="0 0 24 24" 
          style={{ fill: '#fafafa' }}>
            <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z">
            </path>
            <circle cx="11.994" cy="11.979" r="3.003">
            </circle>
        </svg>
      <span className="text-sm font-medium">
        { msg.appFooter.insta }
      </span>
      </a>
      <p className='text-xs text-neutral-600'>
        { msg.appFooter.copyright } 
        <span className="font-numeric mx-1">© { year }</span>
        { msg.appFooter.rights } 
      </p>
    </div>
  )
};

export default AppFooter;
