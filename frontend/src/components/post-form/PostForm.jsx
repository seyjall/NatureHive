import React , {useCallback , useEffect} from "react";
import { useForm } from "react-hook-form";
import {Button , Input , Select , RTE} from ".."
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm ({post}) {
  
    const {register , handleSubmit ,watch ,setValue , control, getValues ,  reset ,formState: { errors } } = useForm(
       {defaultValues : {
        title : "" , 
        slug:  "",
        content :  "" , 
        status : 'active' , 

    },} 
    )

     useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.$id || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

    const navigate = useNavigate() 
    const userData = useSelector((state) => state.auth.userData )


    const submit = async (data) => {
    
           console.log('userDATa:', userData);
  const userId = userData?.userData.data._id;

  if (!userId) {
    console.error("🚨 ERROR: User ID is missing! Make sure the user is logged in.");
    return;
  }

  try {
    // Prepare a FormData object
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("userId", userId);

    console.log("formData appended")

    if (data.image && data.image[0]) {
      formData.append("featuredImage", data.image[0]);
    }

    let response;

    if (post) {
      // Update post — usually same logic, but your backend must have an update route!
      console.log("post already exists"); 
      response = null ; 
    } else {
      // Create post
      response = await service.createPost(formData);
    }
     
    if (response) {
      navigate(`/post/${response.data.slug}`);
    }

  } catch (error) {
    console.error("❌ Error submitting post:", error);
  }

    }

    const slugTransform = useCallback((value) => {
          if(value && typeof value === 'string') { 
             return          value
                              .trim()
                              .toLowerCase()
                             .replace(/[^a-zA-Z\d\s]+/g , "-")
                               .replace(/\s/g , "-")
         

            
          }
          return ""
    } , [])


    React.useEffect(() => {
        const subscription = watch((value , {name}) => {

            if(name === 'title') {
                setValue('slug' , slugTransform(value.title) ,  {shouldValidate : true });
            }

        }) 

        return ()=>{
            subscription.unsubscribe() 
   
        }
    } ,[watch ,slugTransform , setValue])
    // console.log("form state" , watch())
    // console.log("Validation Errors:", errors);
    return(
        <>
           <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        
                    }}
                />
                <RTE label="Content :" name="content" control={control}  defaultValue={watch("content")}/>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                    
                </Button>
            </div>
        </form>
        </>
    )
}

export default PostForm

