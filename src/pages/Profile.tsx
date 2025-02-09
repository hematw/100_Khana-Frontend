import { RefObject, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosIns from "../axios";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import { Pencil, Save, Upload } from "lucide-react";

interface IProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  govId?: number;
  profile?: string;
  background?: string;
  bio?: string;
  userId?: string;
  username?: string;
}

export default function Profile() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    govId: 0,
    profile: "",
    background: "",
    bio: "",
    userId: "",
    username: "",
  });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedBackground, setSelectedBackground] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>();
  const profileUrl = selectedFile ? URL.createObjectURL(selectedFile) : profileData.profile;
  const backgroundUrl = selectedBackground ? URL.createObjectURL(selectedBackground as File) : profileData.background;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfile>({
    defaultValues: profileData,
  });

  useEffect(() => {
    async function getProfile() {
      const { data } = await axiosIns("/users/me", {
        withCredentials: true,
      });
      setProfileData(data);
      reset(data);
    }
    getProfile();
  }, [reset]);

  console.log("Selected File", selectedBackground, backgroundUrl)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<IProfile> = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName || "");
      formData.append("lastName", values.lastName || "");
      formData.append("email", values.email || "");
      formData.append("phone", values.phone || "");
      formData.append("govId", values.govId?.toString() || "");
      formData.append("bio", values.bio || "");

      if (selectedFile) {
        formData.append("profile", selectedFile);
      }

      if (selectedBackground) {
        formData.append("background", selectedBackground);
      }

      const { status, data } = await axiosIns.patch("/users/update", formData);
      if (status === 200) {
        setProfileData({ ...data, email: data?.userId?.email });
        reset({ ...data.profile, email: data?.userId?.email });
        setEditMode(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log(profileData)

  return (
    <section className=" min-h-screen py-10">
      <div className="md:max-w-5xl mx-auto p-6 bg-gray-50/20 rounded-2xl shadow-2xl m-4">
        <div className="relative">
          <div className="h-56 overflow-hidden rounded-t-2xl relative">
            {backgroundUrl || profileData.background ?
              <img
                className="w-full h-full object-cover"
                src={backgroundUrl || profileData.background || "/mock-background.jpg"}
                alt="Profile Background"
              /> :
              <div
                className="w-full h-full place-content-center place-items-center object-cover bg-gray-300"
              >
                <p>Upload a background photo.</p>
              </div>}
            {editMode &&
              <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-2 right-2 p-2 gap-2 rounded-full cursor-pointer text-sm z-10">
                <span>
                  <Upload />
                </span>
                Upload Background Photo
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  capture="user"
                  className="hidden"
                  onChange={(e) => setSelectedBackground(e.target?.files?.[0])}
                />
              </label>
            }
            {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
          </div>
          <div className="flex items-end gap-5 absolute -bottom-20 left-6">
            <div className="relative group">
              <ProfileImage
                image={profileUrl || profileData.profile || "/profile-picture.png"}
                username={profileData.firstName || "No name"}
                isOnEdit={editMode}
                fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
                onChange={handleFileChange}
              />
            </div>
            <div className="text-left pb-2 pt-6 place-content-center">
              <h3 className="text-4xl font-bold text-shadow-sm shadow-[black]">
                {profileData.firstName} {profileData.lastName} <span className="text-sm text-sky-400">{`@${profileData.username}`}</span>
              </h3>
              <p className="text-gray-300 mt-2">{profileData.bio || "No bio available"}</p>
            </div>
          </div>
        </div>

        <div className="mt-32">
            {editMode ? (
              <form
                key="edit-form"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <InputGroup label="Full Name" text="Make sure this matches your government ID.">
                      <div className="flex flex-col gap-4">
                        <Input
                          name="firstName"
                          label="First Name"
                          error={errors.firstName}
                          register={register}
                          validation={{
                            required: "First name is required",
                            pattern: {
                              value: /^[A-Z]+$/i,
                              message: "Name cannot contain symbols or numbers",
                            },
                          }}
                        />
                        <Input
                          name="lastName"
                          label="Last Name"
                          error={errors.lastName}
                          register={register}
                          validation={{
                            required: "Last name is required",
                            pattern: {
                              value: /^[A-Z]+$/i,
                              message: "Name cannot contain symbols or numbers",
                            },
                          }}
                        />
                      </div>
                    </InputGroup>
                  </div>
                  <div>
                    <InputGroup label="Bio" text="Tell us a little about yourself.">
                      <textarea
                        {...register("bio")}
                        className="w-full h-36 mt-2 bg-transparent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-2 border-gray-400"
                        rows={4}
                        placeholder="Write something about yourself..."
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="mt-6">
                  <InputGroup label="Contact Information" text="Keep your contact details up to date.">
                    <div className="flex gap-4">
                      <Input
                        className="flex-1"
                        name="email"
                        label="Email Address"
                        error={errors.email}
                        register={register}
                        validation={{
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        }}
                      />
                      <Input
                        className="flex-1"
                        name="phone"
                        label="Phone Number"
                        error={errors.phone}
                        register={register}
                        validation={{
                          pattern: {
                            value: /^\+93(78|73|79|77|72|74|70)\d{7}$/,
                            message: "Invalid phone number",
                          },
                        }}
                      />
                    </div>
                  </InputGroup>
                </div>

                <div className="mt-6">
                  <InputGroup label="Government ID" text="Ensure this matches your official ID.">
                    <Input
                      name="govId"
                      label="Government ID Number"
                      error={errors.govId}
                      register={register}
                      validation={{
                        required: "Government ID is required",
                      }}
                    />
                  </InputGroup>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    variant="gradient"
                    // type="submit"
                    icon={<Save />}
                    disabled={isLoading}
                    className={isLoading ? "opacity-60" : ""}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="dark" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div
              >
                <div className="gap-8">
                  {/* <div> */}
                  <ul className="space-y-4">
                    <li className="flex border-b pb-4">
                      <span className="font-medium w-2/5">Email</span>
                      <span className="text-gray-200 w-3/5">{profileData.email || "No email"}</span>
                    </li>
                    <li className="flex border-b pb-4">
                      <span className="font-medium w-2/5">Phone</span>
                      <span className="text-gray-200 w-3/5">{profileData.phone || "No phone"}</span>
                    </li>
                    <li className="flex border-b pb-4">
                      <span className="font-medium w-2/5">Government ID</span>
                      <span className="text-gray-200 w-3/5">{profileData.govId || "No ID"}</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      variant="gradient"
                      onClick={() => setEditMode(true)}
                      icon={<Pencil />}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}