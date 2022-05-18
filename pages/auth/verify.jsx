const VerifyPage = () => {
  return (
    <section className='h-screen w-screen bg-zinc-800 p-4 text-white'>
      <div className='flex h-full items-center justify-center'>
        <div className='text-start min-w-[40%] rounded-xl border border-blue-500 py-6 px-8 pb-7'>
          <h2 className='mb-1 text-3xl font-bold'>Check Your Email</h2>
          <p className='text-lg text-zinc-500'>
            A sign-in link has been sent to your email address.
          </p>
        </div>
      </div>
    </section>
  )
}

VerifyPage.authpage = true

export default VerifyPage
