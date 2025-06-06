import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd } from '@fortawesome/free-solid-svg-icons';
import { GetApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
// import Project from './Projects';

const ProjectsPage = () => {
  const navigate=useNavigate()
  const [isCreateProjectModalOpen, setisCreateProjectModalOpen] = useState(false)
  const [iscreateProjectDisabled, setiscreateProjectDisabled] = useState(false)
  const [refresData, setrefresData] = useState(0)
  const [projectData, setprojectData] = useState({
    projectname: ""
  })
  const handleProjectChange = (e) => {

    const { name, value } = e.target;
    setprojectData((pre) => ({
      ...pre,
      [name]: value
    }))
  }
  const [Members, setMembers] = useState([])
  const [ProjectMembers, setProjectMembers] = useState([])
  const [AllProjects, setAllProjects] = useState([])
  useEffect(() => {
    async function getProjectsDetails() {
      const response = await GetApiCall("projects");
      setAllProjects(response.data.projects)
      console.log("getProjectsDetails data::", response);
      // return response;
    }
    async function getMembersDetails() {
      const data = await GetApiCall("users");
      console.log("getProjectsDetails data::users", data);
      // return data;
      setMembers(data.data.user)
    }
    getProjectsDetails()
    getMembersDetails()

  }, [])
  console.log("all members otpon::", Members);


  const openCreateProjectModal = () => {
    setisCreateProjectModalOpen(true)
    console.log("openCreateProjectModal");
  }

  const handleCreateProject = async () => {
    setiscreateProjectDisabled(true)
    const mapIds = ProjectMembers.map((id) => (
      id.value
    ))
    const payload = {
      project_name: projectData.projectname,
      members: mapIds
    }
    console.log("payload of crete project;::", payload);

    const resp = await PostApiCall("project_c/", payload)
    console.log("respopnse of create project::", resp);
    setiscreateProjectDisabled(false);
    setisCreateProjectModalOpen(false);

  }
  console.log("prokect members::", ProjectMembers);

  const handleMembersDDChange = (data) => {
    console.log("selected members");
    setProjectMembers((prev) => [...prev, data])

  }

  console.log("AllProjects data::", AllProjects);
  return (
    <>
      {/* Add Project Button Row */}
      {AllProjects.map((project,index) => (

        <div
        key={index}
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#fff", // soft hover color
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            position: "relative",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h5 style={{ margin: 0 }}>Project Name :{project?.project_name}</h5>
            <p>Total Tasks: {project?.total_task}</p>
            <p onClick={()=>navigate("project",{state:{project_id:project._id}})}  style={{ color: "#007bff", textDecoration: "underline" }}>
              View Details
            </p>
          </div>

          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <FontAwesomeIcon icon={faFolderOpen} size="2x" color="#f0ad4e" />
          </div>
        </div>
      ))
      }
      <CModal visible={isCreateProjectModalOpen}>
        <CModalHeader>
          <CHeader>Create Project</CHeader>
        </CModalHeader>
        <CModalBody>


          <label className="mb-1">Project Name</label>

          <CFormInput
            type="text"
            placeholder="Enter project name.."
            name="projectname"
            value={projectData.projectname}
            onChange={(e) => handleProjectChange(e)}
          />

          <label className="mb-4">Project members</label>

          <Select
            options={Members}
            value={ProjectMembers} // must match the same format [{value, label}, ...]
            onChange={(selectedOptions) => setProjectMembers(selectedOptions)}
            isMulti={true}
          />


        </CModalBody>
        <CModalFooter>
          <CButton color="primary" className="px-4" disabled={iscreateProjectDisabled}
            onClick={handleCreateProject}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ProjectsPage;
