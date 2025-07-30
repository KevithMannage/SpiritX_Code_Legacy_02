// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const navigate = useNavigate();

// //   const validate = () => {
// //     let tempErrors = {};
// //     if (!username) tempErrors.username = "Username is required";
// //     if (!password) tempErrors.password = "Password is required";
// //     setErrors(tempErrors);
// //     return Object.keys(tempErrors).length === 0;
// //   };

// //   const handlefogetpassword = () => {
// //     navigate("/forgetpassword");
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;
  
// //     try {
// //       const response = await fetch('http://localhost:5000/user/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });
  
// //       const data = await response.json();
// //       console.log(data.user.User_ID);
// //       console.log(data.user);
// //       const isadmin=data.user.Is_Admin;
// //       console.log(isadmin);
// //      // localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
  
// //       if (response.ok &&isadmin===0) {
// //         // Assuming the server sends a token or success status
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInUser", username);
// //         localStorage.setItem("userId", data.user.User_ID);
          
// //         navigate("/dashboard");
// //       } 
// //       if (response.ok && isadmin===1) {
// //         // Assuming the server sends a token or success status
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInadmin", username);
// //         localStorage.setItem("userId", data.user.User_ID);
          
// //         navigate("/admin");
// //       }
// //       else {
// //         // Handle login failure (e.g., wrong username/password)
// //         setErrors({ general: data.message || "Invalid username or password" });
// //       }
// //     } catch (error) {
// //       setErrors({ general: "Invalid username or password" });
// //       console.error("Login error:", error);
// //     }
// //   };

// //   const handleSignupNavigate = () => {
// //     navigate("/signup");
// //   };

// //   return (
// //     <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
// //       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
// //         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
// //           <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
// //             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
// //               Sign in to your account
// //             </h1>
// //             {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
// //             <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
// //               <div>
// //                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
// //                 <input
// //                   type="text"
// //                   name="username"
// //                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                   placeholder="Enter username"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                 />
// //                 {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
// //               </div>
// //               <div>
// //                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                   placeholder="Enter password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <a onClick={handlefogetpassword} className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer">Forgot password?</a>
// //               </div>
// //               <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
// //                 Sign in
// //               </button>
// //               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
// //                 Don’t have an account yet? <a onClick={handleSignupNavigate} className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Sign up</a>
// //               </p>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Login;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { EyeIcon, EyeSlashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigate = useNavigate();

// //   const validate = () => {
// //     let tempErrors = {};
// //     if (!username) tempErrors.username = "Username or email is required";
// //     if (!password) tempErrors.password = "Password is required";
// //     setErrors(tempErrors);
// //     return Object.keys(tempErrors).length === 0;
// //   };

