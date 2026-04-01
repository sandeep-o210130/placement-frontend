import { useState, useEffect } from "react";
import API from "../services/app.js";
import { useNavigate } from "react-router-dom";

function ProfileForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    cgpa: "",
    dsaScore: "",
    aptitudeLevel: "",
    communicationLevel: "",
    projects: "",
    certificates: "",
    technologies: ""
  });

  const [originalData, setOriginalData] = useState(null); 
  const [resume, setResume] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  // ================= FETCH OLD DATA =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const profile = res.data;

        if (profile) {
          setForm({
            cgpa: profile.cgpa || "",
            dsaScore: profile.dsaScore || "",
            aptitudeLevel: profile.aptitudeLevel ? profile.aptitudeLevel / 20 : "",
            communicationLevel: profile.communicationLevel ? profile.communicationLevel / 20 : "",
            projects: profile.projects?.join(", ") || "",
            certificates: profile.certificates?.join(", ") || "",
            technologies: profile.technologies?.join(", ") || ""
          });

          setOriginalData(profile); 
        }

      } catch (err) {
        console.log("No previous profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= CHECK CHANGES =================
  const isSameData = () => {
    if (!originalData) return false;

    return (
      Number(form.cgpa) === originalData.cgpa &&
      Number(form.dsaScore) === originalData.dsaScore &&
      Number(form.aptitudeLevel) * 20 === originalData.aptitudeLevel &&
      Number(form.communicationLevel) * 20 === originalData.communicationLevel &&
      form.projects === (originalData.projects?.join(", ") || "") &&
      form.certificates === (originalData.certificates?.join(", ") || "") &&
      form.technologies === (originalData.technologies?.join(", ") || "")
    );
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = null;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    setResume(file);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await API.post("/profile/upload-resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { extractedData } = response.data;

      setForm(prev => ({
        ...prev,
        cgpa: extractedData.cgpa || prev.cgpa,
        projects: extractedData.projects?.join(", ") || "",
        certificates: extractedData.certificates?.join(", ") || "",
        technologies: extractedData.technologies?.join(", ") || ""
      }));

      alert("Resume parsed successfully!");

    } catch (err) {
      alert("Failed to parse resume");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }


      if (isSameData()) {
        alert("⚠️ No changes detected. Profile already up-to-date.");
        return;
      }

      const formattedData = {
        cgpa: Number(form.cgpa),
        dsaScore: Number(form.dsaScore),
        aptitudeLevel: Number(form.aptitudeLevel) * 20,
        communicationLevel: Number(form.communicationLevel) * 20,
        projects: form.projects
          ? form.projects.split(",").map(p => p.trim()).filter(p => p !== "")
          : [],
        certificates: form.certificates
          ? form.certificates.split(",").map(c => c.trim()).filter(c => c !== "")
          : [],
        technologies: form.technologies
          ? form.technologies.split(",").map(t => t.trim()).filter(t => t !== "")
          : []
      };

      await API.post("/profile/create", formattedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Profile saved successfully");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Profile creation failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "var(--bg-color)" }}
    >
      <div className="card shadow p-4" style={{ width: "420px" }}>

        <h3 className="text-center mb-3">
          Placement Profile
        </h3>

        <form onSubmit={handleSubmit}>

          <input type="number" step="0.1" min="0" max="10"
            className="form-control mb-3"
            name="cgpa"
            placeholder="CGPA (0-10)"
            value={form.cgpa}
            onChange={handleChange}
            required
          />

          <input type="number" min="0" max="100"
            className="form-control mb-3"
            name="dsaScore"
            placeholder="DSA Score (0-100)"
            value={form.dsaScore}
            onChange={handleChange}
            required
          />

          <input type="number" min="1" max="5"
            className="form-control mb-3"
            name="aptitudeLevel"
            placeholder="Aptitude Level (1-5)"
            value={form.aptitudeLevel}
            onChange={handleChange}
            required
          />

          <input type="number" min="1" max="5"
            className="form-control mb-3"
            name="communicationLevel"
            placeholder="Communication Level (1-5)"
            value={form.communicationLevel}
            onChange={handleChange}
            required
          />

          <input type="text"
            className="form-control mb-3"
            name="projects"
            placeholder="Projects (comma separated)"
            value={form.projects}
            onChange={handleChange}
          />

          <input type="text"
            className="form-control mb-3"
            name="certificates"
            placeholder="Certificates (comma separated)"
            value={form.certificates}
            onChange={handleChange}
          />

          <input type="text"
            className="form-control mb-3"
            name="technologies"
            placeholder="Technologies (comma separated)"
            value={form.technologies}
            onChange={handleChange}
          />

          <div className="mb-3 text-center">
            <label className={`btn ${isParsing ? "btn-secondary" : "btn-outline-primary"} w-100`}>
              {isParsing ? "Parsing Resume... ⏳" : "AutoFill With Resume (PDF)"}

              <input
                type="file"
                accept=".pdf"
                hidden
                disabled={isParsing}
                onChange={handleResumeUpload}
              />
            </label>

            {resume && !isParsing && (
              <p style={{ fontSize: "12px", marginTop: "5px", color: "green" }}>
                ✅ {resume.name} Analyzed
              </p>
            )}
          </div>

          <button className="btn btn-primary w-100">
            Save Profile
          </button>

        </form>

      </div>
    </div>
  );
}

export default ProfileForm;