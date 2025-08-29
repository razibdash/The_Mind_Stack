import CommonForm from "@/components/common-from";
import { AuthContext } from "@/context/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import AuthContextProvider from "@/context/auth-context";
import { GraduationCap, Image } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

function AuthIndex() {
  const [activeTab, setActiveTab] = useState("signin");
  // Function to handle tab change
  function handleTabChange(value) {
    setActiveTab(value);
  }
  // Import context for authentication
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  // Function to check if the sign-in form is valid
  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }
  // Function to check if the sign-up form is valid
  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/70 backdrop-blur-md shadow-sm">
        <Link to={"/"} className="flex items-center space-x-2">
          <img src="/logo1.PNG" className="h-10 w-10 rounded-lg shadow-md" />
          <span className="text-xl lg:text-2xl font-extrabold text-[#3192C7] tracking-wide">
            Mind Stack
          </span>
        </Link>
      </header>

      {/* Main Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md p-4"
        >
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 ">
            <TabsTrigger
              className={` font-bold rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white`}
              value="signin"
            >
              LOGIN
            </TabsTrigger>
            <TabsTrigger
              className={` font-bold rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white`}
              value="signup"
            >
              SIGN UP
            </TabsTrigger>
          </TabsList>

          {/* Sign In Card */}
          <TabsContent value="signin">
            <Card className="p-6 mt-4 space-y-4 rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#3192C7] text-2xl font-extrabold">
                  Welcome Back! 👋
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please enter your credentials to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Card */}
          <TabsContent value="signup">
            <Card className="p-6 mt-4 space-y-4 rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#3192C7] text-2xl font-extrabold">
                  Create a New Account 🚀
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                  buttonText={"Sign Up"}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthIndex;
