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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      setMessage("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    try {
      await API.delete(`/course/${id}`);
      setMessage("Course deleted successfully");
      fetchCourses(); // Refresh the list
    } catch (err) {
      setMessage("Failed to delete course");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
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
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition flex flex-col gap-2 hover:scale-105 duration-300"
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
                onClick={() => handleDelete(course._id)}
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Description: </p>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 h-24 resize-none"
                />
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCourse(null);
                    setFormData({ name: "", description: "", instructor: "" }); // Reset form
                    setIsModalOpen(false); // Open modal
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer"
                >
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
