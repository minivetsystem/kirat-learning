"use client";
import React, { useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import 'react-markdown-editor-lite/lib/index.css';



import { useRouter } from 'next/navigation';
import axios from 'axios';




export default function AddBlog() {
  const [redirect, setRedirect] = useState(false);
  const route = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(["abc"]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(["abd"]);
  const [status, setStatus] = useState("defult");

  async function createProduct(e) {
    e.preventDefault();
    // const data = {
    //   title,
    //   slug,
    //   description,
    //   category,
    //   tags,
    //   image,
    //   status,
    // };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("image", image);
    formData.append("status", status);


    console.log(formData)
 try{
    const response = await axios.post("/api/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response)
    setRedirect(true);
 }  catch (error) {
    console.error(error);
  }
    
   
  }

  // if (redirect) {
  //   route.push("/dashboard");
  //   return null;
  // }

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
    const newSlug = inputValue.toLowerCase().replace(/\s+/g, '-');
    setSlug(newSlug);
  };

  return (
    <div className="container flex flex-col p-12 w-full mx-auto gap-8 ">
      <div className="flex justify-between">
        <span>
          <h1 className="text-3xl font-bold text-primary-midnightBlue">Blog List</h1>
          <h3 className="font-semibold text-secondary-lightGray">Admin Panel</h3>
        </span>
        <span></span>
      </div>
      <div className="border border-secondary-lightGray p-6 rounded-lg bg-white ">
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <form className=" flex flex-col gap-2" onSubmit={createProduct}>
            {/* blog title */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="title" className="text-primary-midnightBlue">Title</label>
              <input type="text" id="title" className="p-4  w-full h-[51px] block rounded-lg  border   truncate" placeholder="Enter small title" onChange={handleTitleChange} />
            </div>
            {/* blog slug */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="slug" className="text-primary-midnightBlue">Slug</label>
              <input type="text" id="slug" className="p-4  w-full h-[51px] block rounded-lg  border   truncate" value={slug}  placeholder="Enter slug yrl" readOnly/>
            </div>

            {/* blog category */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="category" className="text-primary-midnightBlue">Category</label>
              <select name="category" className="p-4 w-full block rounded-lg  k border  truncate" id="category" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="">Category 1</option>
                <option value="">Category 2</option>
                <option value="">Category 3</option>
                <option value="">Category 4</option>
              </select>
              <p className="existingcatagory flex gap-1 mt-1 mb-1">
                selected: <span></span>
              </p>
            </div>

             {/* blog Image */}
             <div className="w-100 flex flex-col gap-1 justify-start mb-2">
  <label htmlFor="image" className="text-primary-midnightBlue">Image</label>
  <input 
    type="file" 
    id="image" 
    className="p-4 w-full h-[51px] block rounded-lg border truncate" 
    onChange={(e) => setImage(e.target.files?.[0])} 
    placeholder="Enter slug yrl" 
  />
</div>


            {/* markdown description content */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="slug" className="text-primary-midnightBlue">Blog Content</label>
              <MarkdownEditor
                value={description}
                onChange={(e) => setDescription(e.text)}
                style={{ width: "100%", height: "400px", borderRadius: "5px" }}
                renderHTML={(text) => <ReactMarkdown
                components={{code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if(inline){
                    return <code>
                      {children}
                    </code>
                  }else if (match){
                    return  ( <div style={{position: 'relative'}}>
                      <pre style={{padding: '0',borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                        <code>{children}</code>
                      </pre>
                      <button style={{position: 'absolute', top: '0', right: '0', border: 'none'}} onClick={() => navigator.clipboard.writeText(children)}>copy code</button>
                    </div>);
                  } else {
                    return <code {...props}>{children}</code>
                  }
                }}}>{text}</ReactMarkdown>}
              />


          
            </div>

            {/* blog tags */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="tags" className="text-primary-midnightBlue">Tags</label>
              <select name="Tags" className="p-4 w-full block rounded-lg  k border  truncate" id="tag" onChange={(e) => setTags(e.target.value)}>
                <option value="">Select Category</option>
                <option value="">Tag 1</option>
                <option value="">Tag 2</option>
                <option value="">Tag 3</option>
                <option value="">Tag 4</option>
              </select>
              <p className="existingcatagory flex gap-1 mt-1 mb-1">
                selected: <span>Tags</span>
              </p>
            </div>

            {/* status */}
            <div className="w-100 flex flex-col gap-1 justify-star mb-2">
              <label htmlFor="statuss" className="text-primary-midnightBlue">Status</label>
              <select name="status" className="p-4 w-full block rounded-lg  k border  truncate" id="status" onChange={(e) => setStatus(e.target.value)}>
                <option value="">No Select</option>
                <option value="">Tag 1</option>
                <option value="">Tag 2</option>
              </select>
              <p className="existingcatagory flex gap-1 mt-1 mb-1">
                selected: <span>Status</span>
              </p>
            </div>

            {/* submit button */}
            <div className="w-100 mb-2">
              <button type="submit" className="rounded-lg  px-6 py-4 gap-3 items-center justify-center inline-flex truncate border">
                SAVE BLOG
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
