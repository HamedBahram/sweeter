const VerifyPage = () => {
  return (
    <section className='h-screen w-screen bg-zinc-800 p-4 text-white'>
      <div className='flex h-full items-center justify-center'>
        <div className='rounded-md border border-zinc-400 px-8 py-6 text-center'>
          <h1 className='mb-4 text-3xl font-bold'>Check Your Email</h1>
          <h2 className='mb-6 text-lg text-zinc-400'>
            A sign-in link has been sent to your email address
          </h2>
          <p className='text-3xl font-bold text-blue-400'>Sweeter</p>
        </div>
      </div>
    </section>
  )
}

VerifyPage.authpage = true

export default VerifyPage
