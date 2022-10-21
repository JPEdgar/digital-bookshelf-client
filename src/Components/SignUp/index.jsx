import React, { useState } from "react";

import { useSignup } from "../../hooks";

const SignUp = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Abcd1234..");
  const {signup, error, loadingFlag} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
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
        <button disabled={loadingFlag}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default SignUp;
