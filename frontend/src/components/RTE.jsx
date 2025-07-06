
import React from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

export default function RTE ({name , control ,label ,defaultValue = "" }) {
    return(
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">
                {label}
            </label>}
            
            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                
                    apiKey = '14bjuqyof6q8288p5lm13h2f36zgvcoo2ksaufno7mnmi493' 
                        value={value}
                      
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ], 
                            toolbar: [
                               'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
                            ], 
                            content_style : 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                         
                         
                           
                        }}
                        onEditorChange={onChange}

                      
                    />
                   
                )}
            />
        </div>
    )
}


