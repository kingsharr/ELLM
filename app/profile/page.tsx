"use client";

import { useState, useEffect } from "react";
import { FaUser, FaHistory, FaAward, FaSave, FaEdit } from "react-icons/fa";
import { auth, db } from "../../services/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
          setLastName(docSnap.data().lastName);
        }
      }
    };
    loadUserData();
  }, [user]);

  const handleAuth = async () => {
    setError("");
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isSignup) {
        // Handle Signup
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        
        // Save additional user data to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          firstName,
          lastName,
          email,
          createdAt: new Date(),
        });
        
        setUser(userCredential.user);
      } else {
        // Handle Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
      }
    } catch (error) {
      setError(error.message);
      console.error("Authentication error:", error.code);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaUser className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {user ? "Your Profile" : isSignup ? "Create Account" : "Login"}
        </h1>
      </div>

      {!user ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
          <div className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700"
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <button
              onClick={handleAuth}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isSignup ? "Create Account" : "Log In"}
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                {isSignup 
                  ? "Already have an account? Log in here"
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Welcome, {firstName}!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Email: {email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      )}
    </section>
  );
}