// //   const handleForgetPassword = () => {
// //     navigate("/forgetpassword");
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     try {
// //       const response = await fetch('http://localhost:5000/user/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       const data = await response.json();
// //       const isAdmin = data.user.Is_Admin;

// //       if (response.ok && isAdmin === 0) {
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInUser", username);
// //         localStorage.setItem("userId", data.user.User_ID);
// //         navigate("/dashboard");
// //       } 
// //       if (response.ok && isAdmin === 1) {
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInadmin", username);
// //         localStorage.setItem("userId", data.user.User_ID);
// //         navigate("/admin");
// //       } else {
// //         setErrors({ general: data.message || "Invalid credentials" });
// //       }
// //     } catch (error) {
// //       setErrors({ general: "Login failed. Please try again." });
// //       console.error("Login error:", error);
// //     }
// //   };

// //   const handleSignupNavigate = () => {
// //     navigate("/signup");
// //   };

// //   return (
// //     <section 
// //       className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
// //       style={{
// //         backgroundImage: "url('https://images.unsplash.com/photo-1587281282277-2f3db1e4230e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
// //       }}
// //     >
// //       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-md">
// //         <div className="w-full bg-white/95 rounded-2xl shadow-2xl backdrop-blur-md dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
// //           <div className="p-8 space-y-6 sm:p-10 md:space-y-8">
// //             <div className="flex justify-center">
// //               <img 
// //                 src="https://img.icons8.com/?size=100&id=80686&format=png&color=000000" 
// //                 alt="Cricket Logo" 
// //                 className="h-16 w-16 mb-4"
// //               />
// //             </div>
// //             <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl text-center">
// //               Welcome to CricketHub
// //             </h1>
// //             {errors.general && (
// //               <p className="text-red-500 text-sm text-center bg-red-100/50 p-3 rounded-lg font-medium">
// //                 {errors.general}
// //               </p>
// //             )}
// //             <div className="space-y-6 md:space-y-8">
// //               <div className="relative">
// //                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
// //                   Username or Email
// //                 </label>
// //                 <div className="relative">
// //                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     name="username"
// //                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
// //                     placeholder="Enter username or email"
// //                     value={username}
// //                     onChange={(e) => setUsername(e.target.value)}
// //                   />
// //                 </div>
// //                 {errors.username && (
// //                   <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>
// //                 )}
// //               </div>
// //               <div className="relative">
// //                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
// //                   Password
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// //                   >
// //                     {showPassword ? (
// //                       <EyeSlashIcon className="h-5 w-5" />
// //                     ) : (
// //                       <EyeIcon className="h-5 w-5" />
// //                     )}
// //                   </button>
// //                 </div>
// //                 {errors.password && (
// //                   <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
// //                 )}
// //               </div>
// //               <div className="flex items-center justify-end">
// //                 <button
// //                   onClick={handleForgetPassword}
// //                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
// //                 >
// //                   Forgot password?
// //                 </button>
// //               </div>
// //               <button
// //                 type="button"
// //                 onClick={handleLogin}
// //                 className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
// //               >
// //                 Sign In
// //               </button>
// //               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
// //                 Don’t have an account?{" "}
// //                 <button
// //                   onClick={handleSignupNavigate}
// //                   className="font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
// //                 >
// //                   Sign up
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Login;



// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { EyeIcon, EyeSlashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigate = useNavigate();

// //   const validate = () => {
// //     let tempErrors = {};
// //     if (!username) tempErrors.username = "Username or email is required";
// //     if (!password) tempErrors.password = "Password is required";
// //     setErrors(tempErrors);
// //     return Object.keys(tempErrors).length === 0;
// //   };

// //   const handleForgetPassword = () => {
// //     navigate("/forgetpassword");
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     try {
// //       const response = await fetch('http://localhost:5000/user/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       const data = await response.json();
// //       const isAdmin = data.user.Is_Admin;

// //       if (response.ok && isAdmin === 0) {
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInUser", username);
// //         localStorage.setItem("userId", data.user.User_ID);
// //         navigate("/dashboard");
// //       } 
// //       if (response.ok && isAdmin === 1) {
// //         localStorage.setItem("isLoggedIn", "true");
// //         localStorage.setItem("loggedInadmin", username);
// //         localStorage.setItem("userId", data.user.User_ID);
// //         navigate("/admin");
// //       } else {
// //         setErrors({ general: data.message || "Invalid credentials" });
// //       }
// //     } catch (error) {
// //       setErrors({ general: "Login failed. Please try again." });
// //       console.error("Login error:", error);
// //     }
// //   };

// //   const handleSignupNavigate = () => {
// //     navigate("/signup");
// //   };

// //   return (
// //     <section 
// //       className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
// //       style={{
// //         backgroundImage: "url('https://images.unsplash.com/photo-1587281282277-2f3db1e4230e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
// //       }}
// //     >
// //       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-md">
// //         <div className="w-full bg-white/95 rounded-2xl shadow-2xl backdrop-blur-md dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 overflow-hidden">
// //           <div className="relative">
// //             <img
// //               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl_rWOW5qk0SL2geZYe_VoSWTsHXP-1XnSL0IR4G-1A6WeAsX-XEqypA&s"
// //               alt="Cricket Banner"
// //               className="w-full h-52 object-cover"
// //             />
// //             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
// //               {/* <img 
// //                 src="https://img.icons8.com/?size=100&id=80686&format=png&color=000000" 
// //                 alt="Cricket Logo" 
// //                 className="h-16 w-16 bg-white/80 rounded-full p-2 shadow-md"
// //               /> */}
// //             </div>
// //           </div>
// //           <div className="p-8 pt-12 space-y-6 sm:p-10 md:space-y-8">
// //             <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl text-center">
// //               Welcome to CricketHub
// //             </h1>
// //             {errors.general && (
// //               <p className="text-red-500 text-sm text-center bg-red-100/50 p-3 rounded-lg font-medium">
// //                 {errors.general}
// //               </p>
// //             )}
// //             <div className="space-y-6 md:space-y-8">
// //               <div className="relative">
// //                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
// //                   Username or Email
// //                 </label>
// //                 <div className="relative">
// //                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     name="username"
// //                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
// //                     placeholder="Enter username or email"
// //                     value={username}
// //                     onChange={(e) => setUsername(e.target.value)}
// //                   />
// //                 </div>
// //                 {errors.username && (
// //                   <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>
// //                 )}
// //               </div>
// //               <div className="relative">
// //                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
// //                   Password
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// //                   >
// //                     {showPassword ? (
// //                       <EyeSlashIcon className="h-5 w-5" />
// //                     ) : (
// //                       <EyeIcon className="h-5 w-5" />
// //                     )}
// //                   </button>
// //                 </div>
// //                 {errors.password && (
// //                   <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
// //                 )}
// //               </div>
// //               <div className="flex items-center justify-end">
// //                 <button
// //                   onClick={handleForgetPassword}
// //                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
// //                 >
// //                   Forgot password?
// //                 </button>
// //               </div>
// //               <button
// //                 type="button"
// //                 onClick={handleLogin}
// //                 className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
// //               >
// //                 Sign In
// //               </button>
// //               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
// //                 Don’t have an account?{" "}
// //                 <button
// //                   onClick={handleSignupNavigate}
// //                   className="font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
// //                 >
// //                   Sign up
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const validate = () => {
//     let tempErrors = {};
//     if (!username) tempErrors.username = "Username or email is required";
//     if (!password) tempErrors.password = "Password is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleForgetPassword = () => {
//     navigate("/forgetpassword");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch('http://localhost:5000/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       const isAdmin = data.user.Is_Admin;

//       if (response.ok && isAdmin === 0) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("loggedInUser", username);
//         localStorage.setItem("userId", data.user.User_ID);
//         navigate("/dashboard");
//       } 
//       if (response.ok && isAdmin === 1) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("loggedInadmin", username);
//         localStorage.setItem("userId", data.user.User_ID);
//         navigate("/admin");
//       } else {
//         setErrors({ general: data.message || "Invalid credentials" });
//       }
//     } catch (error) {
//       setErrors({ general: "Login failed. Please try again." });
//       console.error("Login error:", error);
//     }
//   };

//   const handleSignupNavigate = () => {
//     navigate("/signup");
//   };

//   return (
//     <section 
//       className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1587281282277-2f3db1e4230e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
//       }}
//     >
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-md">
//         <div className="w-full bg-white/95 rounded-2xl shadow-2xl backdrop-blur-md dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="relative">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl_rWOW5qk0SL2geZYe_VoSWTsHXP-1XnSL0IR4G-1A6WeAsX-XEqypA&s"
//               alt="Cricket Banner"
//               className="w-full h-52 object-cover"
//             />
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
//               {/* <img 
//                 src="https://img.icons8.com/?size=100&id=80686&format=png&color=000000" 
//                 alt="Cricket Logo" 
//                 className="h-16 w-16 bg-white/80 rounded-full p-2 shadow-md"
//               /> */}
//             </div>
//           </div>
//           <div className="p-8 pt-12 space-y-6 sm:p-10 md:space-y-8">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl text-center">
//               Welcome to CricketHub
//             </h1>
//             {errors.general && (
//               <p className="text-red-500 text-sm text-center bg-red-100/50 p-3 rounded-lg font-medium">
//                 {errors.general}
//               </p>
//             )}
//             <div className="space-y-6 md:space-y-8">
//               <div className="relative">
//                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
//                   Username or Email
//                 </label>
//                 <div className="relative">
//                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     name="username"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
//                     placeholder="Enter username or email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 {errors.username && (
//                   <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>
//                 )}
//               </div>
//               <div className="relative">
//                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="h-5 w-5" />
//                     ) : (
//                       <EyeIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
//                 )}
//               </div>
//               <div className="flex items-center justify-end">
//                 <button
//                   onClick={handleForgetPassword}
//                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleLogin}
//                 className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
//               >
//                 Sign In
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
//                 Don’t have an account?{" "}
//                 <button
//                   onClick={handleSignupNavigate}
//                   className="font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const validate = () => {
//     let tempErrors = {};
//     if (!username) tempErrors.username = "Username or email is required";
//     if (!password) tempErrors.password = "Password is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleForgetPassword = () => {
//     navigate("/forgetpassword");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch('http://localhost:5000/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       const isAdmin = data.user.Is_Admin;

//       if (response.ok && isAdmin === 0) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("loggedInUser", username);
//         localStorage.setItem("userId", data.user.User_ID);
//         navigate("/dashboard");
//       } 
//       if (response.ok && isAdmin === 1) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("loggedInadmin", username);
//         localStorage.setItem("userId", data.user.User_ID);
//         navigate("/admin");
//       } else {
//         setErrors({ general: data.message || "Invalid credentials" });
//       }
//     } catch (error) {
//       setErrors({ general: "Login failed. Please try again." });
//       console.error("Login error:", error);
//     }
//   };

//   const handleSignupNavigate = () => {
//     navigate("/signup");
//   };

//   return (
//     <section 
//       className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1587281282277-2f3db1e4230e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
//       }}
//     >
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-md">
//         <div className="w-full bg-white/95 rounded-2xl shadow-2xl backdrop-blur-md dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="relative">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl_rWOW5qk0SL2geZYe_VoSWTsHXP-1XnSL0IR4G-1A6WeAsX-XEqypA&s"
//               alt="Cricket Banner"
//               className="w-full h-52 object-cover"
//             />
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
//               {/* <img 
//                 src="https://img.icons8.com/?size=100&id=80686&format=png&color=000000" 
//                 alt="Cricket Logo" 
//                 className="h-16 w-16 bg-white/80 rounded-full p-2 shadow-md"
//               /> */}
//             </div>
//           </div>
//           <div className="p-8 pt-12 space-y-6 sm:p-10 md:space-y-8">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl text-center">
//               Welcome to CricketHub
//             </h1>
//             {errors.general && (
//               <p className="text-red-500 text-sm text-center bg-red-100/50 p-3 rounded-lg font-medium">
//                 {errors.general}
//               </p>
//             )}
//             <div className="space-y-6 md:space-y-8">
//               <div className="relative">
//                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
//                   Username or Email
//                 </label>
//                 <div className="relative">
//                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     name="username"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
//                     placeholder="Enter username or email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 {errors.username && (
//                   <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>
//                 )}
//               </div>
//               <div className="relative">
//                 <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-3.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 focus:shadow-lg"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10"
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="h-5 w-5" />
//                     ) : (
//                       <EyeIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
//                 )}
//               </div>
//               <div className="flex items-center justify-end">
//                 <button
//                   onClick={handleForgetPassword}
//                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleLogin}
//                 className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
//               >
//                 Sign In
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
//                 Don’t have an account?{" "}
//                 <button
//                   onClick={handleSignupNavigate}
//                   className="font-medium text-blue-600 hover:underline dark:text-blue-500 transition-colors duration-300 hover:text-blue-700"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!username) tempErrors.username = "Username or email is required";
    if (!password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle forgot password navigation
  const handleForgetPassword = () => {
    navigate("/forgetpassword");
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const isAdmin = data.user?.Is_Admin;

      if (response.ok && isAdmin === 0) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("userId", data.user?.User_ID);
        navigate("/dashboard");
      } else if (response.ok && isAdmin === 1) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInadmin", username);
        localStorage.setItem("userId", data.user?.User_ID);
        navigate("/admin");
      } else {
        setErrors({ general: data.message || "Invalid credentials" });
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
      console.error("Login error:", error);
    }
  };

  // Handle signup navigation
  const handleSignupNavigate = () => {
    navigate("/signup");
  };

  // Debugging: Log to confirm component rendering
  console.log("Rendering Login component", { username, password });

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.jpg')",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full max-w-md">
        <div className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl_rWOW5qk0SL2geZYe_VoSWTsHXP-1XnSL0IR4G-1A6WeAsX-XEqypA&s"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Welcome to CricketHub
            </h1>
            {errors.general && (
              <p className="text-red-400 text-sm text-center bg-red-900 p-2 rounded">
                {errors.general}
              </p>
            )}
            <div className="space-y-4">
              {/* Username/Email Field */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-white">
                  Username or Email
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    className="border border-gray-600 bg-gray-700 text-white rounded-lg block w-full pl-10 p-2 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              {/* Password Field */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-white">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="border border-gray-600 bg-gray-700 text-white rounded-lg block w-full pl-10 p-2 pr-10 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleForgetPassword}
                  className="text-sm text-blue-400 hover:underline hover:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </button>
              <p className="text-sm text-gray-400 text-center">
                Don’t have an account?{" "}
                <button
                  onClick={handleSignupNavigate}
                  className="text-blue-400 hover:underline hover:text-blue-300"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;