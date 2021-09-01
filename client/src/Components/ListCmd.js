import React, { Fragment, useEffect, useState } from "react";
import EditCmd from "./EditCmd";

const ListCmd=()=>{
    const [cli_cmds, setCli_cmds] = useState([]);

    //delete todo function
    const deleteTodo = async id => {
        try {
        const deleteTodo = await fetch(`http://localhost:5000/cmd/${id}`, {
            method: "DELETE"
        });
        //show all the todo items except the ones that is not deleted
        //this way we do not need to refresh our app after  deleting
        setCli_cmds(cli_cmds.filter(cli_cmd => cli_cmd.clitable_id !== id));
        } catch (err) {
        console.error(err.message);
        }
    };

    const getCmds = async () => {
        try {
        const response = await fetch("http://localhost:5000/cmd");
        const jsonData = await response.json();//parse the data

        setCli_cmds(jsonData);
        } catch (err) {
        console.error(err.message);
        }
    };

    useEffect(() => {
        getCmds();
    }, []);

    console.log(cli_cmds);

    
    return(
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Cmd</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                
                {cli_cmds.map(cli_cmd => (
                    <tr key={cli_cmd.clitable_id}>
                    <td>{cli_cmd.cmd} -</td>
                    <td>{cli_cmd.description}</td>
                    <td>
                        <EditCmd cli_cmd={cli_cmd} />
                    </td>
                    <td>
                        <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(cli_cmd.clitable_id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}


export default ListCmd;