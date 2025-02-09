import ButtonLogin from "@/components/ButtonLogin";

function Home() {
  const isLoggedIn = true;
  const name = "Victor";

  return (
    <main>
      <section className="bg-base-200">
        <div className="max-w-3xl mx-auto bg-base-200 flex justify-between items-center px-8 py-2">
          <div className="font-bold">CodeFast</div>
          <div className="space-x-4 hidden md:block">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </div>
      </section>

      <section className="p-8 text-center py-32 max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Collect customer feedback and improve your products
        </h1>
        <div className="opacity-90 mb-10">
          Create a feedback form and start collecting feedback from your
          customers in minutes.
        </div>

        <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
      </section>
    </main>
  );
}
export default Home;
