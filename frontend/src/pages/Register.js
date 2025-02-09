import axios from "axios";
import { useForm } from "react-hook-form";

/**
 * Register component handles user registration functionality
 * Provides a form for username and password input
 */
const Register = () => {
  // Initialize react-hook-form with required methods
  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting },
    setError 
  } = useForm();

  /**
   * Handles the form submission
   * @param {Object} data - Contains form data (username and password)
   */
  const onSubmit = async (data) => {
    try {
      // Send registration request to backend
      const response = await axios.post("/api/auth/register", data);
      
      // Show success message and could redirect user
      alert("Registration successful!");
      // Optional: Add navigation to login page
      // navigate('/login');
      
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      
      // Set form error if specific field validation fails
      if (error.response?.data?.field) {
        setError(error.response.data.field, {
          type: "manual",
          message: errorMessage
        });
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
              }
            })}
            placeholder="Username"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            type="password"
            placeholder="Password"
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;