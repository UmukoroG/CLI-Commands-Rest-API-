import React, { Fragment, useState } from "react";

const InputCmd=()=>{
    const [cmd, setCmd]=useState("");
    const [description, setDescription]=useState("");


    const onSubmitForm= async e => {
        e.preventDefault();
        try {
            const body={cmd, description};
            const response =await fetch("http://localhost:5000/cmd",{
                method:"POST",
                headers:{"content-Type": "application/json"},
                body:JSON.stringify(body)
            });
            // console.error(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }
    }
    return(
        <Fragment>
            <h1 className="text-center mt-5">CLI Command Snippet</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm} >
                <input
                    type="text"
                    className="form-control"
                    placeholder="cmd"
                    value={cmd}
                    onChange={e => setCmd(e.target.value)}
                />
                <br/>
                <input
                type="text"
                className="form-control"
                placeholder="desciption"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>

        </Fragment>
    )
}

export default InputCmd;