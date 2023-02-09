import React, { useState } from "react";

import { useSignup } from "../../hooks";

const SignUpForm = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Abcd1234..");
  const [handle, setHandle] = useState("test1");
  const { signup, error, loadingFlag } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, handle);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <div>
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <label>User Name:</label>
          <input
            type="text"
            onChange={(e) => setHandle(e.target.value)}
            value={handle}
          />
        </div>

        <button disabled={loadingFlag}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default SignUpForm;
