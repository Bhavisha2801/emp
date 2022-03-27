import React from "react";

const Employee = () => {

    const [inpValue , setInpValue] = React.useState({
        name : "",
        age : "",
        address : "",
        department : "",
        salary : "",
        isMarried : false,
    }) 

    React.useEffect(() => {
        getdata()
    },[])

    const [data , setData] = React.useState([])

    const getdata = () => {
        fetch(`http://localhost:3001/emp`)
        .then((res) => res.json())
        .then((res) => setData(res))
    }

    const handleChange = (e) => {
        const {name , value , checked , type} = e.target
        setInpValue({
            ...inpValue , [name] : type === "checkbox" ? checked : value
        })
    }

    const {name , age , address , department , salary , isMarried} = inpValue;

    const handleSubmit = (e) => {
        e.preventDefault();

        const serverData = JSON.stringify(inpValue)

        fetch(`http://localhost:3001/emp`,{
            method : "POST",
            body : serverData,
            headers : {
                "content-type" : "application/json"
            }
        })
        .then((res) => {
            getdata()
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name 
                    <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} value={name} />
                </label>
                <br />
                <label>Age 
                    <input type="number" name="age" placeholder="Enter Age" onChange={handleChange} value={age} />
                </label>
                <br />
                <label>Address 
                    <input type="text" name="address" onChange={handleChange} value={address} />
                </label>
                <br />
                <label>Department 
                    <select name="department"  onChange={handleChange} value={department} >
                        <option value="marketing">Marketing</option>
                        <option value="technical">Technical</option>
                    </select>
                </label>
                <br />
                <label>Salary 
                    <input type="number" name="salary" onChange={handleChange} value={salary} />
                </label>
                <br />
                <label>Marital State
                    <input type="checkbox" name="isMarried" onChange={handleChange} checked={isMarried} />
                </label>
                <br />
                <input type="submit" value="SUBMIT" />
            </form>
            {
                data.map((item) => <div key={item.id}>
                    <table className="border">
                        <thead>
                            <th className="border">Name</th>
                            <th className="border">Age</th>
                            <th className="border">Address</th>
                            <th className="border">Department</th>
                            <th className="border">Salary</th>
                            <th className="border">Marital State</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border">{item.name}</td>
                                <td className="border">{item.age}</td>
                                <td className="border">{item.address}</td>
                                <td className="border">{item.department}</td>
                                <td className="border">{item.salary}</td>
                                <td className="border">{item.isMarried}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> )
            }
        </div>
    )
}

export { Employee }