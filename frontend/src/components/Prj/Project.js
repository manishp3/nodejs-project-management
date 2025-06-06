import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd } from '@fortawesome/free-solid-svg-icons';
import { GetApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
import { useLocation } from 'react-router-dom';
// import Project from './Projects';

const Project = () => {
  const location=useLocation()
  console.log("location data::",location);
  

  return (
    <>
      <h1>Project grdi add</h1>
      {/* <CModal visible={isCreateProjectModalOpen}>
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
      </CModal> */}
    </>
  );
};

export default Project;
