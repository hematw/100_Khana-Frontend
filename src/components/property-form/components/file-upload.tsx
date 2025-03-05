import { ImagePlus, UploadCloud, X } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPropertyForm } from "..";
import { Button } from "@/components/ui/button";

type FilePreview = {
  name: string;
  size: number;
  url: string;
};

function FileUpload({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  const handleFileChange: ChangeEventHandler = (e) => {
    const fileList = (e.target as HTMLInputElement)?.files;
    console.log(fileList);
    if (fileList) {
      const files = Array.from(fileList);

      form.setValue("images", files);

      setPreviews((prev) => [
        ...prev,
        ...files.map((file) => ({
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
        })),
      ]);
    }
  };

  const handleDelete = (fileName: string) => {
    setPreviews((prev) => prev.filter((file) => file.name !== fileName));
    form.setValue(
      "images",
      form
        .getValues("images")
        .filter((file) => (file as File).name !== fileName)
    );
  };

  return (
    <div className=" gap-3 rounded-lg col-span-2">
      <h3>Upload the photos of your property (this help you to get more views).</h3>
      <p className="text-sm text-gray-600">Photos should be in <span className="font-semibold">jpeg, png</span> or <span className="font-semibold">webp</span> format</p>
      {/* <label className="max-w-xl mt-4 cursor-pointer bg-red-200 px-4 py-2 rounded-lg  w-full h-36 border-2 border-red-400 border-dashed flex flex-col gap-4 items-center justify-center">
        <UploadCloud size={42} color="#f82855" />
        <p className="text-sm text-gray-600">Upload multiple images (JPG, PNG, etc.)</p>
        <p className="text-sm text-gray-600">Maximum size for all files 30 MB</p>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label> */}
      <div className="w-full grid grid-cols-3 gap-4">
        <label className="max-w-xl mt-4 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg  w-full h-36 border-2 border-gray-400 border-dashed flex flex-col gap-4 items-center justify-center">
          <ImagePlus size={42} color="gray" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <label className="max-w-xl mt-4 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg  w-full h-36 border-2 border-gray-400 border-dashed flex flex-col gap-4 items-center justify-center">
          <ImagePlus size={42} color="gray" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <label className="max-w-xl mt-4 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg  w-full h-36 border-2 border-gray-400 border-dashed flex flex-col gap-4 items-center justify-center">
          <ImagePlus size={42} color="gray" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        {previews.length > 0 && (
          <div className="w-full grid grid-cols-3 gap-4">
            {previews.map((file, index) => (
              <div
                className="flex items-center w-full min-w-60 gap-2 border-2 p-2 rounded-xl hover:border-black transition-all duration-150"
                key={index}
              >
                <img
                  key={index}
                  src={file.url}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover rounded-lg border-2"
                />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 ** 2).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="ml-auto rounded-full"
                  onClick={() => handleDelete(file.name)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
