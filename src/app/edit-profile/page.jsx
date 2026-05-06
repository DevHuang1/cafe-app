import EditProfile from "./EditProfile";

const fakeUser = {
  name: "Pyae Sone Htut",
  role: "Cafe Staff",
  email: "pyaesone@example.com",
  phone: "+95 9123456789",
  address: "Yangon, Myanmar",
  employeeId: "EMP-1023",
  shift: "Morning",
  image: "/avatar.jpg",
};

export default function Page() {
  return <EditProfile initialData={fakeUser} />;
}