const Register = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Register</h1>
      <form action="" className="flex flex-col">
        <label htmlFor="">Username</label>
        <input type="text" />
        <label htmlFor="">Email</label>
        <input type="email" />
        <label htmlFor="">Password</label>
        <input type="password" />
        <label htmlFor="">Confirm Password</label>
        <input type="password" />
      </form>
    </section>
  );
};

export default Register;
