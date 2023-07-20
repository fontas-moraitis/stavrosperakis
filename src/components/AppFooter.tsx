const AppFooter = () => {
  let year = new Date().getFullYear();

  return (
    <div className="w-full bg-neutral-200 text-center p-8 flex flex-col justify-center justify-self-end">
      <a href="" className="mb-4 block">Follow us on Instagram</a>
      <p className='text-xs'>
        Copyright <span className="font-numeric">© { year }</span> stavrosperakis™. All rights reserved.
      </p>
    </div>
  )
};

export default AppFooter;
