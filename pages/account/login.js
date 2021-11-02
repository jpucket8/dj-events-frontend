import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import AuthContext from "@context/auth-context";
import Layout from "@components/layout";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "@styles/auth-form.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);

  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
    emailInputRef.current.focus();
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" autoFocus>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              ref={emailInputRef}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don&apos;t have an account?{" "}
          <Link href="/account/register"> Register &rarr;</Link>
        </p>
      </div>
    </Layout>
  );
}
