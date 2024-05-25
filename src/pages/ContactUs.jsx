import { Button } from 'flowbite-react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
  };

  return (
  <section className="flex justify-center font-semibold">
      <div className="flex flex-col space-y-3 w-[30rem]">
        <h1 className="text-4xl">Contact Us</h1>
        <h2 className="text-2xl mb-3 font-normal">
          If you have any suggestions, or feedback, please feel free to send us
          a message! We greatly appreciate any feedback that can help us improve
          your experience.
        </h2>
        <form onSubmit={handleSubmit} className="text-black space-y-3">
          <label htmlFor="email" className="block text-xl text-white">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
          />
          <label htmlFor="email" className="block text-xl text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
          />
          <label htmlFor="message" className="block text-xl text-white">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            rows={5}
          ></textarea>
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit" className="pb-1" color={'purple'}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg flex justify-center p-4">
        <img
          src="https://assets2.ignimgs.com/2014/02/13/lol0127141280jpg-dc3acc_160w.jpg?width=1280"
          alt=""
          className="rounded-lg w-full"
        />
      </div>
    </section>
  );
};

export default ContactUs;
