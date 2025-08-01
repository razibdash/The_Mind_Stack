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
  // Function to handle tab change
  function handleTabChange(value) {
    setActiveTab(value);
  }

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
  // Function to handle form submission
  console.log(signInFormData);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <img src="/logo1.PNG" className=" text-xl h-8 w-8 lg:h-10 lg:w-10" />
          <span className=" mt-2 lg:text-xl font-extrabold text-[#3192C7]">
            Mind Stack
          </span>
        </Link>
      </header>
      <div className="flex   items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md bg-white-300 p-5"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className="text-blue-300 font-bold cursor-pointer"
              value="signin"
            >
              SIGN IN
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="text-blue-300 font-bold cursor-pointer"
            >
              SIGN UP
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle className="text-[#3192C7]">Welcome Back!</CardTitle>
                <CardDescription>
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
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle className="text-[#3192C7]">
                  Create a new account
                </CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm formControls={signUpFormControls} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthIndex;
