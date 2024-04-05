import React, { useState } from 'react'
import './Form.css'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'


const schema = yup
  .object({
    filiere: yup.string().required('error'),
    title: yup.string().required('error'),
    message: yup.string().required('error'),

    
  })
  .required()

  
export default function Form() {

  const [load, setload] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) =>{
    setload(true)
    
    const templateParams = {
      fil: data.filiere,
      titre: data.title,
      mess: data.message,
    };

     emailjs.send('service_b84j2cb', 'template_hd45sjq', templateParams,'sRsXUvJVzCppzI9rW',).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
          Swal.fire({
            icon:"success",
            title:"votre message a éte enregistrer avec success"

          }
          )
      },
     
      (error) => {
        console.log('FAILED...', error);
        Swal.fire({
          icon:"error",
          title:"vous n'avez pas pu envoyer votre message"
        } 
        )
      },
    );
  }

  return (
    <div class="container mt-5">
    <div class="row justify-content-center ">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header d-flex justify-content-start">
            <a href="#"><img src="image/agora.jpg" width={50} height={50} alt="" /></a>
            <h5 class="card-title mt-3 ms-5 ">AGORA TECH ACADEMY</h5>
          </div>
          <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3 w-100 h-80">
                <label for="firstName" class="form-label">Filiere/Sector</label>
                <select  class="form-select "  aria-label="Default select example" id='filiere' {...register("filiere")}>
                    <option value="">write your Sector</option>
                    <option value="developpement fullstack web">developpement fullstack web</option>
                    <option value="administration systeme">administration systeme</option>
                    <option value="cybersecurité">cybersecurité</option>
                    <option value="marketing digital">marketing digital</option>
                </select>
                  <p className='text-danger'> {errors.filiere?.message}</p>
              </div>
              <div class="mb-3 ">
                <label for="title" class="form-label">Titre/Title</label>
                <input type="text" id="titre" class="form-control  text"  placeholder='write your title here' {...register("title")} />
                <p className='text-danger'>{errors.title?.message}</p>
              </div>
              <div class="mb-3 ">
                <label for="message" class="form-label">Message</label>
                <textarea type="text" id="message" class="form-control"  placeholder='write your text here' {...register("message")}/>
                <p className='text-danger'> {errors.message?.message}</p>
              </div>
                <div className="d-flex justify-content-around ">
                <button type="reset" className='button1'>Clear</button>
                <button type="submit" class="button2">Submit</button>
                </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

