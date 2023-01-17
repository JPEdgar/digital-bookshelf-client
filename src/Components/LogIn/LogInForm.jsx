import React, { useState } from "react";

import { useLogin } from "../../hooks";

const LogInForm = () => {
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("Abcd1234..");
    const { login, loadingFlag, error } = useLogin();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
    };

  return (
    <form onSubmit={handleSubmit}>
    <h3>Log In</h3>
    <label>Email:</label>
    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

    <label>Password:</label>
    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
    <button disabled={loadingFlag}>Log In</button>
    {error && <div>{error}</div>}
  </form>
  )
}

export default LogInForm