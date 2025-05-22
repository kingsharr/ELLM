"use client";

import { useState, useEffect } from "react";
import { FaUser, FaCoins } from "react-icons/fa";
import { auth, db } from "../../services/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { doc, getDoc, setDoc, DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          await fetchUserData(currentUser.uid, currentUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
        setEmail("");
        setFirstName("");
        setLastName("");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId: string, user: User | null) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setEmail(data.email || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
      } else {
        // Create default user data if document doesn't exist
        const names = user?.displayName?.split(" ") || ["", ""];
        const userData = {
          firstName: names[0] || "",
          lastName: names[1] || "",
          email: user?.email || "",
          points: 0,
          createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", userId), userData);
        setUserData(userData);
        setEmail(userData.email);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      }
    } catch (error) {
      console.error("Error fetching/creating user data:", error);
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }

    if (isSignup) {
      if (!firstName || !lastName) {
        setError("Please provide your first and last name");
        return false;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  const handleAuth = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);  // <-- Important fix here
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
          firstName,
          lastName,
          email,
          points: 0,
          createdAt: new Date().toISOString(),
        };

        try {
          await setDoc(doc(db, "users", userCredential.user.uid), userData);
        } catch (firestoreError) {
          setError(`Error saving user data: ${(firestoreError as Error).message}`);
          setLoading(false);
          return;
        }

        setSuccessMessage("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      if (error instanceof Error) {
        switch ((error as any).code) {
          case "auth/email-already-in-use":
            setError("This email is already registered. Please log in instead.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          case "auth/weak-password":
            setError("Password is too weak. Use at least 6 characters.");
            break;
          case "auth/user-not-found":
            setError("No account found with this email. Please sign up first.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          default:
            setError("Authentication failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      setError("Failed to log out. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{successMessage}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
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

            <button
              onClick={handleAuth}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignup ? "Create Account" : "Log In"}
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setSuccessMessage("");
                }}
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
          <div className="flex items-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
              <FaUser className="text-3xl text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">Welcome, {firstName}!</h2>
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
            <h3 className="text-lg font-semibold mb-3">Your Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">First Name:</span>
                <span className="font-medium">{userData?.firstName || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Name:</span>
                <span className="font-medium">{userData?.lastName || "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Points:</span>
                <span className="flex items-center">
                  <FaCoins className="text-yellow-500 mr-1" />
                  <span className="font-medium">{userData?.points || 0}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                <span className="font-medium">
                  {userData?.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </section>
  );
}