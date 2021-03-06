import Alert from "react-s-alert";
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import {
    DropdownButton,
    MenuItem
} from "react-bootstrap";

import Attachment from "components/Shared/Attachment";

import DEF_STATES from "common/constants/DefectStates";
import DEF_COLORS from "constants/DefectStateColors";

import Description from "components/Shared/Description";
import Title from "components/Shared/Title";

const AddEditDefectForm = props => {
    const {
        assignee,
        attachments,
        defectId,
        description,
        isEditMode,
        name,
        onAttachFile,
        onChangeAssignee,
        onChangeName,
        onChangeDescription,
        onChangeStatus,
        onDeleteAttachment,
        onDownloadAttachment,
        onSaveAttachment,
        status,
        users
    } = props;

    const handleAttach = files => {
        if(files && files.length) {
            const file = files[0];
            if(!file || !file.name || !file.size) {
                Alert.error("Invalid file");
                return;
            }
            if(onAttachFile)
                onAttachFile(file);
        }
    };
    const handleChangeAssignee = val => onChangeAssignee
        ? onChangeAssignee(val)
        : null;
    const handleChangeStatus = val => onChangeStatus
        ? onChangeStatus(val)
        : null;

    return (<Dropzone
        className="dropzone"
        activeClassName="active"
        multiple={false}
        disableClick={true}
        onDrop={handleAttach}
    >
        <div className="wrapper">
            <div className="title-container">
                <Title placeholder="Name" onUpdate={onChangeName} value={name} />
            </div>
            <div className="status-container">
                {defectId
                    ? <DropdownButton
                            bsStyle={DEF_COLORS[status]}
                            bsSize="small"
                            title={status}
                            id="status-dd"
                    >
                        {DEF_STATES.map(s => (<MenuItem
                            key={s}
                            onSelect={() => handleChangeStatus(s)}
                        >{s}</MenuItem>))}
                    </DropdownButton>
                    : null}
                </div>
            <div className="description-container">
                <Description
                    placeholder="Description"
                    onUpdate={onChangeDescription}
                    onUpload={handleAttach}
                    value={description} />
            </div>
            <div className="assignee-container">
                {users
                    ? <DropdownButton
                        bsSize="small"
                        title={assignee && assignee.name || "< Unassigned >"}
                        id="assignee-dd"
                    >
                        {users.map(u => (<MenuItem
                            key={`assignee-${u.id}`}
                            onSelect={() => handleChangeAssignee(u)}
                        >{u.name}</MenuItem>))}
                    </DropdownButton>
                    : null}
            </div>
            <div className="attachments">
                {attachments.map(attachment => <Attachment
                    key={`attachment-${attachment.name}`}
                    allowDownload={isEditMode}
                    allowEdit={isEditMode}
                    attachment={attachment}
                    onDelete={onDeleteAttachment}
                    onDownload={onDownloadAttachment}
                    onSave={onSaveAttachment} />)}
            </div>
        </div>
    </Dropzone>);
};
AddEditDefectForm.propTypes = {
    assignee: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    attachments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    })),
    defectId: PropTypes.number,
    description: PropTypes.string,
    isEditMode: PropTypes.bool,
    name: PropTypes.string,
    onAttachFile: PropTypes.func,
    onChangeAssignee: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onDeleteAttachment: PropTypes.func.isRequired,
    onDownloadAttachment: PropTypes.func.isRequired,
    onSaveAttachment: PropTypes.func.isRequired,
    status: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }))
};

export default AddEditDefectForm;
