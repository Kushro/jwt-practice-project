import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jwt Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full mt-20 items-center justify-center">
        <div className='px-12 shadow-lg rounded-lg shadow-red-300 p-6'>
          <div className=''>
              <p>Bienvenido, este proyecto te permitira visualizar un secreto publico y un secreto privado.</p>
              <br/>
              <p>Si queres visualizar el secreto privado, vas a <b>necesitar estar logueado</b>, en cambio para <br/>el secreto publico, no hace falta.</p>
              <br/>
              <p>Para acceder a los diferentes secretos podras usar el menu del header.</p>
              <p className='text-right'>
                <i>- Luis</i>
              </p>
          </div>
        </div>
      </main>
    </>
  )
}
