import React, { useState } from "react";

import { useSignup } from "../../hooks";

const SignUpForm = () => {
  const [email, setEmail] = useState("test1@test.com");
  const [password, setPassword] = useState("Abcd1234..");
  const [handle, setHandle] = useState("test1");

  const [email2, setEmail2] = useState("test2@test.com");
  const [password2, setPassword2] = useState("Abcd1234..");
  const [handle2, setHandle2] = useState("test2");

  const [email3, setEmail3] = useState("test3@test.com");
  const [password3, setPassword3] = useState("Abcd1234..");
  const [handle3, setHandle3] = useState("test3");

  const { signup, error, loadingFlag } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, handle);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    await signup(email2, password2, handle2);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    await signup(email3, password3, handle3);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <div>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <div>
          <label>User Name:</label>
          <input type="text" onChange={(e) => setHandle(e.target.value)} value={handle} />
        </div>

        <button disabled={loadingFlag}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>

      <form onSubmit={handleSubmit2}>
        <h3>Sign up</h3>
        <div>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail2(e.target.value)} value={email2} />

          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} />
        </div>

        <div>
          <label>User Name:</label>
          <input type="text" onChange={(e) => setHandle2(e.target.value)} value={handle2} />
        </div>

        <button disabled={loadingFlag}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>

      <form onSubmit={handleSubmit3}>
        <h3>Sign up</h3>
        <div>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail3(e.target.value)} value={email3} />

          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword3(e.target.value)} value={password3} />
        </div>

        <div>
          <label>User Name:</label>
          <input type="text" onChange={(e) => setHandle3(e.target.value)} value={handle3} />
        </div>

        <button disabled={loadingFlag}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default SignUpForm;
