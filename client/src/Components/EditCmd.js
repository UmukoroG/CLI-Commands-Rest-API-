import React, { Fragment, useState } from "react";

const EditCmd=({cli_cmd})=>{
    const [cmd, setCmd] = useState(cli_cmd.cmd);
    const [description, setDescription] = useState(cli_cmd.description);

    const updateClicmd = async e => {
        e.preventDefault();
        try {
          const body = {cmd,description };
        //   console.log(body)
          const response = await fetch(
            `http://localhost:5000/cmd/${cli_cmd.clitable_id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );           
          window.location = "/";//refresh to show changes
        } catch (err) {
          console.error(err.message);
        }
    };



    return(
        <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${cli_cmd.clitable_id}`}
      >
        Edit
      </button>

      
      <div
        class="modal"
        id={`id${cli_cmd.clitable_id}`}
        onClick={() => {setDescription(cli_cmd.description);
            setCmd(cli_cmd.cmd)}}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Cmd</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {setDescription(cli_cmd.description);
                    setCmd(cli_cmd.cmd)}}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={cmd}
                onChange={e => setCmd(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateClicmd(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {setDescription(cli_cmd.description); setCmd(cli_cmd.cmd)}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    )
}

export default EditCmd;