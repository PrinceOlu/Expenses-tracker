import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "../../services/users/userServices";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
// import { loginAction } from "../../redux/slice/AuthSlice";


const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-Password"],
    // onSuccess: (data) => {
    //   dispatch(loginAction(data)); 
    //   localStorage.setItem("UserInfo", JSON.stringify(data));
    //   navigate("/dashboard"); 
    // },
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync({ newPassword: values.newPassword })
        .then((data) => {
          navigate("/dashboard"); 
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword" // Updated to match the validation schema
              {...formik.getFieldProps("newPassword")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.newPassword}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
        {isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        {isSuccess && <p className="text-green-500 mt-2">Password updated successfully!</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
