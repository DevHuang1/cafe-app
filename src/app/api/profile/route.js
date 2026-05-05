let user = {
  name: "Pyae Sone Htut",
  role: "Cafe Staff",
  email: "pyaesone@example.com",
  phone: "+95 9123456789",
  address: "Yangon, Myanmar",
  employeeId: "CEI-1023",
  shift: "Morning",
  status: "Active",
  image : "/user/default_user.png"
};

export async function GET() {
  return Response.json(user);
}

export async function PATCH(request) {
  const body = await request.json();

  user = {
    ...user,
    name: body.name,
    email: body.email,
    phone: body.phone,
    address: body.address,
    status: body.status,
    image: body.image || user.image,

    // admin-only fields stay unchanged
    role: user.role,
    employeeId: user.employeeId,
    shift: user.shift,
  };

  return Response.json(user);
}