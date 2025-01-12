import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const { backendurl, Admintoken } = useContext(AdminContext);

  const [name, setname] = useState("");
  const [image, setimage] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Experience, setExperience] = useState("1 year");
  const [Fees, setFees] = useState("");
  const [Speciality, setSpeciality] = useState("General physician");
  const [Education, setEducation] = useState("");
  const [About, setAbout] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!image) {
        return toast.error("Image not selected");
      }

      //collecting form data
      const formdata = new FormData();

      formdata.append("image", image);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("experience", Experience);
      formdata.append("speciality", Speciality);
      formdata.append("degree", Education);
      formdata.append("fees", Number(Fees));
      formdata.append("about", About);
      formdata.append(
        "Address",
        JSON.stringify({ line1: Address1, line2: Address2 })
      );

      // formdata.forEach((value, key)=>{
      //   console.log(`${key} : ${value}`)
      // })

      const {data} = await axios.post(
        backendurl + "/api/admin/add-doctor",
        formdata,
        {
          withCredentials:true,
        }
      );

      console.log(data)

      if(data.success){
        toast.success("Doctor Added successfully");
        setname('');
        setemail('');
        setpassword('');
        setAbout('');
        setAddress1('');
        setAddress2('');
        setEducation('');
        setFees('');
      }else{
        toast.error(data.Error)
      }

     

    } catch (err) {
      console.log(err)
      toast.error(err.response.data)
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full px-12 py-4 flex flex-col gap-4"
    >
      <p className="px-6 font-semibold">Add Doctor</p>
      <div className="flex flex-col gap-4 border border-gray-600 rounded-lg px-6 py-10">
        <div>
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="doc-id">
              <img
                className="w-28 "
                src={image ? URL.createObjectURL(image) : assets.upload_area}
              />
            </label>
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="doc-id"
              hidden
            />
            <p className="text-gray-600">
              Upload doctor <br /> picture
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-x-4">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Doctor Name: </p>
              <input
                className="border-2 rounded-lg py-2 px-3"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setname(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Doctor Email: </p>
              <input
                className="border-2 rounded-lg py-2 px-3"
                type="email"
                placeholder="Your Email"
                required
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Doctor Password: </p>
              <input
                className="border-2 rounded-lg py-2 px-3"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Experience: </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={Experience}
                className="border-2 rounded-lg py-2 px-3"
                required
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Fees: </p>
              <input
                className="border-2 rounded-lg py-2 px-3"
                type="number"
                placeholder="Your Fees "
                required
                onChange={(e) => setFees(e.target.value)}
                value={Fees}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 ">
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Speciality: </p>
              <select
                className="border-2 rounded-lg py-2 px-3 w-2/3"
                onChange={(e) => setSpeciality(e.target.value)}
                value={Speciality}
                required
              >
                <option value="General Physician">General Physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Gynecologist">Gynecologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Education: </p>
              <input
                className="border-2 rounded-lg py-2 px-3 w-2/3"
                type="text"
                placeholder="Your Education"
                required
                onChange={(e) => setEducation(e.target.value)}
                value={Education}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-gray-600">Address: </p>
              <input
                className="border-2 rounded-lg py-2 px-3 w-2/3"
                type="text"
                placeholder="Adress 1"
                required
                onChange={(e) => setAddress1(e.target.value)}
                value={Address1}
              />
              <input
                className="border-2 rounded-lg py-2 px-3 w-2/3"
                type="text"
                placeholder="Adress 2"
                required
                onChange={(e) => setAddress2(e.target.value)}
                value={Address2}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <p className="text-gray-600">About: </p>
            <textarea
              className="border-2 rounded-lg py-2 px-3 w-1/2"
              row={5}
              placeholder="Write about yourself"
              required
              onChange={(e) => setAbout(e.target.value)}
              value={About}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 w-1/6 rounded-full"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
