import React, { useState } from "react";

import { useLogin } from "../../hooks";

const LogInForm = () => {
  const [email, setEmail] = useState("test1@test.com");
  const [password, setPassword] = useState("Abcd1234..");
  const [email2, setEmail2] = useState("test2@test.com");
  const [password2, setPassword2] = useState("Abcd1234..");
  const [email3, setEmail3] = useState("test3@test.com");
  const [password3, setPassword3] = useState("Abcd1234..");
  const { login, loadingFlag, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    await login(email2, password2);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    await login(email3, password3);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button disabled={loadingFlag}>Log In</button>
        {error && <div>{error}</div>}
      </form>

      <form onSubmit={handleSubmit2}>
        <h3>Log In</h3>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail2(e.target.value)} value={email2} />

        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} />
        <button disabled={loadingFlag}>Log In</button>
        {error && <div>{error}</div>}
      </form>

      <form onSubmit={handleSubmit3}>
        <h3>Log In</h3>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail3(e.target.value)} value={email3} />

        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword3(e.target.value)} value={password3} />
        <button disabled={loadingFlag}>Log In</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default LogInForm;
