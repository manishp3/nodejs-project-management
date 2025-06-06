import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd } from '@fortawesome/free-solid-svg-icons';
import { GetApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
// import Project from './Projects';

const Project = () => {
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
  console.log("AllProjects data::", AllProjects);
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

  return (
    <>
      {/* Add Project Button Row */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        {/* <FontAwesomeIcon icon={faAdd} size="lg" style={{ cursor: "pointer" }} /> */}

        <Button onClick={openCreateProjectModal} variant="primary">Create Project</Button>

      </div>
      <div style={{
        backgroundColor: "white",
        height: "200px",
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>

        <div>
          <h3 style={{ margin: 0 }}>{ }</h3>
          <p>Total Tasks: { }</p>
          <p>Members: { }</p>
        </div>
        <div style={{backgroundColor:"blue", display: "flex", justifyContent: "flex-end" }}>
          <FontAwesomeIcon icon={faFolderOpen} size="2x" color="#888" />
        </div>
      </div>
      <CModal visible={isCreateProjectModalOpen}>
        <CModalHeader>
          <CHeader>Create Project</CHeader>
        </CModalHeader>
        <CModalBody>
          {/* <CInputGroup > */}
          {/* <CInputGroupText> */}
          <label className="mb-1">Project Name</label>
          {/* </CInputGroupText> */}
          <CFormInput
            type="text"
            placeholder="Enter project name.."
            name="projectname"
            value={projectData.projectname}
            onChange={(e) => handleProjectChange(e)}
          />
          {/* </CInputGroup> */}
          {/* <CInputGroup className="mb-4"> */}
          {/* <CInputGroupText> */}
          <label className="mb-4">Project members</label>
          {/* </CInputGroupText> */}
          <Select
            options={Members}
            value={ProjectMembers} // must match the same format [{value, label}, ...]
            onChange={(selectedOptions) => setProjectMembers(selectedOptions)}
            isMulti={true}
          />
          {/* </CInputGroup> */}

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

export default Project;
