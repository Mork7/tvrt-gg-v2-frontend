import { Button } from 'flowbite-react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactUs = () => {
  // useRef hook let's use persist values across renders
  const form = useRef();

  /**
   * This function sends an email to the admin with the feedback of the user, using emailjs
   * @param {*} e
   */
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${import.meta.env.VITE_EMAIL_SERVICE_ID}`,
        `${import.meta.env.VITE_EMAIL_TEMPLATE_ID}`,
        form.current,
        {
          publicKey: `${import.meta.env.VITE_EMAIL_PUBLIC_KEY}`,
        }
      )
      .then(
        (result) => {
          toast.success('Feedback sent successfully, thank you!');
          console.log('SUCCESS!', result.text);
        },
        (error) => {
          toast.error('Failed to send email');
          console.log('FAILED...', error.text);
        }
      );
    // reset the form after sending the email
    e.target.reset();
  };

  return (
    <section className="flex justify-center font-semibold">
      <div className="flex flex-col space-y-3 w-[30rem]">
        <h1 className="text-4xl">Contact Us</h1>
        <h2 className="text-2xl mb-3 font-normal">
          If you have any suggestions please feel free to send us a message! We
          greatly appreciate any feedback that can help us improve your
          experience.
        </h2>
        <form onSubmit={sendEmail} className="text-black space-y-3" ref={form}>
          <label htmlFor="email" className="block text-xl text-white">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            required
          />
          <label htmlFor="email" className="block text-xl text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            required
          />
          <label htmlFor="email" className="block text-xl text-white">
            Subject:
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            required
          />
          <label htmlFor="message" className="block text-xl text-white">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            rows={5}
            required
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
