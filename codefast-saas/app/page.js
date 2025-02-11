import ButtonLogin from "@/components/ButtonLogin";
import ListItem from "@/components/ListItem";
import FAQListItem from "@/components/FAQListItem";
import Link from 'next/link';

import Image from "next/image";

import world from "./world.jpg";

function Home() {
  const isLoggedIn = true;
  const name = "Victor";

  const age = 36;
  let canVote;

  canVote = age >= 18 ? "Yes" : "No";

  const greeting1 = "Hello" + name;
  console.log(greeting1);

  const greeting2 = `Hello ${name}`;
  console.log(greeting2);

  return (
    <main>
      {/*HEADER*/}
      <section className="bg-base-200">
        <div className="max-w-3xl mx-auto bg-base-200 flex justify-between items-center px-8 py-2">
          <div className="font-bold">CodeFast</div>
          <div className="space-x-4 hidden md:block">
            <Link href="#pricing" className="link link-hover">Pricing</Link>
            <Link href="#faq" className="link link-hover">FAQ</Link>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </div>
      </section>
      {/* HERO*/}
      <section className="text-center lg:text-left py-32 p-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        
         <Image src={world} alt="world" className="w-96 rounded-xl " />
         <div>
                
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Collect customer feedback and improve your products
        </h1>
        <div className="opacity-90 mb-10">
          Create a feedback form and start collecting feedback from your
          customers in minutes.
        </div>

        <ButtonLogin isLoggedIn={isLoggedIn} name={name} />

         </div>
      </section>

      {/*PRICING */}
      <section className="bg-base-200 " id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>

          <div className="p-8 bg-base-100 w-96 rounded-3xl mx-auto">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$19</div>
              <div className="uppercase text-sm font-medium opacity-60">
                /Month
              </div>
            </div>

            <ul className="space-y-2">
              <ListItem text="Collect customer feedback" />
              <ListItem text="Unlimited boards" />
              <ListItem text="Admin dashboard" />
              <ListItem text="24/7" />
            </ul>

            <ButtonLogin
              isLoggedIn={isLoggedIn}
              name={name}
              extraStyle="w-full"
            />
          </div>
        </div>
      </section>

      {/*FAQ */}
      <section className="bg-base-200" id="faq">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <ul>
            {[
              {
                question: "What do I get exactly?",
                answer: "Loreum Ipseum",
              },
              {
                question: "Can get a refund?",
                answer: "Loreum Ipseum",
              },
              {
                question: "I have another question?",
                answer: "Loreum Ipseum",
              },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
export default Home;
