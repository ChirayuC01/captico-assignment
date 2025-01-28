import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructor: "",
  });
  const [editingCourse, setEditingCourse] = useState(null); // Track the course being edited
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [idToDelete, setIdToDelete] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [errors, setErrors] = useState({}); // Track field errors

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer if `message` changes
    }
  }, [message]);

  // Fetch all courses
  const fetchCourses = async () => {
    setLoadingData(true); // Start loading
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      setMessage("Failed to fetch courses");
    } finally {
      setLoadingData(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    if (editingCourse) {
      // Update course
      try {
        await API.put(`/course/${editingCourse._id}`, formData);
        setMessage("Course updated successfully");
        fetchCourses(); // Refresh the list
        setEditingCourse(null); // Reset editing state
        setFormData({ name: "", description: "", instructor: "" }); // Reset form
        setIsModalOpen(false); // Close modal
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to update course");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      // Create course
      try {
        await API.post("/courses", formData);
        setMessage("Course created successfully");
        fetchCourses(); // Refresh the list
        setFormData({ name: "", description: "", instructor: "" }); // Reset form
        setIsModalOpen(false); // Close modal
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to create course");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  // Handle opening the modal for editing
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      instructor: course.instructor,
    });
    setIsModalOpen(true); // Open modal
  };

  // Handle deleting a course
  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages
    try {
      await API.delete(`/course/${id}`);
      setMessage("Course deleted successfully");
      fetchCourses(); // Refresh the list
    } catch (err) {
      setMessage("Failed to delete course");
    } finally {
      setLoading(false); // Stop loading
      setIsDeleteDialogOpen(false);
      setIdToDelete();
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 3) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = "Instructor name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
      {loadingData ? (
        <div class="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setEditingCourse(null);
              setFormData({ name: "", description: "", instructor: "" }); // Reset form
              setIsModalOpen(true); // Open modal
            }}
            className="w-full md:w-fit px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer"
          >
            Add New Course
          </button>
          {message && <p className="text-center text-red-500">{message}</p>}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="h-full p-4 bg-white rounded-lg shadow hover:shadow-xl transition flex flex-col gap-2 hover:scale-105 duration-300"
              >
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-gray-800 font-medium">
                  Instructor: {course.instructor}
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(course)}
                    className="px-5 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setIdToDelete(course._id);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!validateForm()) return; // Prevent submission if validation fails
                    handleSubmit();
                  }}
                  className="space-y-4"
                >
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Course Name: </p>
                    <input
                      type="text"
                      name="name"
                      placeholder="Course Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                        errors.name
                          ? "border-red-500 focus:ring-red-300"
                          : "focus:ring-blue-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Description: </p>
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                        errors.description
                          ? "border-red-500 focus:ring-red-300"
                          : "focus:ring-blue-300"
                      } h-24 resize-none`}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Instructor: </p>
                    <input
                      type="text"
                      name="instructor"
                      placeholder="Instructor"
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                        errors.instructor
                          ? "border-red-500 focus:ring-red-300"
                          : "focus:ring-blue-300"
                      }`}
                    />
                    {errors.instructor && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.instructor}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourse(null);
                        setFormData({
                          name: "",
                          description: "",
                          instructor: "",
                        }); // Reset form
                        setErrors({}); // Clear errors
                        setIsModalOpen(false); // Close modal
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {editingCourse
                        ? loading
                          ? "Updating..."
                          : "Update Course"
                        : loading
                        ? "Adding..."
                        : "Add Course"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700">Are you sure you want to delete ?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setIdToDelete("");
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(idToDelete)}
                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
