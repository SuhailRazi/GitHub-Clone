const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-glass">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold md:text-2xl text-center">
            {" "}
            Create Account
          </h1>
          <button
            type="button"
            className="text-white bg-[#24292F] hover:bg=[#24292f]/90"
          >
            Sign Up With GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
