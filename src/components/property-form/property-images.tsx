import { useState } from "react";
import { useForm } from "react-hook-form";

const FileUpload = ({ form }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      form.setValue("files", files);
      setPreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 border p-4 rounded-lg shadow-md w-full">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Select Files
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <p className="text-sm text-gray-600">Upload multiple images (JPG, PNG, etc.)</p>
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {previews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FileUploadForm() {
  const form = useForm();

  const onSubmit = (data) => {
    console.log("Uploaded Files:", data.files);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full">
      <FileUpload form={form} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Upload
      </button>
    </form>
  );
}