
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log("userdata" , userData); 

    const isAuthor = post && userData?.data?._id ? post.userId === userData.data._id : false;

    useEffect(() => {
        if (slug) {
           
            service.getPost(slug).then((response) => {
                 console.log("post" , post); 
                if (response && response.data) setPost(response.data);
                else navigate("/");
            });

        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post._id).then((status) => {
            if (status) {
            service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className=" flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="rounded-xl w-80 h-auto max-h-96 object-cover "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-black">{post.title}</h1>
                   
                </div>
                <div className="browser-css text-black">
                    {parse(post.content || "")}
                    </div>
            </Container>
        </div>
    ) : null;
}
